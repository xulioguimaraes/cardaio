import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso - Cardaio',
  description: 'Termos de uso do Cardaio. Conheça as condições e regras para utilização do nosso serviço.',
  openGraph: {
    title: 'Termos de Uso - Cardaio',
    description: 'Termos de uso do Cardaio. Conheça as condições e regras para utilização do nosso serviço.',
  },
};

const TermsOfUsePage = () => {
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
                <FileText className="text-secondary" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Termos de Uso
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
                Estes Termos de Uso regulam o uso do serviço Cardaio, uma plataforma de 
                menu digital. Ao utilizar nosso serviço, você concorda com estes termos.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="text-secondary mr-3" size={24} />
                1. Aceitação dos Termos
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Ao acessar e utilizar o Cardaio, você concorda em cumprir e estar vinculado 
                  a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
                  não deve utilizar nosso serviço.
                </p>
                <p className="text-gray-700">
                  Estes termos podem ser atualizados periodicamente. O uso continuado do serviço 
                  após as alterações constitui aceitação dos novos termos.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Descrição do Serviço
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  O Cardaio é uma plataforma que permite criar e gerenciar menus digitais, 
                  incluindo:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Criação e personalização de menus digitais</li>
                  <li>Cadastro de produtos e categorias</li>
                  <li>Upload e gerenciamento de imagens</li>
                  <li>Personalização de cores e logos</li>
                  <li>Dashboard de gerenciamento</li>
                  <li>Suporte técnico</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Conta e Registro
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Criação de Conta
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Você deve fornecer informações precisas e atualizadas</li>
                    <li>É responsável por manter a confidencialidade de sua conta</li>
                    <li>Deve notificar imediatamente sobre uso não autorizado</li>
                    <li>Uma pessoa pode ter apenas uma conta</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Elegibilidade
                  </h3>
                  <p className="text-gray-700">
                    Você deve ter pelo menos 18 anos para utilizar nosso serviço. 
                    Menores de idade devem ter autorização de responsável legal.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Uso Aceitável
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Você pode:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Usar o serviço para fins comerciais legítimos</li>
                    <li>Personalizar seu menu conforme suas necessidades</li>
                    <li>Fazer backup de seus dados</li>
                    <li>Entrar em contato com nosso suporte</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <AlertTriangle className="text-red-500 mr-2" size={20} />
                    Você NÃO pode:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Usar o serviço para atividades ilegais</li>
                    <li>Violar direitos de propriedade intelectual</li>
                    <li>Interferir no funcionamento do serviço</li>
                    <li>Criar contas falsas ou enganosas</li>
                    <li>Compartilhar sua conta com terceiros</li>
                    <li>Fazer engenharia reversa do software</li>
                    <li>Usar bots ou scripts automatizados</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Propriedade Intelectual
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  O Cardaio e todo seu conteúdo, incluindo software, design, textos, 
                  gráficos e logotipos, são propriedade do Cardaio e protegidos por 
                  leis de direitos autorais e outras leis de propriedade intelectual.
                </p>
                <p className="text-gray-700">
                  Você mantém todos os direitos sobre o conteúdo que você cria e 
                  adiciona ao seu menu, incluindo textos, imagens e informações dos produtos.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Pagamentos e Faturamento
              </h2>
              <div className="space-y-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Os preços estão sujeitos a alterações com aviso prévio</li>
                  <li>Pagamentos são processados de forma segura</li>
                  <li>Assinaturas são renovadas automaticamente</li>
                  <li>Você pode cancelar a qualquer momento</li>
                  <li>Reembolsos seguem nossa política de reembolso</li>
                  <li>Impostos aplicáveis são de sua responsabilidade</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Limitação de Responsabilidade
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  O Cardaio é fornecido &quot;como está&quot; sem garantias de qualquer tipo. 
                  Não garantimos que o serviço será ininterrupto ou livre de erros.
                </p>
                <p className="text-gray-700">
                  Em nenhuma circunstância seremos responsáveis por danos indiretos, 
                  incidentais, especiais ou consequenciais resultantes do uso do serviço.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Suspensão e Encerramento
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Reservamo-nos o direito de suspender ou encerrar sua conta em caso de:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Violação destes Termos de Uso</li>
                  <li>Uso inadequado do serviço</li>
                  <li>Atividades fraudulentas</li>
                  <li>Não pagamento de taxas</li>
                  <li>Solicitação sua de encerramento</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Modificações do Serviço
              </h2>
              <p className="text-gray-700">
                Reservamo-nos o direito de modificar, suspender ou descontinuar qualquer 
                parte do serviço a qualquer momento, com ou sem aviso prévio. 
                Melhorias e atualizações podem ser implementadas regularmente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Lei Aplicável
              </h2>
              <p className="text-gray-700">
                Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa 
                será resolvida nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contato
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> suporte@cardaio.com</p>
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

export default TermsOfUsePage;
