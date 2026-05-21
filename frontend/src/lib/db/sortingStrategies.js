// Estratégia 1: Mais Recentes (Data Decrescente)
export class SortByDateDescendingStrategy {
  sort(posts) {
    return [...posts].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

// Estratégia 2: Mais Antigos (Data Crescente)
export class SortByDateAscendingStrategy {
  sort(posts) {
    return [...posts].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
}

// Estratégia 3: Criador de A a Z (Alfabética Crescente)
export class SortByCreatorAscendingStrategy {
  sort(posts) {
    return [...posts].sort((a, b) => 
      a.creatorName.localeCompare(b.creatorName)
    );
  }
}

// Estratégia 4: Criador de Z a A (Alfabética Decrescente)
export class SortByCreatorDescendingStrategy {
  sort(posts) {
    return [...posts].sort((a, b) => 
      b.creatorName.localeCompare(a.creatorName)
    );
  }
}