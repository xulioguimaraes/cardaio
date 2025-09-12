'use client';

import { motion } from 'framer-motion';
import { 
  Package, 
  Palette, 
  Upload, 
  Zap, 
  Smartphone, 
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Package,
      title: 'Cadastro de Produtos',
      description: 'Organize seus produtos por categorias de forma intuitiva. Adicione preços, descrições e imagens facilmente.',
      color: 'bg-blue-500'
    },
    {
      icon: Palette,
      title: 'Personalização Total',
      description: 'Customize cores, logo e layout do seu menu para refletir a identidade da sua marca.',
      color: 'bg-purple-500'
    },
    {
      icon: Upload,
      title: 'Upload de Imagens',
      description: 'Adicione fotos dos seus produtos com qualidade profissional. Suporte a múltiplos formatos.',
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      title: 'Simplicidade no Uso',
      description: 'Interface intuitiva que permite criar e gerenciar seu menu em poucos minutos, sem complicações.',
      color: 'bg-yellow-500'
    },
    {
      icon: Smartphone,
      title: '100% Responsivo',
      description: 'Seu menu funciona perfeitamente em qualquer dispositivo: celular, tablet ou computador.',
      color: 'bg-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Básico',
      description: 'Acompanhe visualizações e interações do seu menu para entender melhor seus clientes.',
      color: 'bg-indigo-500'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Seus dados estão protegidos com criptografia e backup automático. Tranquilidade garantida.',
      color: 'bg-red-500'
    },
    {
      icon: Clock,
      title: 'Atualizações em Tempo Real',
      description: 'Mudanças no seu menu aparecem instantaneamente para seus clientes, sem delay.',
      color: 'bg-teal-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="funcionalidades" className="py-20 bg-white">
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
            Funcionalidades que fazem a{' '}
            <span className="text-secondary">diferença</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para criar um menu digital profissional, 
            sem complicações e com resultados incríveis.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="text-white" size={24} />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Pronto para começar?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Crie seu menu digital em minutos e impressione seus clientes
            </p>
            <motion.a
              href="#planos"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-200"
            >
              Ver Planos
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
