# Mini Guia - State Demo

## Como abrir a demo

No diretorio `frontend`, rode:

```bash
npm install
npm run dev
```

Depois abra no navegador:

```text
http://localhost:3000/state-demo
```

## Ordem de gravacao sugerida

1. Mostrar o estado inicial `Visitante`
2. Tentar `Criar topico` para mostrar a negacao
3. Trocar para `Membro`
4. Executar `Criar topico` e `Comentar`
5. Trocar para `Moderador`
6. Executar `Deletar topico`
7. Trocar para `Admin`
8. Executar `Banir usuario` e `Promover usuario`
9. Mostrar a central de transicoes na lateral

## Ponto principal da explicacao

O contexto continua sendo o mesmo, mas o comportamento muda conforme o estado ativo da sessao.
