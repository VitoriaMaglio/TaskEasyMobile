# TaskEasy — Gerenciador de Tarefas

**Checkpoint 3 — Mobile Application Development**

**Aluna:** Vitória Valentina Maglio  
**RM:** 563509  
**Turma:** 2TDSPX

---

## 1. Proposta e planejamento do aplicativo

O **TaskEasy** é um aplicativo mobile desenvolvido em React Native com o objetivo de facilitar a organização de tarefas pessoais.

A proposta foi criar uma aplicação simples e intuitiva, na qual o usuário possa se cadastrar, fazer login e gerenciar suas atividades diárias. O aplicativo permite adicionar tarefas, visualizar as atividades cadastradas, marcar tarefas como concluídas e excluir aquelas que não são mais necessárias.

Para o desenvolvimento, defini as seguintes funcionalidades:

- **Cadastro e login:** acesso por e-mail e senha utilizando Firebase Authentication.
- **Gerenciamento de tarefas:** cadastro, visualização, conclusão e exclusão de atividades.
- **Armazenamento na nuvem:** utilização do Cloud Firestore para salvar as tarefas.
- **Dados individuais:** cada usuário possui suas próprias tarefas, associadas ao seu identificador (UID).
- **Logout:** encerramento da sessão do usuário.
- **Validações:** tratamento de campos obrigatórios, erros de autenticação e falhas nas operações.

### Fluxo do aplicativo

O usuário inicia na tela de autenticação, onde pode criar uma conta ou fazer login. Após a autenticação, é direcionado à tela principal, que apresenta suas tarefas armazenadas no Firestore.

Nessa tela, pode adicionar novas tarefas, marcar atividades como concluídas ou excluí-las. As alterações são sincronizadas com o banco de dados, permitindo recuperar as informações em acessos posteriores.

## 2. Tecnologias utilizadas

| Tecnologia | Utilização no TaskEasy |
|---|---|
| **React Native** | Desenvolvimento das telas e componentes do aplicativo. |
| **Expo** | Configuração, execução e testes no emulador Android. |
| **TypeScript** | Definição dos tipos de dados e propriedades dos componentes. |
| **Firebase Authentication** | Cadastro, login, logout e identificação dos usuários. |
| **Cloud Firestore** | Armazenamento, consulta e atualização das tarefas na nuvem. |

## 3. Conceitos utilizados e aplicação no código

Durante o desenvolvimento, utilizei conceitos de React Native, React e integração com Firebase para implementar as funcionalidades.

### Componentes e Props

Organizei o aplicativo em três componentes principais:

- `AuthScreen.tsx`: responsável pelo cadastro e login.
- `HomeScreen.tsx`: apresenta as tarefas e permite concluí-las ou excluí-las.
- `AddTaskScreen.tsx`: contém o formulário para cadastrar tarefas.

Utilizei **Props** para passar informações entre os componentes, como os dados do usuário autenticado e as funções responsáveis pela navegação entre as telas.

### Hooks: useState e useEffect

O **useState** foi utilizado para armazenar e atualizar informações durante a execução do aplicativo, como os campos de e-mail e senha, os dados das tarefas e os estados de carregamento.

Já o **useEffect** foi utilizado para executar ações relacionadas ao ciclo de vida dos componentes, como acompanhar a autenticação do usuário e receber as tarefas armazenadas no Firestore.

### Firebase Authentication

Implementei a autenticação utilizando os seguintes métodos:

- `createUserWithEmailAndPassword()`: cria uma conta com e-mail e senha.
- `signInWithEmailAndPassword()`: realiza o login.
- `onAuthStateChanged()`: identifica alterações no estado de autenticação.
- `signOut()`: encerra a sessão.

O Firebase gera um **UID** para cada usuário, utilizado para identificar sua conta e associar suas tarefas no banco de dados.

### Cloud Firestore e CRUD

O Firestore foi utilizado como banco de dados NoSQL, armazenando as tarefas em documentos organizados por usuário.

Para realizar as operações de **CRUD (Create, Read, Update e Delete)**, utilizei:

| Método | Aplicação no projeto |
|---|---|
| `addDoc()` | Salvar uma nova tarefa. |
| `onSnapshot()` | Consultar tarefas e acompanhar alterações em tempo real. |
| `updateDoc()` | Alterar o status de conclusão de uma tarefa. |
| `deleteDoc()` | Excluir uma tarefa. |

Essas operações foram organizadas no arquivo `taskService.ts`, separando a lógica de acesso ao banco das telas do aplicativo.

### TypeScript e interfaces

Utilizei TypeScript para definir os tipos dos dados e evitar inconsistências no código.

Criei a interface `Task`, que representa uma tarefa com os atributos `id`, `title`, `description` e `completed`.

### Funções assíncronas e tratamento de erros

Utilizei **async/await** para aguardar a execução das operações com o Firebase, como autenticação e cadastro de tarefas.

Também utilizei **try/catch** para identificar falhas e apresentar mensagens ao usuário, além de validações para impedir o envio de campos obrigatórios vazios.

## 4. Organização do projeto

Separei o código em pastas de acordo com suas responsabilidades, facilitando a leitura e a manutenção.

```text
src/
├── config/
│   └── firebase.ts
├── screens/
│   ├── AuthScreen.tsx
│   ├── HomeScreen.tsx
│   └── AddTaskScreen.tsx
├── services/
│   └── taskService.ts
├── types/
│   └── Task.ts
└── styles/
    └── taskStyles.ts
```

- **config:** inicialização do Firebase.
- **screens:** telas e interações do aplicativo.
- **services:** operações com o Firestore.
- **types:** definição da estrutura dos dados.
- **styles:** estilos visuais das telas.

## 5. Execução do projeto

Para executar o TaskEasy, é necessário ter Node.js, Android Studio e um emulador Android configurado.

Instale as dependências:

```bash
npm install
```

Configure o Firebase no arquivo `src/config/firebase.ts`, habilitando a autenticação por e-mail/senha e o Cloud Firestore.

Inicie a aplicação:

```bash
npx expo start
```

Com o emulador Android aberto, pressione `a` no terminal.

## 6. Conclusão

O desenvolvimento do TaskEasy permitiu aplicar na prática conceitos de React Native, TypeScript e Firebase, principalmente na construção de interfaces, gerenciamento de estados, autenticação e operações com banco de dados.

O principal aprendizado foi compreender como integrar um aplicativo mobile aos serviços do Firebase, mantendo o código organizado e as responsabilidades separadas.

A proposta foi desenvolver uma aplicação simples, mas que reunisse os principais conceitos trabalhados na disciplina.
