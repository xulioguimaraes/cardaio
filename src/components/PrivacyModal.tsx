'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText } from 'lucide-react';
import Link from 'next/link';

const PrivacyModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted privacy policy
    const hasAccepted = localStorage.getItem('privacy-policy-accepted');
    if (!hasAccepted) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacy-policy-accepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('privacy-policy-accepted', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-end p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={handleDecline}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            {/* Close Button */}
            <button
              onClick={handleDecline}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Fechar modal"
            >
              <X size={20} className="text-gray-500" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Shield className="text-secondary" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Política de Privacidade
                </h3>
                <p className="text-sm text-gray-600">
                  Respeitamos sua privacidade
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                personalizar conteúdo e analisar nosso tráfego. Ao continuar navegando, 
                você concorda com nossa política de privacidade.
              </p>
              
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Cookies essenciais para funcionamento</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Análise de uso e performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Personalização de conteúdo</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleAccept}
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors duration-200"
              >
                Aceitar e Continuar
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleDecline}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Recusar
                </button>
                
                <Link
                  href="/politica-privacidade"
                  className="flex-1 flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  <FileText size={16} />
                  <span>Ler Mais</span>
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Você pode alterar suas preferências a qualquer momento nas configurações.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
