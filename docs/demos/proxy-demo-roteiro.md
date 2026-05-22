# Roteiro de Apresentacao - Proxy Demo

“Essa e a demonstracao do padrao Proxy no contexto do forum ConhecendoIA. Aqui, o proxy atua como intermediario entre o usuario e o servico real que acessa os topicos no banco.”

“Primeiro, eu visualizo o topico como membro. Na primeira vez, o proxy consulta o banco normalmente. Se eu repetir a leitura, ele responde direto da memoria cache, sem precisar acessar o servico real novamente.”

“Agora eu tento excluir esse topico como membro. O proxy intercepta a requisicao e bloqueia a operacao, porque esse usuario nao possui permissao administrativa.”

“Quando eu troco para administrador e repito a exclusao, o proxy autoriza a acao, encaminha a operacao para o servico real e ainda invalida o cache para impedir leitura de um topico ja removido.”

“A principal vantagem do Proxy aqui e concentrar performance e seguranca antes do acesso ao servico real, deixando o sistema mais eficiente e protegido.”
