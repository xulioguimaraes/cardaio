# 🚀 Cardaio - Exemplo de Uso

## Como testar o projeto

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Acesse no navegador:**
   ```
   http://localhost:3000
   ```

## 📱 Funcionalidades Testáveis

### Landing Page Principal
- ✅ Header fixo com navegação responsiva
- ✅ Seção Hero com animações
- ✅ Cards de funcionalidades
- ✅ Planos de preços
- ✅ Footer completo

### Navegação
- ✅ Menu mobile (hambúrguer)
- ✅ Links de âncora (Funcionalidades, Planos)
- ✅ Botões CTA funcionais

### Páginas Específicas
- ✅ `/checkout` - Formulário de pagamento
- ✅ `/politica-privacidade` - Política de privacidade
- ✅ `/termos-uso` - Termos de uso

### Modal de Privacidade
- ✅ Aparece após 3 segundos
- ✅ Salva preferência no localStorage
- ✅ Botões de aceitar/recusar funcionais

## 🎨 Personalização

### Cores
As cores podem ser alteradas em `src/app/globals.css`:

```css
:root {
  --primary: #000000;        /* Preto principal */
  --secondary: #FF0000;      /* Vermelho principal */
  --primary-light: #333333;  /* Preto claro */
  --secondary-light: #FF3333; /* Vermelho claro */
}
```

### Conteúdo
- **Títulos e textos:** Edite diretamente nos componentes
- **Preços:** Modifique em `src/components/Pricing.tsx`
- **Funcionalidades:** Adicione/remova em `src/components/Features.tsx`

## 📊 SEO e Performance

### Meta Tags
- ✅ Título otimizado
- ✅ Descrição SEO-friendly
- ✅ Open Graph completo
- ✅ Twitter Cards
- ✅ Keywords relevantes

### Performance
- ✅ Imagens otimizadas
- ✅ Lazy loading
- ✅ Compressão habilitada
- ✅ Headers de segurança

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Linting
npm run lint
```

## 📱 Responsividade

Teste em diferentes dispositivos:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large (1280px+)

## ♿ Acessibilidade

- ✅ Navegação por teclado
- ✅ Labels descritivos
- ✅ Contraste adequado
- ✅ ARIA labels
- ✅ Screen reader friendly

## 🚀 Próximos Passos

1. **Adicionar imagens reais** (substituir placeholders)
2. **Integrar sistema de pagamento** real
3. **Adicionar analytics** (Google Analytics)
4. **Implementar backend** para dados
5. **Adicionar testes** automatizados

---

**Cardaio** está pronto para uso! 🎉
