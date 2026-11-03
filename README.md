# TaskEasy — Gerenciador de Tarefas

**Checkpoint 3 — Mobile Application Development**

**Aluna:** Vitória Valentina Maglio  
**RM:** 563509  
**Turma:** 2TDSPX

---

## 1. Sobre o projeto

O **TaskEasy** é um aplicativo mobile desenvolvido em React Native para facilitar a organização de tarefas pessoais.

A proposta é oferecer uma interface simples e intuitiva, permitindo que o usuário crie uma conta, faça login e gerencie suas atividades, podendo adicionar, visualizar, concluir e excluir tarefas.

O aplicativo utiliza o **Firebase Authentication** para autenticação dos usuários e o **Cloud Firestore** para armazenamento dos dados na nuvem.

## 2. Funcionalidades

- **Cadastro e login:** autenticação com e-mail e senha.
- **Gerenciamento de tarefas:** criação, visualização, conclusão e exclusão.
- **Atualização em tempo real:** sincronização das tarefas com o Firestore.
- **Dados individuais:** cada usuário acessa apenas suas próprias tarefas.
- **Logout:** encerramento da sessão.
- **Validações:** mensagens de erro, confirmação e campos obrigatórios.

## 3. Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|---|---|
| React Native | Desenvolvimento da interface mobile |
| Expo | Execução e testes no emulador Android |
| TypeScript | Tipagem e organização do código |
| Firebase Authentication | Cadastro, login e logout |
| Cloud Firestore | Armazenamento e gerenciamento das tarefas |

## 4. Conceitos aplicados

Durante o desenvolvimento, utilizei os seguintes conceitos:

- **Componentes:** divisão da aplicação em telas de autenticação, listagem e cadastro de tarefas.
- **useState:** gerenciamento dos estados, como valores dos formulários, tarefas e carregamento.
- **useEffect:** acompanhamento da autenticação e das atualizações do Firestore.
- **Props:** comunicação e passagem de informações entre componentes.
- **Async/Await:** execução de operações assíncronas com o Firebase.
- **Try/Catch:** tratamento de erros durante as operações.
- **Interfaces TypeScript:** definição da estrutura dos dados de uma tarefa.

### Integração com o Firestore

As operações com o banco de dados foram centralizadas no arquivo `taskService.ts`, utilizando os métodos:

| Método | Finalidade |
|---|---|
| `addDoc()` | Cadastrar tarefas |
| `onSnapshot()` | Consultar e acompanhar alterações |
| `updateDoc()` | Atualizar o status das tarefas |
| `deleteDoc()` | Excluir tarefas |

Esses métodos permitem realizar as operações de **CRUD (Create, Read, Update e Delete)**.

As tarefas são armazenadas em uma subcoleção associada ao UID do usuário autenticado, garantindo a separação dos dados. As regras de segurança do Firestore restringem o acesso ao respectivo usuário.

## 5. Estrutura do projeto

O código foi dividido em pastas para separar as responsabilidades e facilitar a manutenção.

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

- **config:** configuração do Firebase.
- **screens:** telas e interação com o usuário.
- **services:** operações de acesso ao Firestore.
- **types:** definição dos tipos de dados.
- **styles:** estilização das telas.

## 6. Fluxo e validações

O usuário inicia pela tela de autenticação. Após realizar o cadastro ou login, tem acesso às suas tarefas armazenadas no Firestore, podendo gerenciá-las e encerrar a sessão.

Foram implementadas validações para campos obrigatórios, credenciais inválidas, e-mails já cadastrados e possíveis falhas nas operações com o Firebase. A exclusão de tarefas também exige confirmação do usuário.

## 7. Execução do projeto

Com o Node.js e o ambiente Android configurados, instale as dependências:

```bash
npm install
```

Configure o Firebase no arquivo `src/config/firebase.ts` e habilite o Authentication e o Firestore no Firebase Console.

Inicie o projeto:

```bash
npx expo start
```

Com o emulador Android aberto, pressione `a` no terminal.

## 8. Conclusão

O desenvolvimento do TaskEasy permitiu aplicar na prática conceitos de React Native, TypeScript e Firebase, principalmente na construção de interfaces, autenticação de usuários e integração com banco de dados.

A proposta foi desenvolver uma aplicação simples, mas funcional, para compreender melhor o fluxo de uma aplicação mobile e a comunicação com serviços na nuvem.
