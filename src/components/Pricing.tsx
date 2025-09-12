'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Mensal',
      price: '59',
      period: '/mês',
      description: 'Perfeito para testar o Cardaio',
      features: [
        'Até 50 produtos',
        '3 categorias',
        'Personalização básica',
        'Suporte por email',
        'Analytics básico',
        'Menu responsivo'
      ],
      popular: false,
      cta: 'Assinar Agora',
      href: '/checkout?plan=mensal'
    },
    {
      name: 'Anual',
      price: '599',
      period: '/ano',
      originalPrice: '708',
      description: 'Melhor custo-benefício',
      features: [
        'Produtos ilimitados',
        'Categorias ilimitadas',
        'Personalização completa',
        'Suporte prioritário',
        'Analytics avançado',
        'Menu responsivo',
        'Backup automático',
        'Atualizações em tempo real'
      ],
      popular: true,
      cta: 'Assinar Agora',
      href: '/checkout?plan=anual'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
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
            Escolha o plano{' '}
            <span className="text-secondary">ideal</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planos simples e transparentes. Sem taxas ocultas, sem surpresas. 
            Cancele quando quiser.
          </p>
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
                plan.popular ? 'ring-2 ring-secondary scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={16} />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-primary">
                    R$ {plan.price}
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
                    <span className="ml-2 text-sm text-secondary font-semibold">
                      Economize R$ {parseInt(plan.originalPrice) - parseInt(plan.price)}
                    </span>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
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
                    plan.popular
                      ? 'bg-secondary text-white hover:bg-secondary-light'
                      : 'bg-primary text-white hover:bg-primary-light'
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
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Garantia de 7 dias
            </h3>
            <p className="text-gray-600">
              Não gostou? Cancele em até 7 dias e receba seu dinheiro de volta, 
              sem perguntas. Queremos que você tenha certeza de que o Cardaio é 
              a solução certa para o seu negócio.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
