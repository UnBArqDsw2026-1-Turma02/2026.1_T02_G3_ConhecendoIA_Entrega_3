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