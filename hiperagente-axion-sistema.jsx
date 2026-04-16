import React, { useState, useEffect } from 'react';
import { Brain, Lock, TrendingUp, Users, Zap, DollarSign, Check, Crown, Star, LogOut, Settings, BarChart3, MessageSquare, Target, Send } from 'lucide-react';

// Sistema de Autenticação
const AUTH_USERS = {
  admin: {
    username: 'admin',
    password: 'axion2024@admin',
    role: 'admin',
    nome: 'Administrador Axion'
  },
  demo: {
    username: 'demo',
    password: 'demo123',
    role: 'user',
    nome: 'Usuário Demo',
    plano: 'free'
  }
};

const HiperagenteAxion = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Estados do sistema
  const [leads, setLeads] = useState([
    {
      id: 1,
      nome: "Maria Oliveira",
      email: "maria@techcorp.com",
      telefone: "+55 75 99999-1111",
      empresa: "TechCorp Solutions",
      etapa: "Interesse",
      diasParado: 8,
      contexto: "Demonstrou interesse em automação de vendas com IA",
      statusIA: "pendente",
      ultimaInteracao: "2024-04-08"
    },
    {
      id: 2,
      nome: "Carlos Santos",
      email: "carlos@digitalmax.com",
      telefone: "+55 75 99999-2222",
      empresa: "DigitalMax",
      etapa: "Proposta",
      diasParado: 4,
      contexto: "Recebeu proposta comercial, aguardando feedback",
      statusIA: "pendente",
      ultimaInteracao: "2024-04-12"
    },
    {
      id: 3,
      nome: "Ana Paula Costa",
      email: "ana@growthlab.com",
      telefone: "+55 75 99999-3333",
      empresa: "GrowthLab",
      etapa: "Negociação",
      diasParado: 6,
      contexto: "Negociando condições de pagamento",
      statusIA: "pendente",
      ultimaInteracao: "2024-04-10"
    }
  ]);

  const [processingLead, setProcessingLead] = useState(null);
  const [aiMessage, setAiMessage] = useState(null);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [stats, setStats] = useState({
    leadsProcessados: 0,
    conversoes: 0,
    receita: 0,
    taxaConversao: 0
  });

  const dadosEmpresa = {
    nome: "Hiperagente Áxion - Engenharia de Marketing",
    email: "micheleclarice@hotmail.com",
    whatsapp: "https://wa.me/5575992195441",
    telefone: "+55 75 99219-5441",
    site: "https://readdy.cc/preview/0bd8cb3f-d6a3-428a-a85e-91e4d98a74dc/7740234/k",
    linkedin: "https://www.linkedin.com/in/axionmarketingweb/",
    instagram: "https://www.instagram.com/axionmarketingweb/",
    googleBusiness: "https://share.google/bPUQOAxyX8BPP5LGO",
    sede: "Feira de Santana, BA",
    produtoAfiliado: "https://dealism.ai/?via=axion"
  };

  const planos = {
    free: {
      nome: "Starter",
      preco: 0,
      mensais: "Grátis",
      recursos: ["5 leads/mês", "IA básica", "Relatórios simples"]
    },
    top: {
      nome: "Top",
      preco: 497,
      mensais: "R$ 497/mês",
      recursos: ["100 leads/mês", "IA avançada", "WhatsApp integrado", "Relatórios completos", "Suporte prioritário"]
    },
    premium: {
      nome: "Premium",
      preco: 1497,
      mensais: "A consultar",
      recursos: ["Leads ilimitados", "IA ultra avançada", "Multi-canal", "Análise preditiva", "Gerente dedicado", "API customizada", "White label"]
    }
  };

  // Função de Login
  const handleLogin = (e) => {
    e.preventDefault();
    const user = AUTH_USERS[loginForm.username];
    
    if (user && user.password === loginForm.password) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoginError('');
      setShowLogin(false);
    } else {
      setLoginError('Usuário ou senha incorretos');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowLogin(true);
    setLoginForm({ username: '', password: '' });
  };

  // Função de IA Real usando Anthropic API
  const processarLeadComIA = async (lead) => {
    setProcessingLead(lead.id);
    setIsProcessingAI(true);

    try {
      const prompt = `Você é um especialista em vendas da ${dadosEmpresa.nome}.

CONTEXTO DO LEAD:
- Nome: ${lead.nome}
- Empresa: ${lead.empresa}
- Etapa no funil: ${lead.etapa}
- Dias sem interação: ${lead.diasParado}
- Contexto: ${lead.contexto}
- Última interação: ${lead.ultimaInteracao}

PRODUTO A VENDER: Dealism.AI - Plataforma de IA para automação de vendas
Link de afiliado: ${dadosEmpresa.produtoAfiliado}

MISSÃO:
Crie uma mensagem persuasiva e personalizada para reengajar este lead. A mensagem deve:
1. Ser natural e humana (não parecer automática)
2. Abordar o contexto específico do lead
3. Criar urgência sem ser agressiva
4. Incluir call-to-action claro
5. Mencionar o produto Dealism.AI de forma sutil
6. Incluir link do WhatsApp: ${dadosEmpresa.whatsapp}

Formato: Mensagem pronta para envio (máximo 200 palavras).`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      const mensagemGerada = data.content[0].text;

      setAiMessage({
        lead: lead.nome,
        email: lead.email,
        texto: mensagemGerada,
        timestamp: new Date().toLocaleString('pt-BR')
      });

      // Atualizar lead
      setTimeout(() => {
        setLeads(prev => prev.map(l => 
          l.id === lead.id 
            ? { ...l, statusIA: "processado", diasParado: 0 }
            : l
        ));

        setStats(prev => ({
          leadsProcessados: prev.leadsProcessados + 1,
          conversoes: prev.conversoes + 0.25,
          receita: prev.receita + 124.25,
          taxaConversao: Math.min(prev.taxaConversao + 3.5, 45)
        }));

        setIsProcessingAI(false);
      }, 2000);

    } catch (error) {
      console.error('Erro ao processar IA:', error);
      setAiMessage({
        lead: lead.nome,
        texto: "Erro ao gerar mensagem. Por favor, tente novamente.",
        erro: true
      });
      setIsProcessingAI(false);
    }

    setProcessingLead(null);
  };

  // Processar todos os leads
  const processarTodosLeads = () => {
    leads.filter(l => l.statusIA === "pendente").forEach((lead, index) => {
      setTimeout(() => {
        processarLeadComIA(lead);
      }, index * 6000);
    });
  };

  // Tela de Login
  if (showLogin || !isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          maxWidth: '450px',
          width: '100%',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)'
        }}>
          {/* Logo */}
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Brain size={40} color="white" />
          </div>

          <h1 style={{ textAlign: 'center', margin: '0 0 10px 0', fontSize: '28px', color: '#1a202c' }}>
            Hiperagente Áxion
          </h1>
          <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>
            Sistema de Vendas Autônomas com IA
          </p>

          {loginError && (
            <div style={{
              background: '#fee2e2',
              color: '#991b1b',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Usuário
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                placeholder="Digite seu usuário"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Senha
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                placeholder="Digite sua senha"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <Lock size={20} />
              Entrar no Sistema
            </button>
          </form>

          {/* Credenciais de teste */}
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f8fafc',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#64748b'
          }}>
            <strong style={{ display: 'block', marginBottom: '10px', color: '#1a202c' }}>
              🔐 Credenciais de Acesso:
            </strong>
            <div style={{ marginBottom: '8px' }}>
              <strong>Admin:</strong> admin / axion2024@admin
            </div>
            <div>
              <strong>Demo:</strong> demo / demo123
            </div>
          </div>

          {/* Planos */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            borderRadius: '12px',
            fontSize: '12px',
            textAlign: 'center'
          }}>
            <strong style={{ color: '#92400e', display: 'block', marginBottom: '5px' }}>
              💎 Planos Disponíveis
            </strong>
            <div style={{ color: '#92400e' }}>
              Top: R$ 497/mês • Premium: A consultar
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Principal
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '20px 30px',
        marginBottom: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Brain size={28} color="white" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', color: '#1a202c' }}>
              Hiperagente Áxion
            </h1>
            <p style={{ margin: '3px 0 0 0', color: '#64748b', fontSize: '13px' }}>
              Bem-vindo, {currentUser.nome}
              {currentUser.role === 'admin' && ' 👑'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentUser.plano && (
            <div style={{
              background: currentUser.plano === 'premium' ? 'linear-gradient(135deg, #f093fb, #f5576c)' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {currentUser.plano === 'premium' ? <Crown size={16} /> : <Star size={16} />}
              {planos[currentUser.plano]?.nome || 'Free'}
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Users size={22} color="white" />
            </div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Leads Processados</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c' }}>{stats.leadsProcessados}</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={22} color="white" />
            </div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Conversões</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c' }}>{stats.conversoes.toFixed(0)}</div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={22} color="white" />
            </div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Receita Gerada</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c' }}>
            R$ {stats.receita.toFixed(2)}
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #ec4899, #db2777)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp size={22} color="white" />
            </div>
            <span style={{ fontSize: '13px', color: '#64748b' }}>Taxa Conversão</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a202c' }}>
            {stats.taxaConversao.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Área Principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Painel de Leads */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#1a202c' }}>
              🎯 Funil de Vendas
            </h2>
            <button
              onClick={processarTodosLeads}
              disabled={isProcessingAI}
              style={{
                background: isProcessingAI ? '#cbd5e1' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                cursor: isProcessingAI ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Zap size={18} />
              {isProcessingAI ? 'Processando...' : 'Processar Todos'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '600px', overflowY: 'auto' }}>
            {leads.map(lead => (
              <div
                key={lead.id}
                style={{
                  background: lead.statusIA === 'processado' ? '#f0fdf4' : '#fff',
                  border: `2px solid ${lead.statusIA === 'processado' ? '#86efac' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '15px',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#1a202c' }}>{lead.nome}</h3>
                    <p style={{ margin: '2px 0', fontSize: '12px', color: '#64748b' }}>{lead.empresa}</p>
                    <p style={{ margin: '2px 0', fontSize: '11px', color: '#94a3b8' }}>{lead.email}</p>
                  </div>
                  <div style={{
                    background: lead.statusIA === 'processado' ? '#86efac' : '#fef3c7',
                    color: lead.statusIA === 'processado' ? '#166534' : '#92400e',
                    borderRadius: '8px',
                    padding: '5px 10px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {lead.statusIA === 'processado' ? '✓ Processado' : `${lead.diasParado}d parado`}
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '10px',
                  fontSize: '12px',
                  color: '#64748b'
                }}>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Etapa:</strong> {lead.etapa}
                  </div>
                  <div>{lead.contexto}</div>
                </div>

                {lead.statusIA === 'pendente' && (
                  <button
                    onClick={() => processarLeadComIA(lead)}
                    disabled={processingLead === lead.id || isProcessingAI}
                    style={{
                      width: '100%',
                      background: processingLead === lead.id 
                        ? '#cbd5e1' 
                        : 'linear-gradient(135deg, #667eea, #764ba2)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: processingLead === lead.id ? 'not-allowed' : 'pointer',
                      fontWeight: 'bold',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    {processingLead === lead.id ? (
                      <>
                        <div style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid white',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        IA Analisando...
                      </>
                    ) : (
                      <>
                        <Brain size={16} />
                        Ativar IA
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Painel Lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Mensagem IA */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '25px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#1a202c' }}>
              🤖 Mensagem Gerada pela IA
            </h2>

            {aiMessage ? (
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '12px',
                  fontSize: '13px'
                }}>
                  <strong>Para:</strong> {aiMessage.lead} ({aiMessage.email})
                  <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '5px' }}>
                    {aiMessage.timestamp}
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '15px',
                  marginBottom: '12px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#1a202c',
                  whiteSpace: 'pre-wrap',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}>
                  {aiMessage.texto}
                </div>

                <button style={{
                  width: '100%',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <Send size={16} />
                  Enviar via WhatsApp
                </button>
              </div>
            ) : (
              <div style={{
                background: '#f8fafc',
                borderRadius: '10px',
                padding: '30px',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '13px'
              }}>
                <Brain size={36} style={{ opacity: 0.3, margin: '0 auto 10px' }} />
                <p style={{ margin: 0 }}>
                  Selecione um lead para a IA gerar uma mensagem
                </p>
              </div>
            )}
          </div>

          {/* Info Empresa */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1a202c' }}>
              🔗 {dadosEmpresa.nome}
            </h3>
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.8' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Email:</strong> {dadosEmpresa.email}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Telefone:</strong> {dadosEmpresa.telefone}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Sede:</strong> {dadosEmpresa.sede}
              </div>
              <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <a href={dadosEmpresa.whatsapp} target="_blank" style={{
                  background: '#25d366',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>WhatsApp</a>
                <a href={dadosEmpresa.site} target="_blank" style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>Site</a>
                <a href={dadosEmpresa.produtoAfiliado} target="_blank" style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>Dealism.AI</a>
              </div>
            </div>
          </div>

          {/* Upgrade Plano */}
          {(!currentUser.plano || currentUser.plano === 'free') && (
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#92400e' }}>
                💎 Upgrade seu Plano
              </h3>
              <p style={{ fontSize: '12px', color: '#92400e', marginBottom: '15px' }}>
                Desbloqueie recursos avançados e processe leads ilimitados
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>
                  Plano Top - R$ 497/mês
                </button>
                <button style={{
                  background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>
                  Plano Premium - Consultar
                </button>
              </div>
              <p style={{ fontSize: '10px', color: '#92400e', marginTop: '10px', textAlign: 'center' }}>
                Pagamento via PIX: {dadosEmpresa.email}
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HiperagenteAxion;
