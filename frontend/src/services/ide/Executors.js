// Interface / Classe Base
export class CodeExecutor {
  async execute(code) { throw new Error("Não implementado"); }
}

// Componente Concreto (O executor real)
export class PythonCodeExecutor extends CodeExecutor {
  async execute(code) {
    console.log("[IDE] Executando código Python nativo do aluno...");
    
    // Simulando o tempo de execução de um modelo de ML (500ms)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { output: "Modelo de ML treinado com sucesso!", error: null };
  }
}

// Decorator Base
export class ExecutorDecorator extends CodeExecutor {
  constructor(executor) {
    super();
    this.wrapper = executor; // Guarda a referência do objeto decorado
  }

  async execute(code) {
    return await this.wrapper.execute(code);
  }
}

// Decorator Concreto 1: Verificação de Segurança (Sandbox)
export class SecuritySandboxDecorator extends ExecutorDecorator {
  async execute(code) {
    console.log("[Sandbox] Verificando código em busca de ameaças...");
    
    if (code.includes("import os") || code.includes("subprocess")) {
      return { 
        output: null, 
        error: "ERRO DE SEGURANÇA: Acesso ao sistema negado pelo Sandbox." 
      };
    }
    
    // Se estiver seguro, repassa para o próximo nível
    return await super.execute(code); 
  }
}

// Decorator Concreto 2: Métricas de Performance
export class MetricsDecorator extends ExecutorDecorator {
  async execute(code) {
    console.log("[Métricas] Iniciando cronômetro...");
    const start = performance.now();
    
    // Executa a cadeia (pode ser o Sandbox ou o Executor real)
    const result = await super.execute(code);
    
    const end = performance.now();
    result.executionTimeMs = (end - start).toFixed(2);
    
    console.log(`[Métricas] Execução finalizada em ${result.executionTimeMs}ms`);
    return result;
  }
}