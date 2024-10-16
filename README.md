# Weesu Mercado Livre Search App (Teste Técnico)

## Visão Geral

Este projeto é um sistema de busca de produtos no Mercado Livre, que consiste em um **frontend** e um **backend**. O frontend é desenvolvido com **React** e **TypeScript** utilizando **Vite** e apresenta uma interface para pesquisa de produtos, permitindo que o usuário busque itens como "Televisão". O **backend** é construído com **NestJS** e funciona como um **API Gateway**, redirecionando requisições para microserviços disponíveis, incluindo um microserviço específico que comunica-se com a API do Mercado Livre.

## Funcionalidades

- **Busca de Produtos**: Permite ao usuário pesquisar produtos no Mercado Livre através de uma barra de pesquisa com filtro de categoria.
- **Listagem de Categorias**: Obtém e exibe categorias do Mercado Livre na interface.
- **Página de Detalhes do Produto**: Quando um usuário clica em um produto, ele é redirecionado para uma página que exibe mais detalhes do produto selecionado.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta de construção e desenvolvimento.
- **React Query**: Gerenciamento de estado e requisições assíncronas.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **Chakra UI**: Biblioteca de componentes para React que facilita a criação de interfaces acessíveis e responsivas.
- **NestJS**: Framework para desenvolvimento de aplicações server-side escaláveis.
- **RabbitMQ**: Sistema de mensageria para comunicação entre microserviços.
- **Docker e Docker Compose**: Contêinerização da aplicação para facilitar o desenvolvimento e a implantação.
- **Swagger**: Documentação da API, disponível em: [docs](http://localhost:3000/docs).
- **Swagger JSON**: Documentação da API em formato JSON, disponível em: [docs-json](http://localhost:3000/docs-json).
- **Global API Prefix**: Prefixo global de chamadas da API (`/api/`).
- **Versioning API**: Controle de versão da API com prefixo (`/v1/`).

## Decisões de Design

- **Chakra UI**: Escolhi o Chakra UI para garantir uma interface responsiva e acessível, além de facilitar a personalização de componentes.
- **RabbitMQ**: Optei por RabbitMQ para comunicação entre microserviços devido à sua simplicidade e robustez. Inicialmente, comecei com Kafka, mas pela necessidade de obter respostas do microserviço, o modelo event-streaming do Kafka não iria funcionar de acordo com a necessidade do projeto. Por isso selecionei o RabbitMQ que atendia melhor às necessidades.
- **NestJS**: Utilizei o NestJS em vez do Express devido à sua arquitetura modular e recursos integrados que facilitam o desenvolvimento de aplicações escaláveis, incluindo principios SOLID.
- **Vite**: Preferi usar o Vite em vez do Create React App pela sua velocidade e pela capacidade de oferecer uma experiência de desenvolvimento mais rápida e eficiente.
- **Arquitetura de Microserviços**: Optei por uma arquitetura de microserviços para garantir a escalabilidade e a manutenibilidade da aplicação. Cada microserviço é responsável por uma tarefa específica, como comunicação com a API do Mercado Livre.

## Configuração

### Pré-requisitos

- Node.js (testado com a versão v22.6.0)
- Docker e Docker Compose (para contêineres)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/thainanluiz/testetecnico-weesu.git weesu
   cd weesu
   ```

2. **Suba a aplicação com Docker Compose:**

   ```bash
   docker-compose up --build
   ```

    - Isso irá construir e subir os contêineres para o frontend, backend e RabbitMQ.

    - Você pode pular o Docker Compose e executar os serviços manualmente, se preferir.

    - Para subir o frontend manualmente, execute:

       ```bash
       cd frontend
       npm install
       npm run dev
       ```

    - Para subir o backend manualmente, execute:

       ```bash
       cd backend/api-gateway
       npm install
       npm run start:dev
       ```

       ```bash
       cd backend/microservices/mercadolivre
       npm install
       npm run start:dev
       ```

3. **Acesse a aplicação:**

    - **Frontend:** [http://localhost:5173](http://localhost:5173)
    - **Backend:** [http://localhost:3000/api/v1](http://localhost:3000/api/v1)
    - **Backend Docs:** [http://localhost:3000/docs](http://localhost:3000/docs)

## Endpoints da API

### 1. **Buscar Produtos**

- **Endpoint:** `GET /api/v1/products/search`
- **Descrição:** Pesquisa produtos no Mercado Livre com base em um termo e opção de filtro por categoria.
- **Parâmetros de Consulta:**
  - `term` (obrigatório): O termo a ser pesquisado (ex: "Televisão").
  - `categoryId` (opcional): O ID da categoria para filtrar a pesquisa.
  - `orderBy` (opcional): Ordena os resultados da pesquisa.

- **Resposta:**

  ```json
  {
    "products": [
      {
        "id": "MLB4707421002",
        "title": "Tcl Classic 4k Smart Tv 65p755 Google Tv Dolby Preto",
        "price": 3064,
        "original_price": 3160.18,
        "thumbnail": "http://http2.mlstatic.com/D_636493-MLU76850002645_062024-I.jpg",
        "seller": {
          "id": 480263032,
          "nickname": "MERCADOLIVRE ELETRONICOS",
          "official_store_name": "TCL"
        },
        "available_quantity": 500,
        "condition": "new",
        "installments": {
          "quantity": 10,
          "amount": 306.4,
          "rate": 0
        },
        "free_shipping": true,
        "permalink": "https://www.mercadolivre.com.br/tcl-classic-4k-smart-tv-65p755-google-tv-dolby-preto/p/MLB36975105#wid=MLB4707421002&sid=unknown"
      }
    ]
  }
  ```

### 2. **Listar Categorias**

- **Endpoint:** `GET /api/v1/categories`
- **Descrição:** Recupera uma lista de categorias disponíveis no Mercado Livre.

- **Resposta:**

  ```json
  {
    "categories": [
      {
        "id": "MLB5672",
        "name": "Acessórios para Veículos"
      },
      {
        "id": "MLB271599",
        "name": "Agro"
      },
      {
        "id": "MLB1403",
        "name": "Alimentos e Bebidas"
      }
    ]
  }
  ```

## Testes

Os testes são executados com Jest e Vitest. Para executar os testes, em cada serviço disponível, execute:

```bash
npm run test
```

Os testes também estão disponiveis no GitHub Actions via CI/CD e são executados automaticamente a cada push e pull request.
