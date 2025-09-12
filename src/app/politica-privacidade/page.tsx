import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Cardaio',
  description: 'Política de privacidade do Cardaio. Saiba como protegemos e utilizamos seus dados pessoais.',
  openGraph: {
    title: 'Política de Privacidade - Cardaio',
    description: 'Política de privacidade do Cardaio. Saiba como protegemos e utilizamos seus dados pessoais.',
  },
};

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </button>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Shield className="text-secondary" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Política de Privacidade
                </h1>
                <p className="text-gray-600">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Esta Política de Privacidade descreve como o Cardaio coleta, usa e protege 
                suas informações pessoais quando você utiliza nosso serviço de menu digital.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="text-secondary mr-3" size={24} />
                1. Informações que Coletamos
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Informações Pessoais
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Nome completo e dados de contato</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone</li>
                    <li>Informações de pagamento (processadas de forma segura)</li>
                    <li>Endereço para faturamento</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Informações de Uso
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Dados de navegação e interação com o serviço</li>
                    <li>Informações sobre produtos e categorias cadastradas</li>
                    <li>Logs de acesso e atividades</li>
                    <li>Preferências de personalização</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="text-secondary mr-3" size={24} />
                2. Como Utilizamos suas Informações
              </h2>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Fornecer e manter nosso serviço de menu digital</li>
                  <li>Processar pagamentos e gerenciar sua assinatura</li>
                  <li>Personalizar sua experiência e interface</li>
                  <li>Enviar comunicações importantes sobre o serviço</li>
                  <li>Melhorar nossos produtos e serviços</li>
                  <li>Cumprir obrigações legais e regulamentares</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="text-secondary mr-3" size={24} />
                3. Proteção de Dados
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger 
                  suas informações pessoais contra acesso não autorizado, alteração, divulgação 
                  ou destruição.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Armazenamento seguro em servidores protegidos</li>
                  <li>Controle de acesso restrito aos dados</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backup regular e seguro dos dados</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Compartilhamento de Informações
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
                  terceiros, exceto nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para processar pagamentos (processadores de pagamento seguros)</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Para proteger nossos direitos e segurança</li>
                  <li>Em caso de fusão ou aquisição da empresa</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Seus Direitos (LGPD)
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Confirmar a existência de tratamento de seus dados</li>
                  <li>Acessar seus dados pessoais</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                  <li>Solicitar anonimização, bloqueio ou eliminação de dados</li>
                  <li>Solicitar portabilidade dos dados</li>
                  <li>Revogar consentimento a qualquer momento</li>
                  <li>Ser informado sobre compartilhamento de dados</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Cookies e Tecnologias Similares
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                  analisar o uso do serviço e personalizar conteúdo.
                </p>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tipos de Cookies:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li><strong>Essenciais:</strong> Necessários para o funcionamento básico</li>
                    <li><strong>Analíticos:</strong> Para entender como você usa nosso serviço</li>
                    <li><strong>Funcionais:</strong> Para lembrar suas preferências</li>
                    <li><strong>Marketing:</strong> Para personalizar anúncios (com consentimento)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Retenção de Dados
              </h2>
              <p className="text-gray-700">
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                os propósitos descritos nesta política, a menos que um período de retenção 
                mais longo seja exigido por lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Alterações nesta Política
              </h2>
              <p className="text-gray-700">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                sobre mudanças significativas por email ou através de aviso em nosso serviço. 
                Recomendamos revisar esta política regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Contato
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou quiser exercer 
                  seus direitos, entre em contato conosco:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacidade@cardaio.com</p>
                  <p><strong>Telefone:</strong> (11) 99999-9999</p>
                  <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
