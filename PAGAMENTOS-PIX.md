# 💳 INTEGRAÇÃO DE PAGAMENTOS PIX - HIPERAGENTE ÁXION

## 📧 Email de Recebimento
**micheleclarice@hotmail.com**

---

## 🏦 OPÇÕES DE GATEWAY PIX

### 1. MERCADO PAGO (Recomendado)

**Vantagens:**
- ✅ Gratuito para começar
- ✅ PIX instantâneo
- ✅ API simples
- ✅ Dashboard completo
- ✅ Webhook automático

**Como configurar:**

1. **Crie conta:** https://www.mercadopago.com.br/developers
2. **Obtenha credenciais:**
   - Access Token (Produção)
   - Public Key

3. **Adicione no código:**

```javascript
// Função de pagamento PIX
const criarCobrancaPix = async (plano, valorEmail) => {
  const response = await fetch('https://api.mercadopago.com/v1/payments', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer SEU_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      transaction_amount: plano === 'top' ? 497 : 1497,
      description: `Hiperagente Áxion - Plano ${plano}`,
      payment_method_id: 'pix',
      payer: {
        email: valorEmail,
        first_name: 'Cliente',
        last_name: 'Axion'
      },
      notification_url: 'https://seu-site.com/webhook/mercadopago'
    })
  });
  
  const data = await response.json();
  return {
    qrCode: data.point_of_interaction.transaction_data.qr_code,
    qrCodeBase64: data.point_of_interaction.transaction_data.qr_code_base64,
    pixKey: data.point_of_interaction.transaction_data.transaction_id
  };
};
```

**Custos:**
- PIX: **0% de taxa** (sem custos!)
- Transferência: R$ 0,00

---

### 2. ASAAS (Alternativa Profissional)

**Vantagens:**
- ✅ Split de pagamento
- ✅ Recorrência automática
- ✅ Boleto + PIX
- ✅ Controle de inadimplência

**Como configurar:**

1. **Crie conta:** https://www.asaas.com
2. **API Key:** Painel > Integrações > Sua API Key

```javascript
const criarCobrancaAsaas = async (cliente, valor) => {
  const response = await fetch('https://www.asaas.com/api/v3/payments', {
    method: 'POST',
    headers: {
      'access_token': 'SEU_ACCESS_TOKEN_ASAAS',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      customer: cliente.id,
      billingType: 'PIX',
      value: valor,
      dueDate: new Date().toISOString().split('T')[0],
      description: 'Hiperagente Áxion - Plano Premium'
    })
  });
  
  const data = await response.json();
  return {
    pixQrCode: data.encodedImage,
    pixCopyPaste: data.payload
  };
};
```

**Custos:**
- PIX: **0,99% por transação**
- Plano básico: Gratuito até R$ 2.000/mês

---

### 3. PAGSEGURO (Simples e Popular)

**Como configurar:**

1. **Conta:** https://pagseguro.uol.com.br
2. **Email:** micheleclarice@hotmail.com

```javascript
const gerarPagamentoPagSeguro = async (valor, descricao) => {
  const response = await fetch('https://ws.pagseguro.uol.com.br/v2/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: 'micheleclarice@hotmail.com',
      token: 'SEU_TOKEN_PAGSEGURO',
      currency: 'BRL',
      itemId1: '0001',
      itemDescription1: descricao,
      itemAmount1: valor.toFixed(2),
      itemQuantity1: '1',
      reference: `AXION-${Date.now()}`
    })
  });
  
  const data = await response.text();
  return data;
};
```

---

## 🔔 WEBHOOK - CONFIRMAÇÃO AUTOMÁTICA

Quando o pagamento for confirmado, ative o acesso automaticamente:

```javascript
// Rota webhook (Node.js/Express)
app.post('/webhook/mercadopago', async (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'payment' && data.status === 'approved') {
    // Pagamento aprovado!
    const clienteEmail = data.payer.email;
    const valor = data.transaction_amount;
    
    // Identifica o plano
    const plano = valor === 497 ? 'top' : 'premium';
    
    // Ativa acesso no sistema
    await ativarPlano(clienteEmail, plano);
    
    // Envia email de boas-vindas
    await enviarEmailBoasVindas(clienteEmail, plano);
    
    // Envia credenciais de acesso
    const credenciais = gerarCredenciais(clienteEmail);
    await enviarCredenciais(clienteEmail, credenciais);
  }
  
  res.status(200).send('OK');
});
```

---

## 💎 FLUXO COMPLETO DE VENDA

### 1. Lead Interessado

```javascript
// Lead clica em "Assinar Plano Top"
const handleAssinatura = async (plano) => {
  setCarregando(true);
  
  // Coleta dados do cliente
  const dadosCliente = {
    nome: formData.nome,
    email: formData.email,
    telefone: formData.telefone,
    empresa: formData.empresa
  };
  
  // Gera pagamento PIX
  const pagamento = await criarCobrancaPix(plano, dadosCliente.email);
  
  // Mostra QR Code
  setQrCodePix(pagamento.qrCode);
  setQrCodeBase64(pagamento.qrCodeBase64);
  
  // Aguarda confirmação (webhook)
  iniciarMonitoramentoPagamento(pagamento.pixKey);
};
```

### 2. Cliente Paga PIX

- QR Code gerado
- Cliente escaneia
- Paga via app do banco
- Confirmação instantânea (1-5 segundos)

### 3. Sistema Ativa Automaticamente

```javascript
const ativarPlano = async (email, plano) => {
  // Cria usuário no sistema
  const usuario = {
    email: email,
    plano: plano,
    dataAtivacao: new Date(),
    dataExpiracao: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    status: 'ativo'
  };
  
  // Salva no banco de dados
  await db.usuarios.create(usuario);
  
  // Gera credenciais
  const senha = gerarSenhaAleatoria();
  const username = email.split('@')[0];
  
  // Envia por email
  await enviarEmail({
    para: email,
    assunto: '🎉 Bem-vindo ao Hiperagente Áxion!',
    corpo: `
      Olá!
      
      Seu plano ${plano} foi ativado com sucesso!
      
      Acesse: https://seu-site.com
      Usuário: ${username}
      Senha: ${senha}
      
      Comece a automatizar suas vendas agora!
      
      Abraço,
      Equipe Axion
    `
  });
  
  // Envia WhatsApp de boas-vindas
  await enviarWhatsApp(usuario.telefone, `
    🎉 Parabéntop, ${usuario.nome}!
    
    Seu acesso ao Hiperagente Áxion está ativo!
    
    Credenciais enviadas para ${email}
    
    Qualquer dúvida, me chama!
    ${dadosEmpresa.whatsapp}
  `);
};
```

---

## 📊 DASHBOARD DE VENDAS

Adicione um painel para acompanhar vendas em tempo real:

```javascript
const DashboardVendas = () => {
  const [vendas, setVendas] = useState([]);
  
  useEffect(() => {
    // Carrega vendas do dia
    carregarVendas();
  }, []);
  
  return (
    <div>
      <h2>💰 Vendas do Dia</h2>
      <div className="metricas">
        <div>Total: R$ {calcularTotal(vendas)}</div>
        <div>Conversões: {vendas.length}</div>
        <div>Ticket Médio: R$ {calcularTicketMedio(vendas)}</div>
      </div>
      
      <div className="lista-vendas">
        {vendas.map(venda => (
          <div key={venda.id} className="venda-item">
            <span>{venda.cliente}</span>
            <span>{venda.plano}</span>
            <span>R$ {venda.valor}</span>
            <span>{venda.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 🎯 RECORRÊNCIA AUTOMÁTICA

Para cobranças mensais:

```javascript
// Mercado Pago - Assinatura
const criarAssinatura = async (cliente, plano) => {
  const response = await fetch('https://api.mercadopago.com/preapproval', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer SEU_ACCESS_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reason: `Hiperagente Áxion - ${plano}`,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: plano === 'top' ? 497 : 1497,
        currency_id: 'BRL'
      },
      back_url: 'https://seu-site.com/pagamento-confirmado',
      payer_email: cliente.email
    })
  });
  
  const data = await response.json();
  return data.init_point; // Link para pagamento
};
```

---

## 🔒 SEGURANÇA

### Validação de Webhook

```javascript
const validarWebhook = (req) => {
  const signature = req.headers['x-signature'];
  const requestId = req.headers['x-request-id'];
  
  // Valide a assinatura
  const isValid = crypto
    .createHmac('sha256', 'SEU_SECRET_KEY')
    .update(JSON.stringify(req.body))
    .digest('hex') === signature;
  
  return isValid;
};

app.post('/webhook', (req, res) => {
  if (!validarWebhook(req)) {
    return res.status(401).send('Unauthorized');
  }
  
  // Processa pagamento...
});
```

---

## 💰 CUSTOS ESTIMADOS

### Cenário: 50 vendas/mês

**Mercado Pago (PIX):**
- 50 vendas × R$ 0,00 = **R$ 0,00**

**Asaas:**
- 50 vendas × R$ 497 × 0,99% = **R$ 245,51**

**PagSeguro:**
- 50 vendas × R$ 497 × 1,99% = **R$ 493,51**

🏆 **VENCEDOR: Mercado Pago (0% de taxa para PIX)**

---

## 📞 SUPORTE TÉCNICO

**Dúvidas sobre integração?**
- WhatsApp: https://wa.me/5575992195441
- Email: micheleclarice@hotmail.com

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

- [ ] Criar conta no gateway escolhido
- [ ] Obter credenciais (API Key/Token)
- [ ] Configurar webhook
- [ ] Testar pagamento em sandbox
- [ ] Ativar modo produção
- [ ] Testar pagamento real
- [ ] Configurar email automático
- [ ] Configurar WhatsApp automático
- [ ] Monitorar primeiras vendas
- [ ] 🚀 Começar a lucrar!

---

**Sistema pronto para receber pagamentos e vender 24/7!** 💸
