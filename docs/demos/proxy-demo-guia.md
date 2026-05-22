# Mini Guia - Proxy Demo

## Como abrir a demo

No diretorio `frontend`, rode:

```bash
npm install
npm run dev
```

Depois abra no navegador:

```text
http://localhost:3000/proxy-demo
```

## Ordem de gravacao sugerida

1. Mostrar o usuario inicial `Membro`
2. Clicar em `Visualizar topico`
3. Clicar novamente em `Visualizar topico` para mostrar cache
4. Clicar em `Excluir topico` como membro para mostrar negacao
5. Trocar para `Administrador`
6. Clicar em `Excluir topico`
7. Mostrar a central do proxy na lateral

## Ponto principal da explicacao

O proxy intercepta a chamada antes do servico real e adiciona duas responsabilidades: cache de leitura e controle de autorizacao.
