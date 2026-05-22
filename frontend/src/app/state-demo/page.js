"use client";

import { useState } from "react";

const stateCatalog = {
  visitante: {
    label: "Visitante",
    badge: "Acesso publico",
    description: "Visualiza o forum, mas precisa se autenticar para interagir.",
    permissions: {
      visualizar: true,
      criar: false,
      comentar: false,
      curtir: false,
      deletar: false,
      banir: false,
      promover: false,
      logout: false,
    },
  },
  membro: {
    label: "Membro",
    badge: "Conta autenticada",
    description: "Pode criar topicos, comentar e curtir, mas sem privilegios de moderacao.",
    permissions: {
      visualizar: true,
      criar: true,
      comentar: true,
      curtir: true,
      deletar: false,
      banir: false,
      promover: false,
      logout: true,
    },
  },
  moderador: {
    label: "Moderador",
    badge: "Moderacao ativa",
    description: "Pode moderar topicos, mas ainda nao possui privilegios totais de administracao.",
    permissions: {
      visualizar: true,
      criar: true,
      comentar: true,
      curtir: true,
      deletar: true,
      banir: false,
      promover: false,
      logout: true,
    },
  },
  admin: {
    label: "Admin",
    badge: "Acesso total",
    description: "Possui acesso completo para gerenciamento do forum e dos usuarios.",
    permissions: {
      visualizar: true,
      criar: true,
      comentar: true,
      curtir: true,
      deletar: true,
      banir: true,
      promover: true,
      logout: true,
    },
  },
};

const actionCatalog = {
  visualizar: {
    label: "Visualizar conteudo",
    success: (state) => `${state.label} acessou o conteudo permitido pelo estado atual.`,
    denied: "Somente estados autenticados ou publicos com acesso valido podem visualizar esse conteudo.",
  },
  criar: {
    label: "Criar topico",
    success: (state) => `${state.label} criou um novo topico no forum ConhecendoIA.`,
    denied: "Visitantes nao podem criar topicos sem autenticar.",
  },
  comentar: {
    label: "Comentar",
    success: (state) => `${state.label} comentou em uma discussao do forum.`,
    denied: "Apenas membros autenticados podem comentar em topicos.",
  },
  curtir: {
    label: "Curtir post",
    success: (state) => `${state.label} curtiu uma publicacao da comunidade.`,
    denied: "Curtidas exigem uma sessao autenticada.",
  },
  deletar: {
    label: "Deletar topico",
    success: (state) => `${state.label} executou uma acao de remocao conforme seu nivel de moderacao.`,
    denied: "Somente moderadores e admins podem deletar topicos alheios.",
  },
  banir: {
    label: "Banir usuario",
    success: () => "Admin removeu um usuario problemático do ecossistema do forum.",
    denied: "Banimento permanente e exclusivo do estado Admin.",
  },
  promover: {
    label: "Promover usuario",
    success: () => "Admin promoveu um membro para a funcao de moderador.",
    denied: "Promocao de usuarios e exclusiva do estado Admin.",
  },
  logout: {
    label: "Logout",
    success: () => "Sessao encerrada com sucesso. O contexto retornou para Visitante.",
    denied: "Visitante ja esta fora de sessao e nao precisa fazer logout.",
  },
};

export default function StateDemoPage() {
  const [currentStateKey, setCurrentStateKey] = useState("visitante");
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "system",
      title: "Demo pronta para gravacao",
      description:
        "Troque os estados e execute acoes para mostrar como o comportamento muda conforme a sessao do usuario.",
    },
  ]);

  const currentState = stateCatalog[currentStateKey];

  const appendLog = (entry) => {
    setLogs((prev) => [{ id: prev.length + 1, ...entry }, ...prev]);
  };

  const transitionTo = (nextStateKey) => {
    const nextState = stateCatalog[nextStateKey];

    appendLog({
      type: "transition",
      title: "Transicao de estado",
      description: `${currentState.label} -> ${nextState.label}. O contexto atualizou as permissoes da sessao.`,
    });

    setCurrentStateKey(nextStateKey);
  };

  const runAction = (actionKey) => {
    const action = actionCatalog[actionKey];
    const allowed = currentState.permissions[actionKey];

    if (actionKey === "logout" && allowed) {
      appendLog({
        type: "success",
        title: action.label,
        description: action.success(currentState),
      });
      transitionTo("visitante");
      return;
    }

    appendLog({
      type: allowed ? "success" : "denied",
      title: action.label,
      description: allowed ? action.success(currentState) : action.denied,
    });
  };

  const availableActions = Object.entries(actionCatalog);

  return (
    <div className="state-demo-page">
      <main className="state-demo-shell">
        <section className="state-demo-hero">
          <span className="state-demo-kicker">Demo de Produto</span>
          <h1>State no fluxo de permissoes do forum ConhecendoIA</h1>
          <p>
            Esta tela mostra como a mesma sessao responde de formas diferentes
            conforme o estado atual do usuario. Em vez de espalhar regras pelo
            sistema, cada estado concentra o comportamento permitido.
          </p>
        </section>

        <div className="state-demo-layout">
          <section className="state-session-card">
            <div className="state-session-header">
              <div>
                <span className="state-chip">Sessao atual</span>
                <h2>{currentState.label}</h2>
              </div>
              <span className={`state-badge state-${currentStateKey}`}>{currentState.badge}</span>
            </div>

            <p className="state-session-description">{currentState.description}</p>

            <div className="state-switcher">
              <div className="state-section-title">
                <h3>Trocar estado</h3>
                <span>Simule a autenticacao e a mudanca de perfil</span>
              </div>

              <div className="state-switcher-grid">
                {Object.entries(stateCatalog).map(([key, state]) => (
                  <button
                    key={key}
                    className={`state-switch-btn ${currentStateKey === key ? "is-active" : ""}`}
                    onClick={() => transitionTo(key)}
                  >
                    <strong>{state.label}</strong>
                    <span>{state.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="state-actions-block">
              <div className="state-section-title">
                <h3>Acoes do forum</h3>
                <span>Cada acao responde de acordo com o estado atual</span>
              </div>

              <div className="state-actions-grid">
                {availableActions.map(([key, action]) => {
                  const allowed = currentState.permissions[key];
                  return (
                    <button
                      key={key}
                      className={`state-action-btn ${allowed ? "is-allowed" : "is-denied"}`}
                      onClick={() => runAction(key)}
                    >
                      <strong>{action.label}</strong>
                      <span>{allowed ? "Permitido" : "Negado"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="state-permissions-block">
              <div className="state-section-title">
                <h3>Permissoes visiveis</h3>
                <span>Resumo rapido do que esse estado pode fazer</span>
              </div>

              <div className="state-permissions-list">
                {availableActions.map(([key, action]) => (
                  <div className="state-permission-item" key={key}>
                    <span>{action.label}</span>
                    <strong>{currentState.permissions[key] ? "Sim" : "Nao"}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="state-events-card">
            <div className="state-section-title">
              <h3>Central de transicoes</h3>
              <span>Como o contexto reage ao estado atual</span>
            </div>

            <div className="state-integration-note">
              <strong>Integracao com o ConhecendoIA</strong>
              <p>
                No sistema real, a sessao do usuario delega o comportamento ao
                estado ativo. Isso deixa a autenticacao, moderacao e permissao
                organizadas sem depender de ifs espalhados em toda a aplicacao.
              </p>
            </div>

            <div className="state-events-list">
              {logs.map((log) => (
                <article className={`state-event-item ${log.type}`} key={log.id}>
                  <span className="state-event-badge">{log.type}</span>
                  <h4>{log.title}</h4>
                  <p>{log.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
