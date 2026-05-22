
class ServicoTopicoDatabase {
    visualizarTopico(id) {
        console.log(`[Banco de Dados] Executando SELECT * FROM topicos WHERE id = ${id}...`);
        return `Conteúdo detalhado do Tópico ${id} (Ex: O que é Deep Learning?)`;
    }

    excluirTopico(id) {
        console.log(`[Banco de Dados] Executando DELETE FROM topicos WHERE id = ${id}. Tópico apagado!`);
    }
}


class ProxyServicoTopico {
    constructor(usuarioLogado) {
        this.servicoReal = new ServicoTopicoDatabase();
        this.usuarioLogado = usuarioLogado;
        this.cacheTopicos = {}; 
    }

    
    visualizarTopico(id) {
        
        if (this.cacheTopicos[id]) {
            console.log(`[Proxy - Performance] Retornando Tópico ${id} direto da MEMÓRIA CACHE (Rápido).`);
            return this.cacheTopicos[id];
        }

        
        const conteudo = this.servicoReal.visualizarTopico(id);
        this.cacheTopicos[id] = conteudo;
        return conteudo;
    }


    excluirTopico(id) {
        
        if (this.usuarioLogado.tipo === 'Administrador') {
            console.log(`[Proxy - Segurança] Autorização concedida para Admin ${this.usuarioLogado.nome}.`);
            
            this.servicoReal.excluirTopico(id);
            delete this.cacheTopicos[id]; // Limpa o cache para não exibir um tópico deletado
            
        } else {
            console.log(`[Proxy - Segurança] ACESSO NEGADO! O usuário ${this.usuarioLogado.nome} não tem privilégios para excluir tópicos.`);
        }
    }
}

// Backend 


const admin = { nome: 'Guilherme', tipo: 'Administrador' };
const membro = { nome: 'João', tipo: 'Membro' };

console.log("--- CENÁRIO 1: O Membro tentando acessar e deletar ---");
const proxyMembro = new ProxyServicoTopico(membro);

console.log(proxyMembro.visualizarTopico("101")); 
console.log(proxyMembro.visualizarTopico("101")); 

proxyMembro.excluirTopico("101"); 

console.log("\n--- CENÁRIO 2: O Administrador assumindo o controle ---");
const proxyAdmin = new ProxyServicoTopico(admin);

proxyAdmin.excluirTopico("101");