"use client";

import { useState } from "react";

const users = {
  membro: { nome: "Joao", tipo: "Membro" },
  admin: { nome: "Guilherme", tipo: "Administrador" },
};

const topic = {
  id: "101",
  titulo: "O que e Deep Learning?",
  resumo:
    "Discussao do forum ConhecendoIA sobre redes neurais profundas, aprendizado supervisionado e uso educacional de IA.",
};

export default function ProxyDemoPage() {
  const [userKey, setUserKey] = useState("membro");
  const [cacheHit, setCacheHit] = useState(false);
  const [topicDeleted, setTopicDeleted] = useState(false);
  const [lastContent, setLastContent] = useState("");
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "system",
      title: "Demo pronta para gravacao",
      description:
        "Mostre a leitura indo ao banco, depois ao cache, e finalize com a diferenca de permissao entre Membro e Administrador.",
    },
  ]);

  const currentUser = users[userKey];

  const appendLog = (entry) => {
    setLogs((prev) => [{ id: prev.length + 1, ...entry }, ...prev]);
  };

  const switchUser = (nextUserKey) => {
    setUserKey(nextUserKey);
    appendLog({
      type: "security",
      title: "Usuario ativo alterado",
      description: `Proxy agora esta respondendo para ${users[nextUserKey].tipo} ${users[nextUserKey].nome}.`,
    });
  };

  const handleVisualizar = () => {
    if (topicDeleted) {
      appendLog({
        type: "denied",
        title: "Topico indisponivel",
        description: "O topico ja foi excluido e nao pode mais ser retornado pelo proxy.",
      });
      return;
    }

    if (cacheHit) {
      appendLog({
        type: "cache",
        title: "Retorno via cache",
        description: `O proxy devolveu o topico ${topic.id} direto da memoria, sem consultar o banco novamente.`,
      });
      setLastContent(`Conteudo em cache do Topico ${topic.id}: ${topic.resumo}`);
      return;
    }

    appendLog({
      type: "database",
      title: "Consulta ao banco",
      description: `Proxy acessou o servico real e executou a leitura do topico ${topic.id}.`,
    });
    setCacheHit(true);
    setLastContent(`Conteudo detalhado do Topico ${topic.id}: ${topic.resumo}`);
  };

  const handleExcluir = () => {
    if (topicDeleted) {
      appendLog({
        type: "denied",
        title: "Exclusao ignorada",
        description: "O topico ja foi removido anteriormente.",
      });
      return;
    }

    if (currentUser.tipo !== "Administrador") {
      appendLog({
        type: "security",
        title: "Acesso negado",
        description: `O proxy bloqueou a exclusao porque ${currentUser.nome} nao possui privilegios administrativos.`,
      });
      return;
    }

    appendLog({
      type: "security",
      title: "Autorizacao concedida",
      description: `Proxy autorizou ${currentUser.nome} a excluir o topico ${topic.id}.`,
    });

    appendLog({
      type: "database",
      title: "DELETE executado no servico real",
      description: `Servico real removeu o topico ${topic.id} do banco de dados.`,
    });

    appendLog({
      type: "cache",
      title: "Cache invalidado",
      description: "O proxy removeu o topico do cache para evitar leitura de dados apagados.",
    });

    setTopicDeleted(true);
    setCacheHit(false);
    setLastContent("Topico removido com sucesso.");
  };

  return (
    <div className="proxy-demo-page">
      <main className="proxy-demo-shell">
        <section className="proxy-demo-hero">
          <span className="proxy-demo-kicker">Demo de Produto</span>
          <h1>Proxy protegendo topicos e acelerando leitura no ConhecendoIA</h1>
          <p>
            Esta tela mostra como um proxy pode atuar como intermediario entre o
            usuario e o servico real, concentrando regras de cache e seguranca
            antes de acessar o banco de dados.
          </p>
        </section>

        <div className="proxy-demo-layout">
          <section className="proxy-topic-card">
            <div className="proxy-topic-header">
              <div>
                <span className="proxy-chip">Topico monitorado</span>
                <h2>{topic.titulo}</h2>
              </div>
              <span className={`proxy-user-badge proxy-${userKey}`}>
                {currentUser.tipo}: {currentUser.nome}
              </span>
            </div>

            <p className="proxy-topic-description">{topic.resumo}</p>

            <div className="proxy-user-switcher">
              <div className="proxy-section-title">
                <h3>Usuario ativo</h3>
                <span>Troque o perfil para demonstrar autorizacao pelo proxy</span>
              </div>

              <div className="proxy-switcher-grid">
                {Object.entries(users).map(([key, user]) => (
                  <button
                    key={key}
                    className={`proxy-switch-btn ${userKey === key ? "is-active" : ""}`}
                    onClick={() => switchUser(key)}
                  >
                    <strong>{user.nome}</strong>
                    <span>{user.tipo}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="proxy-actions-block">
              <div className="proxy-section-title">
                <h3>Acoes do topico</h3>
                <span>Leitura com cache e exclusao protegida</span>
              </div>

              <div className="proxy-actions-row">
                <button className="proxy-primary-btn" onClick={handleVisualizar}>
                  Visualizar topico
                </button>
                <button className="proxy-danger-btn" onClick={handleExcluir}>
                  Excluir topico
                </button>
              </div>
            </div>

            <div className="proxy-status-grid">
              <div className="proxy-status-card">
                <strong>Cache</strong>
                <span>{cacheHit ? "Preenchido" : "Vazio"}</span>
              </div>
              <div className="proxy-status-card">
                <strong>Topico</strong>
                <span>{topicDeleted ? "Excluido" : "Disponivel"}</span>
              </div>
            </div>

            <div className="proxy-preview-card">
              <div className="proxy-section-title">
                <h3>Resposta atual do sistema</h3>
                <span>O que o usuario recebeu depois da ultima acao</span>
              </div>
              <p>{lastContent || "Nenhuma leitura feita ainda. Clique em visualizar topico."}</p>
            </div>
          </section>

          <aside className="proxy-events-card">
            <div className="proxy-section-title">
              <h3>Central do proxy</h3>
              <span>Cache, seguranca e servico real em evidencia</span>
            </div>

            <div className="proxy-integration-note">
              <strong>Integracao com o ConhecendoIA</strong>
              <p>
                No sistema real, o proxy pode proteger operacoes sensiveis e
                acelerar leituras recorrentes sem alterar diretamente o servico
                que acessa o banco.
              </p>
            </div>

            <div className="proxy-events-list">
              {logs.map((log) => (
                <article className={`proxy-event-item ${log.type}`} key={log.id}>
                  <span className="proxy-event-badge">{log.type}</span>
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
