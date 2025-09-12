# Cardaio - Menu Digital

Um projeto Next.js moderno para criação de menus digitais profissionais, otimizado para SEO, responsivo e rápido.

## 🚀 Características

- **Next.js 15** com App Router
- **TypeScript** para type safety
- **Tailwind CSS v4** para estilização
- **Framer Motion** para animações suaves
- **Lucide React** para ícones
- **SEO otimizado** com meta tags completas
- **Responsivo** mobile-first
- **Acessibilidade** (a11y) implementada

## 🎨 Design

- **Cores da identidade visual:**
  - Primária: Preto (#000000)
  - Secundária: Vermelho (#FF0000)
- **Inspirado no estilo visual do Bling**
- **Interface moderna e limpa**

## 📱 Funcionalidades

### Landing Page
- Header fixo com navegação
- Seção Hero com CTA
- Seção de Funcionalidades com cards
- Seção de Planos com preços
- Footer completo
- Modal de Políticas de Privacidade

### Páginas
- **Checkout** - Formulário completo de pagamento
- **Política de Privacidade** - Conformidade com LGPD
- **Termos de Uso** - Condições de uso do serviço

### Componentes
- Header responsivo com menu mobile
- Hero com animações e mockups
- Cards de funcionalidades com ícones
- Planos de preços com destaque
- Modal de privacidade com localStorage
- Footer com links organizados

## 🛠️ Tecnologias

- **Next.js 15.5.3** - Framework React
- **React 19.1.0** - Biblioteca de UI
- **TypeScript 5** - Tipagem estática
- **Tailwind CSS 4** - Framework CSS
- **Framer Motion 12.23.12** - Animações
- **Lucide React 0.544.0** - Ícones

## 🚀 Como executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── checkout/
│   │   └── page.tsx          # Página de checkout
│   ├── politica-privacidade/
│   │   └── page.tsx          # Política de privacidade
│   ├── termos-uso/
│   │   └── page.tsx          # Termos de uso
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página inicial
├── components/
│   ├── Header.tsx            # Cabeçalho com navegação
│   ├── Hero.tsx              # Seção principal
│   ├── Features.tsx          # Funcionalidades
│   ├── Pricing.tsx           # Planos e preços
│   ├── Footer.tsx            # Rodapé
│   └── PrivacyModal.tsx      # Modal de privacidade
├── lib/                      # Utilitários
└── types/                    # Definições de tipos
```

## 🎯 SEO e Performance

- Meta tags otimizadas
- Open Graph para redes sociais
- Twitter Cards
- Estrutura semântica HTML5
- Imagens otimizadas
- Lazy loading
- Animações performáticas

## 📱 Responsividade

- Design mobile-first
- Breakpoints otimizados
- Menu hambúrguer para mobile
- Cards adaptativos
- Tipografia responsiva

## ♿ Acessibilidade

- Navegação por teclado
- Labels descritivos
- Contraste adequado
- ARIA labels
- Foco visível
- Screen reader friendly

## 🔒 Privacidade e LGPD

- Modal de consentimento
- Política de privacidade completa
- Termos de uso detalhados
- Conformidade com LGPD
- Armazenamento local de preferências

## 🎨 Personalização

As cores podem ser facilmente alteradas no arquivo `src/app/globals.css`:

```css
:root {
  --primary: #000000;        /* Preto */
  --secondary: #FF0000;      /* Vermelho */
  --primary-light: #333333;  /* Preto claro */
  --secondary-light: #FF3333; /* Vermelho claro */
}
```

## 📄 Licença

Este projeto é privado e proprietário do Cardaio.

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato:
- Email: suporte@cardaio.com
- Telefone: (11) 99999-9999

---

**Cardaio** - Seu menu digital simples e rápido 🚀