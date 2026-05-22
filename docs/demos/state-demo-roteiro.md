# Roteiro de Apresentacao - State Demo

“Essa e a demonstracao do padrao State no contexto do forum ConhecendoIA. Aqui, a mesma sessao muda de comportamento conforme o estado atual do usuario.”

“No estado de visitante, o usuario consegue apenas visualizar o conteudo publico, mas nao pode criar topicos, comentar ou curtir. Quando eu troco para membro, a sessao passa a permitir interacoes autenticadas, como criar posts e comentar.”

“Se eu mudar para moderador, novas acoes ficam disponiveis, como deletar topicos em moderacao. Ja no estado de admin, a sessao passa a ter acesso total, inclusive para banir e promover usuarios.”

“A principal vantagem do State e que o comportamento fica isolado em cada estado concreto. Assim, o contexto nao precisa depender de varios ifs espalhados pelo sistema, e as transicoes ficam claras, seguras e faceis de manter.”
