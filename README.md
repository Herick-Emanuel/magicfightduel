Magic Commander Deck Builder
Bem-vindo ao Magic Commander Deck Builder! Este projeto é uma aplicação web desenvolvida com React que permite aos usuários buscar comandantes de Magic: The Gathering, gerar decks personalizados e visualizar detalhes completos dos decks criados. Além disso, inclui funcionalidades de autenticação para registro e login de usuários.

📋 Índice
Visão Geral
Tecnologias Utilizadas
Pré-requisitos
Instalação
1. Clone o Repositório
2. Instale as Dependências
3. Configure as Variáveis de Ambiente
Execução do Projeto
1. Inicie o Backend
2. Inicie o Frontend
Configuração do ESLint
Scripts Disponíveis
Contribuição
Licença
Visão Geral
O Magic Commander Deck Builder permite que jogadores de Magic: The Gathering busquem comandantes usando a API da Scryfall, especifiquem a quantidade de terrenos desejados e gerem decks personalizados. A aplicação também inclui funcionalidades de registro e login para que os usuários possam salvar e gerenciar seus decks.

Tecnologias Utilizadas
Frontend:

React
Material-UI (MUI)
Axios
React Router DOM
Styled Components
ESLint com configuração Airbnb
Backend:

Node.js
Express.js
JWT para autenticação
Axios (para chamadas a APIs externas)
Pré-requisitos
Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

Node.js (v14 ou superior)
npm ou Yarn
Instalação
1. Clone o Repositório
Abra seu terminal e execute o seguinte comando para clonar o repositório:

git clone https://github.com/seu-usuario/magic-commander-deck-builder.git
Entre na pasta do projeto:

cd magic-commander-deck-builder
2. Instale as Dependências
Backend
Navegue até a pasta do backend e instale as dependências:

cd backend
npm install
Frontend
Em outra janela de terminal, navegue até a pasta do frontend e instale as dependências:


REACT_APP_API_URL=http://localhost:3001/
REACT_APP_API_URL: URL base para as requisições da API.
Execução do Projeto
1. Inicie o Backend
Na pasta backend, execute:

npm start
O backend será iniciado na porta especificada no arquivo .env (por padrão, http://localhost:3001).

2. Inicie o Frontend
Na pasta frontend, execute:

npm start
O frontend será iniciado na porta http://localhost:3000 e se comunicará com o backend.

Configuração do ESLint
O projeto utiliza o ESLint com a configuração Airbnb para manter a qualidade e consistência do código. Para garantir que o ESLint funcione corretamente, siga os passos abaixo:

Instale as Dependências do ESLint:

Já devem estar instaladas através do npm install na etapa de instalação.

Executar o ESLint:

Para verificar o código, execute:

npx eslint .
Para corrigir automaticamente alguns problemas, execute:

npx eslint . --fix
Scripts Disponíveis
Backend
Iniciar o servidor:

npm start
Desenvolvimento com nodemon:

npm run dev

npm start
Construir para produção:

Fork o Repositório

Crie uma Branch para sua Feature:

git checkout -b minha-nova-feature
Commit suas Mudanças:


git commit -m 'Adiciona nova feature'
Push para a Branch:


git push origin minha-nova-feature
Abra um Pull Request

Licença
Este projeto está licenciado sob a licença MIT.

