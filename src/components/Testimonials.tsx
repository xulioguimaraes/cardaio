"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Proprietária",
    company: "Restaurante Sabor & Arte",
    content: "Comprei o cardápio digital e foi a melhor decisão! Meus clientes adoram a facilidade de navegar pelo menu. É super simples de usar e atualizar os preços.",
    rating: 5,
    avatar: "MS"
  },
  {
    id: 2,
    name: "João Santos",
    role: "Gerente",
    company: "Café Central",
    content: "O cardápio digital é perfeito para o nosso café. Os clientes conseguem ver todas as opções de forma clara e organizada. Muito fácil de gerenciar!",
    rating: 5,
    avatar: "JS"
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Dona",
    company: "Pizzaria Bella Vista",
    content: "Finalmente um cardápio que funciona! Meus clientes conseguem ver todas as pizzas com fotos e preços atualizados. Simples e eficiente!",
    rating: 5,
    avatar: "AC"
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    role: "Proprietário",
    company: "Bar do Pedro",
    content: "O cardápio digital facilitou muito o atendimento. Os clientes conseguem ver todas as bebidas e petiscos sem precisar perguntar. Recomendo!",
    rating: 5,
    avatar: "PO"
  },
  {
    id: 5,
    name: "Carla Mendes",
    role: "Gerente",
    company: "Lanchonete da Carla",
    content: "Adorei a simplicidade do cardápio! É muito fácil de usar e meus clientes conseguem navegar sem dificuldade. Valeu cada centavo!",
    rating: 5,
    avatar: "CM"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Donos de restaurantes, bares e lanchonetes que já adotaram o cardápio digital
            </p>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-r-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-l-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          <motion.div
            className="flex"
            animate={{
              x: -currentIndex * 100 + "%"
            }}
            transition={{
              type: "tween",
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto select-none"
                  style={{ touchAction: "pan-y" }}
                >
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <Quote className="w-12 h-12 text-primary opacity-20" />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-center mb-8">
                    <p className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {testimonial.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2 pb-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Junte-se a centenas de estabelecimentos satisfeitos
            </h3>
            <p className="text-gray-600 mb-6">
              Comece a usar seu cardápio digital hoje mesmo
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-200"
            >
              Comprar Agora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
