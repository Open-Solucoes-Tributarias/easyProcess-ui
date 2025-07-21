## 🏗 Arquitetura do Projeto

Este projeto utiliza uma **estrutura modular por responsabilidade**, também conhecida como **modular pattern**, com elementos pontuais da arquitetura **feature-based**. A estrutura é pensada para garantir organização, reutilização de código e facilidade de manutenção.

### 📂 Estrutura de Pastas

/
├── vite.config.js # Arquivo de configuração do Vite
├── assets/ # Arquivos estáticos: imagens, ícones, fontes, etc.
├── components/ # Componentes reutilizáveis (ex: botões, inputs, cards)
├── layouts/ # Componentes de layout (ex: Header, Footer, Sidebar)
├── pages/ # Páginas da aplicação, organizadas por rota
│ ├── dashboard/
│ │ └── Dashboard.jsx
│ └── about/
│ └── About.jsx
├── routes/ # Arquivos de definição de rotas (React Router)
├── services/ # Módulos utilitários e chamadas de API por responsabilidade

markdown
Copiar
Editar

### 📌 Detalhes da Arquitetura

- **`assets/`**: armazena todos os arquivos estáticos usados na aplicação.
- **`components/`**: contém componentes reutilizáveis e desacoplados de contexto de página.
- **`layouts/`**: layouts globais ou específicos para rotas, como estrutura de dashboards.
- **`pages/`**: representa cada página/rota da aplicação, com subpastas nomeadas conforme o caminho.
- **`routes/`**: gerencia a configuração do React Router e as rotas disponíveis no app.
- **`services/`**: camada de abstração para chamadas HTTP e utilitários de integração com APIs.

Essa arquitetura é **flexível e escalável**, sendo adequada tanto para projetos pequenos quanto médio

// No fornt-end, temporariamente foi adicionaodo o arquivo netlify.toml que funciona como proxy reverso para requsitar a API que estã em http.