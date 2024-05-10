## 💻 Routers App 

O projeto consiste em um front-end de uma aplicação de gerenciamento de clientes e roteadores. 

Foi desenvolvido com Typescript, ReactJS, NextJS. 

Para a estilização foi utilizado o TailwindCSS e a biblioteca RadixUI para os componentes, o projeto está totalmente responsivo e seguindo as boas práticas de clean code, ui, ux. 

A validação dos formulários foi realizada com zod e react-hook-form, também foi utilizado o axios para a conexão com a API e TanStack Query para armazenar os dados. Para o tema da aplicação foi utilizada a biblioteca Next Themes. 

Para os testes foi utilizado o Cypress. Foi feito um design pattern inspirado na Clean Architecture e utilizado os princípios de SOLID para a construção de componentes. 

Foi realizado o deploy do projeto na plataforma Vercel.



<br/>

## 🚀 Link do deploy do projeto (clique para entrar)

<a href="https://routers-app-eta.vercel.app/clients" target="_blank" rel="external">
<img src="public/project-image.png" height="350" width="750" alt="Imagem do Projeto">
</a>

<h2>Link: <a href="https://routers-app-eta.vercel.app/clients" target="_blank" rel="external">Projeto</a></h2>

<br/>
<br/>

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você tem uma máquina `<Windows / Linux / Mac>`
* Você instalou a versão mais recente do `NodeJS`

<br/>
<br/>

## ⚙️ Instalando

Para instalar execute no terminal:

npm:
```
npm i
```

yarn:
```
yarn install
```

pnpm:
```
pnpm i
```

<br/>

## 🚀 Rodando o projeto

Primeiramente crie um arquivo ```.env.local``` na raíz do projeto e adicione a seguinte variável de ambiente e seu respectivo valor:
<br/>
<br/>
Será a url do servidor back-end, geralmente é ```http://localhost:3333```

```
NEXT_PUBLIC_API_BASE_URL="http://localhost:3333"
```


Para rodar o projeto digite no terminal:

npm:
```
npm run dev
```
yarn:
```
yarn dev
```

pnpm:
```
pnpm run dev
```

<br/>


## 🧪 Rodando os testes

Foram realizados testes utilizando o cypress, para rodar os testes digite o seguinte comando no terminal:

npm:
```
npx cypress open
```
yarn:
```
yarn cypress open
```

pnpm:
```
pnpm cypress open
```

<br/>

Após isso irá abrir a interface do Cypress. Você irá selecionar os Testes E2E e o navegador de sua preferência. Depois é só realizar os testes na interface.

<br/>
<br/>


## 🚀 Tecnologias utilizadas

O projeto está desenvolvido utilizando as seguintes tecnologias:

- Typescript <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
- ReactJS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
- NextJS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
- TailwindCSS <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
- Cypress <img width="25px" height="25px" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg" />

