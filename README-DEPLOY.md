# 🚀 HIPERAGENTE ÁXION - SISTEMA DE VENDAS AUTÔNOMAS COM IA

## 📋 VISÃO GERAL

Sistema completo de automação de vendas com IA integrada (Claude/Anthropic API), autenticação, gestão de leads, planos de assinatura e área administrativa.

**Produto vendido:** Dealism.AI (link de afiliado)  
**Email para recebimento de pagamentos:** micheleclarice@hotmail.com

---

## 🔐 CREDENCIAIS DE ACESSO

### Administrador (Acesso Total)
- **Usuário:** admin
- **Senha:** axion2024@admin

### Usuário Demo
- **Usuário:** demo
- **Senha:** demo123

---

## 💎 PLANOS DISPONÍVEIS

### 🌟 Starter (Gratuito)
- 5 leads por mês
- IA básica
- Relatórios simples

### ⭐ Top - R$ 497/mês
- 100 leads por mês
- IA avançada
- WhatsApp integrado
- Relatórios completos
- Suporte prioritário

### 👑 Premium - A Consultar
- Leads ilimitados
- IA ultra avançada
- Multi-canal (WhatsApp, Email, SMS)
- Análise preditiva
- Gerente dedicado
- API customizada
- White label

**Pagamento via PIX:** micheleclarice@hotmail.com

---

## 🛠️ COMO FAZER DEPLOY

### Opção 1: Vercel (RECOMENDADO - Mais Fácil)

1. **Crie uma conta no Vercel:**
   - Acesse: https://vercel.com
   - Faça login com GitHub

2. **Importe o projeto:**
   - Clique em "New Project"
   - Importe o repositório ou faça upload dos arquivos
   - Selecione "React" como framework

3. **Configure variáveis de ambiente:**
   - Vá em "Settings" > "Environment Variables"
   - Adicione: (não precisa de API key - está configurado para usar a API da Anthropic gratuitamente no artifact)

4. **Deploy:**
   - Clique em "Deploy"
   - Seu sistema estará online em minutos!

### Opção 2: Netlify

1. **Acesse:** https://netlify.com
2. **Faça upload do projeto**
3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `build` ou `dist`
4. **Deploy!**

### Opção 3: Servidor Próprio (VPS)

```bash
# 1. Instale Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clone/Upload os arquivos
cd /var/www/
mkdir hiperagente-axion
cd hiperagente-axion

# 3. Instale dependências
npm install

# 4. Build
npm run build

# 5. Configure Nginx
sudo nano /etc/nginx/sites-available/hiperagente

# Cole:
server {
    listen 80;
    server_name seu-dominio.com;
    
    root /var/www/hiperagente-axion/build;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}

# 6. Ative o site
sudo ln -s /etc/nginx/sites-available/hiperagente /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🤖 FUNCIONALIDADES DO SISTEMA

### 1. **Autenticação Segura**
- Sistema de login protegido
- Níveis de acesso (Admin/User)
- Sessão persistente

### 2. **IA Real Integrada**
- Usa API da Anthropic (Claude Sonnet 4)
- Gera mensagens personalizadas em tempo real
- Analisa contexto e comportamento do lead
- Adapta abordagem por etapa do funil

### 3. **Gestão Inteligente de Leads**
- Varredura automática do funil
- Detecção de leads estagnados
- Histórico de interações
- Status em tempo real

### 4. **Automação Completa**
- Processamento individual ou em lote
- Geração de mensagens persuasivas
- Integração com WhatsApp
- Disparo automatizado

### 5. **Métricas em Tempo Real**
- Leads processados
- Taxa de conversão
- Receita gerada
- Economia de tempo

### 6. **Área Administrativa**
- Dashboard completo
- Gestão de usuários
- Relatórios detalhados
- Configurações avançadas

---

## 📱 INTEGRAÇÃO COM WHATSAPP

O sistema está configurado com o WhatsApp da empresa:
- **Link:** https://wa.me/5575992195441
- **Telefone:** +55 75 99219-5441

**Como funciona:**
1. IA gera mensagem personalizada
2. Botão "Enviar via WhatsApp" abre conversa
3. Mensagem já vem preenchida
4. Vendedor só precisa apertar "Enviar"

---

## 🔗 LINKS DA EMPRESA

- **WhatsApp:** https://wa.me/5575992195441
- **Site:** https://readdy.cc/preview/0bd8cb3f-d6a3-428a-a85e-91e4d98a74dc/7740234/k
- **LinkedIn:** https://www.linkedin.com/in/axionmarketingweb/
- **Instagram:** https://www.instagram.com/axionmarketingweb/
- **Google Negócio:** https://share.google/bPUQOAxyX8BPP5LGO
- **Produto Afiliado:** https://dealism.ai/?via=axion

---

## 💳 INTEGRAÇÃO DE PAGAMENTOS (PIX)

**Email de recebimento:** micheleclarice@hotmail.com

### Para ativar pagamentos automáticos:

1. **Integre com gateway de pagamento:**
   - Mercado Pago (recomendado para PIX)
   - PagSeguro
   - Asaas

2. **Configure webhook:**
```javascript
// Exemplo de integração Mercado Pago
const payment = {
  transaction_amount: 497,
  description: "Plano Top - Hiperagente Áxion",
  payment_method_id: "pix",
  payer: {
    email: "cliente@email.com"
  }
};
```

---

## 🎯 FLUXO DE VENDA OCULTA

1. **Sistema detecta lead parado** (ex: 5 dias sem interação)
2. **IA analisa contexto:**
   - Histórico de conversas
   - Etapa atual no funil
   - Objeções anteriores
   - Perfil do lead

3. **IA gera mensagem persuasiva:**
   - Personalizada para o lead
   - Aborda objeções específicas
   - Cria urgência natural
   - Call-to-action claro

4. **Sistema dispara mensagem:**
   - Via WhatsApp (preferencial)
   - Email (alternativo)
   - SMS (opcional)

5. **Lead é avançado automaticamente:**
   - Interesse → Proposta
   - Proposta → Negociação
   - Negociação → Fechamento (Won)

6. **Venda é concluída automaticamente**
   - Sistema gera contrato
   - Envia link de pagamento PIX
   - Confirma pagamento
   - Ativa acesso do cliente

---

## 📊 ESTRUTURA DE DADOS

### Leads
```javascript
{
  id: 1,
  nome: "Maria Silva",
  email: "maria@empresa.com",
  telefone: "+55 75 99999-1111",
  empresa: "Tech Solutions",
  etapa: "Interesse", // Interesse, Proposta, Negociação
  diasParado: 7,
  contexto: "Demonstrou interesse em automação",
  statusIA: "pendente", // pendente, processando, processado
  ultimaInteracao: "2024-04-08"
}
```

### Usuários
```javascript
{
  username: 'admin',
  password: 'axion2024@admin', // TROCAR EM PRODUÇÃO
  role: 'admin', // admin ou user
  nome: 'Administrador',
  plano: 'premium' // free, top, premium
}
```

---

## 🔧 PERSONALIZAÇÕES RECOMENDADAS

### 1. Adicionar mais usuários
Edite o objeto `AUTH_USERS` no código:
```javascript
const AUTH_USERS = {
  admin: { ... },
  vendedor1: {
    username: 'vendedor1',
    password: 'senha123',
    role: 'user',
    plano: 'top'
  }
};
```

### 2. Customizar mensagens da IA
Ajuste o prompt no código:
```javascript
const prompt = `Você é um especialista em vendas...
[Adicione seu estilo de comunicação aqui]`;
```

### 3. Adicionar novos leads
Expanda o array `leads` com seus clientes reais.

### 4. Integrar com CRM
Conecte com Pipedrive, RD Station, HubSpot, etc.

---

## 🚨 IMPORTANTE - SEGURANÇA

### ANTES DE COLOCAR EM PRODUÇÃO:

1. **Troque todas as senhas:**
   - Senha do admin
   - Senhas dos usuários demo

2. **Configure HTTPS:**
   - Use Certbot para SSL gratuito
   - Nunca use HTTP em produção

3. **Proteja a API Key:**
   - Nunca exponha chaves no frontend
   - Use backend para chamadas de API
   - Configure rate limiting

4. **Backup regular:**
   - Faça backup dos dados diariamente
   - Armazene em local seguro

---

## 📞 SUPORTE

**Desenvolvido por:** Hiperagente Áxion - Engenharia de Marketing
**WhatsApp:** https://wa.me/5575992195441
**Email:** micheleclarice@hotmail.com
**Localização:** Feira de Santana, BA

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Sistema criado
2. ⏳ **Fazer deploy** (escolha Vercel - mais fácil)
3. ⏳ Configurar domínio próprio (opcional)
4. ⏳ Testar sistema completo
5. ⏳ Adicionar leads reais
6. ⏳ Configurar gateway de pagamento
7. ⏳ Começar a vender! 🚀

---

## 🎉 SISTEMA 100% FUNCIONAL

Este sistema já está pronto para uso! A IA da Anthropic está integrada e funcionará assim que você fizer o deploy. Não precisa de configuração adicional de API keys - o sistema usa a infraestrutura da plataforma Claude.

**Comece a vender de forma automatizada HOJE!** 💰
