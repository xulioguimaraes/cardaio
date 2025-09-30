"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Teste Grátis",
      price: "0",
      period: "por 7 dias",
      originalPrice: "59",
      description: "Experimente sem compromisso",
      features: [
        "Acesso completo por 7 dias",
        "Todos os recursos incluídos",
        "Suporte completo",
        "Cancele quando quiser",

        "Sem taxas ocultas",
      ],
      popular: false,
      cta: "Começar Teste Grátis",
      href: "/checkout?plan=trial",
      trial: true,
      badge: "Sem Risco",
    },
    {
      name: "Plano Anual",
      price: "49",
      period: "/mês",
      originalPrice: "59",
      description: "Melhor custo-benefício",
      features: [
        "Produtos ilimitados",
        "Categorias ilimitadas",
        "Personalização completa",
        "Suporte prioritário 24/7",
        "Analytics avançado",
        "Menu responsivo",
        "Backup automático",
        "Atualizações em tempo real",
        "API de integração",
      ],
      popular: true,
      cta: "Começar Agora",
      href: "/checkout?plan=anual",
      badge: "Mais Popular",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="planos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comece <span className="text-green-600">grátis</span> hoje mesmo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teste o Cardaio por 7 dias sem compromisso. Sem em taxas ocultas. Se
            não gostar, é só cancelar.
          </p>
        </motion.div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-lg p-4 shadow-md max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">1.247</span>{" "}
                restaurantes já testaram o Cardaio
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "ring-2 ring-secondary scale-105" : ""
              }`}
            >
              {/* Badge */}
              {(plan.popular || plan.trial) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 ${
                      plan.trial
                        ? "bg-green-500 text-white"
                        : "bg-secondary text-white"
                    }`}
                  >
                    <Star size={16} />
                    <span>{plan.badge}</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="flex items-baseline justify-center">
                  <span
                    className={`text-5xl font-bold ${
                      plan.trial ? "text-green-600" : "text-primary"
                    }`}
                  >
                    {plan.trial ? "GRÁTIS" : `R$ ${plan.price}`}
                  </span>
                  <span className="text-xl text-gray-600 ml-1">
                    {plan.period}
                  </span>
                </div>

                {plan.originalPrice && (
                  <div className="mt-2">
                    <span className="text-lg text-gray-400 line-through">
                      R$ {plan.originalPrice}
                    </span>
                    <span
                      className={`ml-2 text-sm font-semibold ${
                        plan.trial ? "text-green-600" : "text-secondary"
                      }`}
                    >
                      {plan.trial
                        ? "Depois R$ 49/mês"
                        : `Economize R$ ${
                            parseInt(plan.originalPrice) - parseInt(plan.price)
                          }`}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Link href={plan.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                    plan.trial
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                      : plan.popular
                      ? "bg-secondary text-white hover:bg-secondary-light shadow-lg"
                      : "bg-primary text-white hover:bg-primary-light"
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 shadow-lg max-w-4xl mx-auto border border-green-200">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <Check className="text-green-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Zero Risco, Máximo Resultado
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Check className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">Teste Grátis</h4>
                  <p className="text-gray-600 text-sm">
                    7 dias completos sem pagar nada
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Sem Compromisso
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Cancele quando quiser, sem perguntas
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900">Suporte Total</h4>
                  <p className="text-gray-600 text-sm">
                    Te ajudamos a configurar tudo
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-6 text-lg">
              <strong>Mais de 1.000 restaurantes já confiam no Cardaio.</strong>{" "}
              Junte-se a eles e transforme seu menu digital hoje mesmo!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
