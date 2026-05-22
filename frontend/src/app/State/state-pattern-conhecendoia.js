// ============================================================================
//  STATE BASE — Define a interface comum para todos os estados
// ============================================================================
class UserState {
  /**
   * @param {string} stateName - Nome do estado para identificação
   */
  constructor(stateName) {
    if (new.target === UserState) {
      throw new Error("UserState é abstrata e não pode ser instanciada diretamente.");
    }
    this.stateName = stateName;
  }

  viewContent()    { throw new Error(`${this.stateName} deve implementar viewContent().`); }
  createPost()     { throw new Error(`${this.stateName} deve implementar createPost().`); }
  commentOnPost()  { throw new Error(`${this.stateName} deve implementar commentOnPost().`); }
  likePost()       { throw new Error(`${this.stateName} deve implementar likePost().`); }
  deletePost()     { throw new Error(`${this.stateName} deve implementar deletePost().`); }
  banUser()        { throw new Error(`${this.stateName} deve implementar banUser().`); }
  authenticate()   { throw new Error(`${this.stateName} deve implementar authenticate().`); }
  logout()         { throw new Error(`${this.stateName} deve implementar logout().`); }
  promote()        { throw new Error(`${this.stateName} deve implementar promote().`); }

  _denied(action) {
    console.log(`[${this.stateName}] Acesso negado: "${action}" não é permitido neste estado.\n`);
  }

  _success(action) {
    console.log(`[${this.stateName}] "${action}" executado com sucesso.\n`);
  }
}

// ============================================================================
//  CONCRETE STATE 1 — GuestState (Visitante não autenticado)
// ============================================================================
class GuestState extends UserState {
  constructor() {
    super("Visitante");
  }

  viewContent() {
    this._success("Visualizar conteúdo público do fórum");
  }

  createPost(context) {
    this._denied("Criar tópico");
    console.log("Dica: Faça login ou cadastre-se para criar tópicos.\n");
  }

  commentOnPost(context) {
    this._denied("Comentar em tópico");
    console.log("Dica: Apenas membros cadastrados podem comentar.\n");
  }

  likePost(context) {
    this._denied("Curtir tópico");
  }

  deletePost(context) {
    this._denied("Deletar tópico");
  }

  banUser(context) {
    this._denied("Banir usuário");
  }

  authenticate(context, credentials) {
    const { username, password } = credentials;

    const fakeDB = {
      joao:  { password: "123456", role: "member" },
      admin: { password: "admin123", role: "admin" },
      mod:   { password: "mod123",   role: "moderator" },
    };

    if (!fakeDB[username] || fakeDB[username].password !== password) {
      console.log(`[${this.stateName}] Falha na autenticação: usuário ou senha incorretos.\n`);
      return;
    }

    const role = fakeDB[username].role;
    console.log(`[${this.stateName}] Credenciais válidas para "${username}". Transicionando...\n`);

    if (role === "admin")      context.setState(new AdminState(username));
    else if (role === "moderator") context.setState(new ModeratorState(username));
    else                       context.setState(new MemberState(username));
  }

  logout(context) {
    console.log(`[${this.stateName}] Já está no estado de visitante.\n`);
  }

  promote(context) {
    this._denied("Promover usuário");
  }
}

// ============================================================================
//  CONCRETE STATE 2 — MemberState (Membro autenticado)
// ============================================================================
class MemberState extends UserState {
  constructor(username) {
    super("Membro");
    this.username = username;
  }

  viewContent() {
    this._success("Visualizar conteúdo do fórum (incluindo áreas exclusivas)");
  }

  createPost(context) {
    this._success(`Criar novo tópico como @${this.username}`);
  }

  commentOnPost(context) {
    this._success(`Comentar em tópico como @${this.username}`);
  }

  likePost(context) {
    this._success(`Curtir tópico como @${this.username}`);
  }

  deletePost(context) {
    this._denied("Deletar tópico de outro usuário");
    console.log("Dica: Membros só podem excluir seus próprios tópicos.\n");
  }

  banUser(context) {
    this._denied("Banir usuário");
  }

  authenticate(context, credentials) {
    console.log(`[${this.stateName}] @${this.username} já está autenticado.\n`);
  }

  logout(context) {
    console.log(`[${this.stateName}] @${this.username} saiu da sessão. Voltando ao estado Visitante.\n`);
    context.setState(new GuestState());
  }

  promote(context) {
    this._denied("Promover a si mesmo");
    console.log("Dica: Apenas um Admin pode promover membros.\n");
  }
}

// ============================================================================
//  CONCRETE STATE 3 — ModeratorState (Moderador)
// ============================================================================
class ModeratorState extends UserState {
  constructor(username) {
    super("Moderador");
    this.username = username;
  }

  viewContent() {
    this._success("Visualizar todo o conteúdo (incluindo tópicos reportados)");
  }

  createPost(context) {
    this._success(`Criar tópico fixado como Moderador @${this.username}`);
  }

  commentOnPost(context) {
    this._success(`Comentar com badge de Moderador como @${this.username}`);
  }

  likePost(context) {
    this._success(`Curtir tópico como Moderador @${this.username}`);
  }

  deletePost(context, postTitle) {
    this._success(`Deletar tópico "${postTitle || 'selecionado'}" (ação de moderação)`);
  }

  banUser(context) {
    this._denied("Banir usuário permanentemente");
    console.log("  Dica: Moderadores podem apenas silenciar. Bans permanentes são exclusivos do Admin.\n");
  }

  authenticate(context, credentials) {
    console.log(`[${this.stateName}] @${this.username} já está autenticado como Moderador.\n`);
  }

  logout(context) {
    console.log(`[${this.stateName}] @${this.username} encerrou sessão de moderação.\n`);
    context.setState(new GuestState());
  }

  promote(context) {
    this._denied("Promover usuários");
    console.log("Dica: Somente Admins podem promover usuários.\n");
  }
}

// ============================================================================
//  CONCRETE STATE 4 — AdminState (Administrador — acesso total)
// ============================================================================
class AdminState extends UserState {
  constructor(username) {
    super("Admin");
    this.username = username;
  }

  viewContent() {
    this._success("Visualizar todo o conteúdo (incluindo logs e dados internos)");
  }

  createPost(context) {
    this._success(`Criar tópico pinado como Admin @${this.username}`);
  }

  commentOnPost(context) {
    this._success(`Comentar com badge Admin como @${this.username}`);
  }

  likePost(context) {
    this._success(`Curtir tópico como Admin @${this.username}`);
  }

  deletePost(context, postTitle) {
    this._success(`Deletar tópico "${postTitle || 'selecionado'}" permanentemente`);
  }

  banUser(context, targetUser) {
    this._success(`Banir usuário @${targetUser || 'alvo'} do fórum ConhecendoIA`);
  }

  authenticate(context, credentials) {
    console.log(`[${this.stateName}] @${this.username} já está autenticado como Admin.\n`);
  }

  logout(context) {
    console.log(`[${this.stateName}] @${this.username} encerrou sessão de administração.\n`);
    context.setState(new GuestState());
  }

  promote(context, targetUsername) {
    this._success(`Promover @${targetUsername} a Moderador no ConhecendoIA`);
    console.log(`(Em uma implementação real, a sessão de @${targetUsername} receberia ModeratorState)\n`);
  }
}

// ============================================================================
//  CONTEXT — UserSession (Classe consumida pela aplicação)
// ============================================================================
class UserSession {
  // Declaração do campo privado (True Private Field no JS moderno)
  #state;

  constructor() {
    // Estado inicial: sempre começa como Visitante
    this.#state = new GuestState();
    console.log("Nova sessão iniciada. Estado atual: [Visitante]\n");
  }

  /**
   * Muda o estado atual e imprime a transição
   * @param {UserState} newState
   */
  setState(newState) {
    console.log(
      `Transição de estado: [${this.#state.stateName}] → [${newState.stateName}]` +
      (newState.username ? ` (@${newState.username})` : "") +
      "\n"
    );
    this.#state = newState;
  }

  getStateName() {
    return this.#state.stateName;
  }

  // Delegação completa usando o atributo estritamente privado
  viewContent()                     { this.#state.viewContent(this); }
  createPost()                      { this.#state.createPost(this); }
  commentOnPost()                   { this.#state.commentOnPost(this); }
  likePost()                        { this.#state.likePost(this); }
  deletePost(postTitle)             { this.#state.deletePost(this, postTitle); }
  banUser(targetUser)               { this.#state.banUser(this, targetUser); }
  authenticate(credentials)         { this.#state.authenticate(this, credentials); }
  logout()                          { this.#state.logout(this); }
  promote(targetUsername)           { this.#state.promote(this, targetUsername); }
}

// ============================================================================
//  DEMONSTRAÇÃO — Simulando os fluxos (Roda exatamente igual)
// ============================================================================
function separator(title) {
  console.log("=".repeat(65));
  console.log(`  ${title}`);
  console.log("=".repeat(65));
  console.log();
}

separator("CENÁRIO 1 — Visitante tenta usar o fórum sem login");
const session1 = new UserSession();
session1.viewContent();         
session1.createPost();          

separator("CENÁRIO 2 — Membro faz login e usa o fórum");
const session2 = new UserSession();
session2.authenticate({ username: "joao", password: "123456" }); 
session2.createPost();                    
session2.deletePost("Post de outro user"); 

separator("CENÁRIO 5 — Ciclo completo: Login → Ação → Logout");
const session5 = new UserSession();
session5.authenticate({ username: "joao", password: "123456" });
session5.createPost();                              
session5.logout();                                  
session5.createPost();