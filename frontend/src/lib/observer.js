class Subject {
  constructor() {
    this.observers = [];
  }

  inscrever(observer) {
    // garante que o observer tem atualizar()
    if (typeof observer.atualizar !== "function") {
      throw new Error("Observer deve implementar o método atualizar()");
    }
    this.observers.push(observer);
  }

  desinscrever(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notificar(dados) {
    this.observers.forEach(obs => obs.atualizar(dados));
  }

}

class NotificacaoPushObserver {
  // Desestruturação com fallback seguro para detalhe
  atualizar({ tipo, post, atorInteracao, detalhe = null }) {
    const autorDoPost = post.autor.nome;

    if (tipo === "comentario") {
      console.log(`🔔 [PUSH para ${autorDoPost}]: ${atorInteracao.nome} comentou. Disse: "${detalhe}"`);
    } else if (tipo === "curtida") {
      console.log(`🔔 [PUSH para ${autorDoPost}]: "${post.titulo}" recebeu curtida de ${atorInteracao.nome}.`);
    }
  }
}

class NotificacaoEmailObserver {
  atualizar({ tipo, post, atorInteracao }) {
    const autorDoPost = post.autor.nome;
    if (tipo === "comentario") {
      console.log(`📧 [E-MAIL para ${autorDoPost}]: Novo comentário de ${atorInteracao.nome} em "${post.titulo}".`);
    }
  }
}

const profAltair = new Usuario(1, "Prof. Altair");
const alunoJoao  = new Usuario(2, "João Silva");
const alunaMaria = new Usuario(3, "Maria Souza");

const postRedesNeurais = new Post(101, "O que é um Perceptron?", "...", profAltair);

const servicoPush  = new NotificacaoPushObserver();
const servicoEmail = new NotificacaoEmailObserver();

postRedesNeurais.inscrever(servicoPush);
postRedesNeurais.inscrever(servicoEmail);

postRedesNeurais.adicionarCurtida(alunoJoao);
postRedesNeurais.adicionarComentario(alunaMaria, "Excelente explicação!");
postRedesNeurais.adicionarComentario(profAltair, "Fico feliz em ajudar!");

// Exemplo: desinscrever push quando usuário desativa notificações
postRedesNeurais.desinscrever(servicoPush);
console.log("Push desativado para este post.");