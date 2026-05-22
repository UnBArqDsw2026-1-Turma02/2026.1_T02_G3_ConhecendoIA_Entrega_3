"use client";

import { useState } from "react";

class DemoSubject {
  constructor() {
    this.observers = [];
  }

  inscrever(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  notificar(payload, appendLog) {
    appendLog({
      type: "system",
      title: "Subject notificou observers",
      description: `${this.observers.length} observer(s) ativo(s) receberam o evento "${payload.tipo}".`,
    });

    this.observers.forEach((observer) => observer.atualizar(payload, appendLog));
  }
}

class PushObserver {
  atualizar({ tipo, post, atorInteracao, detalhe }, appendLog) {
    const autor = post.autor.nome;

    if (tipo === "curtida") {
      appendLog({
        type: "push",
        title: "Push enviado",
        description: `"${post.titulo}" recebeu curtida de ${atorInteracao.nome}. Notificacao enviada para ${autor}.`,
      });
    }

    if (tipo === "comentario") {
      appendLog({
        type: "push",
        title: "Push enviado",
        description: `${atorInteracao.nome} comentou para ${autor}: "${detalhe}".`,
      });
    }
  }
}

class EmailObserver {
  atualizar({ tipo, post, atorInteracao }, appendLog) {
    if (tipo !== "comentario") {
      return;
    }

    appendLog({
      type: "email",
      title: "E-mail preparado",
      description: `Novo comentario de ${atorInteracao.nome} em "${post.titulo}" para ${post.autor.nome}.`,
    });
  }
}

const autorDoPost = { id: 1, nome: "Prof. Altair" };
const usuarioAtual = { id: 2, nome: "Joao Guilherme" };

const postInicial = {
  id: 101,
  titulo: "Como o Observer ajuda no fluxo de notificacoes do forum?",
  conteudo:
    "Neste exemplo, o post funciona como sujeito observado. Sempre que recebe uma curtida ou comentario, os observers inscritos reagem sem acoplamento direto com a tela principal.",
  autor: autorDoPost,
  curtidas: 12,
};

export default function ObserverDemoPage() {
  const [pushAtivo, setPushAtivo] = useState(true);
  const [emailAtivo, setEmailAtivo] = useState(true);
  const [curtidas, setCurtidas] = useState(postInicial.curtidas);
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      autor: "Mariana",
      texto: "Gostei da ideia de usar notificacoes desacopladas no ConhecendoIA.",
      horario: "Hoje, 20:14",
    },
  ]);
  const [eventos, setEventos] = useState([
    {
      id: 1,
      type: "system",
      title: "Demo pronta para gravacao",
      description:
        "Ative ou desative observers, curta o post e publique comentarios para mostrar o fluxo do pattern Observer.",
    },
  ]);

  const appendLog = (entry) => {
    setEventos((prev) => [
      {
        id: prev.length + 1,
        ...entry,
      },
      ...prev,
    ]);
  };

  const createSubject = () => {
    const subject = new DemoSubject();

    if (pushAtivo) {
      subject.inscrever(new PushObserver());
    }

    if (emailAtivo) {
      subject.inscrever(new EmailObserver());
    }

    return subject;
  };

  const handleToggle = (channel) => {
    const nextValue = channel === "push" ? !pushAtivo : !emailAtivo;

    if (channel === "push") {
      setPushAtivo(nextValue);
      appendLog({
        type: "system",
        title: `Observer de push ${nextValue ? "inscrito" : "desinscrito"}`,
        description: nextValue
          ? "O canal de push voltou a receber notificacoes do post."
          : "O canal de push deixou de observar o post.",
      });
      return;
    }

    setEmailAtivo(nextValue);
    appendLog({
      type: "system",
      title: `Observer de e-mail ${nextValue ? "inscrito" : "desinscrito"}`,
      description: nextValue
        ? "O canal de e-mail voltou a receber notificacoes do post."
        : "O canal de e-mail deixou de observar o post.",
    });
  };

  const handleCurtir = () => {
    const subject = createSubject();
    const total = curtidas + 1;
    setCurtidas(total);

    appendLog({
      type: "interaction",
      title: "Curtida registrada",
      description: `${usuarioAtual.nome} curtiu a postagem. Total de curtidas: ${total}.`,
    });

    subject.notificar(
      {
        tipo: "curtida",
        post: postInicial,
        atorInteracao: usuarioAtual,
      },
      appendLog
    );
  };

  const handleComentar = () => {
    const texto = comentario.trim();

    if (!texto) {
      appendLog({
        type: "system",
        title: "Comentario vazio ignorado",
        description: "Digite um comentario antes de enviar para demonstrar o Observer.",
      });
      return;
    }

    const novoComentario = {
      id: comentarios.length + 1,
      autor: usuarioAtual.nome,
      texto,
      horario: "Agora",
    };

    setComentarios((prev) => [novoComentario, ...prev]);
    setComentario("");

    appendLog({
      type: "interaction",
      title: "Comentario publicado",
      description: `${usuarioAtual.nome} comentou no post observado.`,
    });

    const subject = createSubject();
    subject.notificar(
      {
        tipo: "comentario",
        post: postInicial,
        atorInteracao: usuarioAtual,
        detalhe: texto,
      },
      appendLog
    );
  };

  return (
    <div className="observer-demo-page">
      <main className="observer-demo-shell">
        <section className="observer-demo-hero">
          <span className="observer-demo-kicker">Demo de Produto</span>
          <h1>Observer no contexto real do forum ConhecendoIA</h1>
          <p>
            Esta tela simula uma postagem do forum sendo observada por canais de
            notificacao. Quando voce curte ou comenta, o Subject dispara eventos
            e os observers inscritos reagem em tempo real.
          </p>
        </section>

        <div className="observer-demo-layout">
          <section className="observer-feed-card">
            <div className="observer-post-meta">
              <div>
                <span className="observer-chip">Post observado</span>
                <h2>{postInicial.titulo}</h2>
              </div>
              <span className="observer-author">por {postInicial.autor.nome}</span>
            </div>

            <p className="observer-post-content">{postInicial.conteudo}</p>

            <div className="observer-stats">
              <div>
                <strong>{curtidas}</strong>
                <span>curtidas</span>
              </div>
              <div>
                <strong>{comentarios.length}</strong>
                <span>comentarios</span>
              </div>
            </div>

            <div className="observer-actions">
              <button className="observer-primary-btn" onClick={handleCurtir}>
                Curtir postagem
              </button>
              <button
                className="observer-secondary-btn"
                onClick={() => setComentario("Excelente exemplo de notificacao desacoplada!")}
              >
                Preencher comentario exemplo
              </button>
            </div>

            <div className="observer-preferences">
              <div className="observer-preferences-copy">
                <h3>Canais inscritos neste post</h3>
                <p>
                  Ative ou desative os observers para mostrar que o Subject pode
                  notificar diferentes servicos sem mudar a regra principal do post.
                </p>
              </div>

              <div className="observer-toggle-group">
                <button
                  className={`observer-toggle ${pushAtivo ? "is-active" : ""}`}
                  onClick={() => handleToggle("push")}
                >
                  Push {pushAtivo ? "ativo" : "inativo"}
                </button>
                <button
                  className={`observer-toggle ${emailAtivo ? "is-active" : ""}`}
                  onClick={() => handleToggle("email")}
                >
                  E-mail {emailAtivo ? "ativo" : "inativo"}
                </button>
              </div>
            </div>

            <div className="observer-comment-box">
              <label htmlFor="observer-comment">Comentar como {usuarioAtual.nome}</label>
              <textarea
                id="observer-comment"
                value={comentario}
                onChange={(event) => setComentario(event.target.value)}
                placeholder="Explique como esse evento deveria disparar notificacoes no ConhecendoIA..."
              />
              <button className="observer-primary-btn" onClick={handleComentar}>
                Publicar comentario
              </button>
            </div>

            <div className="observer-comments">
              <div className="observer-section-title">
                <h3>Comentarios recentes</h3>
                <span>Fluxo visivel para a gravacao</span>
              </div>

              {comentarios.map((item) => (
                <article className="observer-comment-card" key={item.id}>
                  <div className="observer-comment-header">
                    <strong>{item.autor}</strong>
                    <span>{item.horario}</span>
                  </div>
                  <p>{item.texto}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="observer-events-card">
            <div className="observer-section-title">
              <h3>Central de eventos</h3>
              <span>Como o pattern reage por tras da interface</span>
            </div>

            <div className="observer-integration-note">
              <strong>Integracao com o ConhecendoIA</strong>
              <p>
                No sistema real, a entidade Post pode agir como Subject. Cada
                comentario ou curtida dispara notificacoes para servicos como push
                e e-mail, sem acoplamento direto com a camada de interface.
              </p>
            </div>

            <div className="observer-events-list">
              {eventos.map((evento) => (
                <article className={`observer-event-item ${evento.type}`} key={evento.id}>
                  <span className="observer-event-badge">{evento.type}</span>
                  <h4>{evento.title}</h4>
                  <p>{evento.description}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
