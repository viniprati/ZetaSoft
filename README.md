# ZetaSoft · LevelUp Games

Protótipo de gestão para loja de games, com identidade visual da LevelUp. Reúne cadastro de clientes, pesquisa de preferências, catálogo de jogos físicos e digitais, consoles e acessórios, estoque, bundles, promoções, pedidos, eventos e relatórios.

## Executar

Requer Node.js e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite no terminal. Para verificar o projeto:

```bash
node --test src/*.test.js
npm run build
```

## Logins de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Gerente | `gerente@zetasoft.demo` | `demo123` |
| Supervisor | `supervisor@zetasoft.demo` | `demo123` |
| Atendente | `atendente@zetasoft.demo` | `demo123` |

Os perfis demonstram menus e ações diferentes. O gerente pode acessar todas as áreas; o supervisor gerencia operação e consulta relatórios; o atendente cadastra clientes e registra vendas.

## Estado do protótipo

Os dados são armazenados no `localStorage` do navegador e a sessão da demo no `sessionStorage`. Os logins demonstrativos **não são autenticação segura**. Pedidos on-line ficam aguardando confirmação manual de pagamento. O cálculo de frete dos Correios, o pagamento on-line e a transmissão de vídeo dependem de integrações externas; eventos aceitam um link de transmissão.

Para uso em produção, serão necessários servidor, banco de dados compartilhado, autenticação real, autorização no servidor e integrações com os serviços escolhidos.
