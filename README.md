TaskEasy — Gerenciador de Tarefas

1. Sobre o projeto

O TaskEasy é um aplicativo mobile desenvolvido em React Native com o objetivo de ajudar o usuário a organizar suas tarefas do dia a dia.

A ideia foi criar uma aplicação simples e fácil de utilizar, onde cada pessoa pode criar uma conta, fazer login e gerenciar suas próprias tarefas.

O aplicativo permite adicionar tarefas, visualizar as atividades cadastradas, marcar aquelas que já foram concluídas e excluir as que não são mais necessárias.

Para armazenar as informações, utilizei o Cloud Firestore, e para realizar o cadastro e login dos usuários, utilizei o Firebase Authentication.

2. Funcionalidades

O aplicativo possui as seguintes funcionalidades:

Cadastro: permite criar uma conta utilizando e-mail e senha.

Login: permite acessar o aplicativo com uma conta cadastrada.

Adicionar tarefa: o usuário pode cadastrar uma tarefa informando um título e uma descrição.

Visualizar tarefas: exibe as tarefas cadastradas pelo usuário.

Concluir tarefa: permite marcar uma tarefa como concluída ou pendente.

Excluir tarefa: permite remover uma tarefa cadastrada.

Logout: permite sair da conta.

Cada usuário possui suas próprias tarefas, que ficam associadas ao seu identificador no Firebase.

3. Tecnologias utilizadas

React Native

Utilizei React Native para desenvolver a interface do aplicativo. Com ele, consegui criar as telas de login, cadastro e gerenciamento de tarefas utilizando componentes como View, Text, TextInput, TouchableOpacity e FlatList.

Expo

Utilizei o Expo para facilitar a criação e execução do projeto. Ele permite iniciar a aplicação e testá-la no emulador Android durante o desenvolvimento.

TypeScript

O TypeScript foi utilizado para definir os tipos dos dados e das propriedades das funções e componentes.

Por exemplo, criei uma interface chamada Task, que define os atributos de uma tarefa, como identificador, título, descrição e situação de conclusão.

Firebase Authentication

Utilizei o Firebase Authentication para realizar o cadastro, login e logout dos usuários.

Quando uma pessoa cria uma conta, o Firebase gera um identificador único chamado UID. Esse identificador também é utilizado para relacionar as tarefas ao usuário que está autenticado.

Cloud Firestore

O Cloud Firestore é o banco de dados utilizado para armazenar as tarefas.

Escolhi esse serviço porque ele permite salvar e consultar informações na nuvem e integrar essas operações diretamente ao aplicativo.

As tarefas são organizadas em documentos dentro de uma coleção associada ao usuário.

4. Conceitos utilizados no desenvolvimento

Componentes

No React Native, os componentes são utilizados para construir a interface.

Separei o aplicativo em telas com responsabilidades diferentes:

AuthScreen: responsável pelo cadastro e login.

HomeScreen: responsável por mostrar as tarefas cadastradas.

AddTaskScreen: responsável pelo formulário de criação de tarefas.

Essa divisão ajudou a organizar o código e evitar que todas as funcionalidades ficassem em um único arquivo.

useState

O useState é um Hook do React utilizado para armazenar informações que podem mudar durante o uso do aplicativo.

Utilizei esse recurso para controlar os valores digitados nos formulários, a lista de tarefas, a tela exibida e os indicadores de carregamento.

Por exemplo, quando o usuário digita o título de uma tarefa, o useState armazena esse valor para que ele possa ser utilizado no momento de salvar.

useEffect

O useEffect permite executar determinadas ações quando um componente é carregado ou quando alguma dependência é alterada.

No TaskEasy, utilizei esse Hook para acompanhar o estado de autenticação do usuário e carregar as tarefas armazenadas no Firestore.

Props

As props são utilizadas para passar informações entre componentes.

No projeto, utilizei props para enviar os dados do usuário autenticado para a tela principal e também para controlar a mudança entre a tela de tarefas e o formulário de cadastro.

Funções assíncronas

Utilizei async e await nas operações que precisam aguardar uma resposta do Firebase, como cadastrar usuários, realizar login e salvar tarefas.

Isso permite que o aplicativo espere a conclusão da operação antes de continuar com determinadas ações.

Tratamento de erros

Utilizei try/catch para tratar possíveis erros durante as operações com o Firebase.

Por exemplo, se ocorrer um problema ao salvar uma tarefa, o aplicativo apresenta uma mensagem informando que não foi possível concluir a operação.

Também adicionei validações nos formulários para evitar o envio de informações obrigatórias em branco.

5. Integração com o Firestore

Para organizar melhor o projeto, criei o arquivo taskService.ts, responsável pelas operações com o banco de dados.

As principais funções utilizadas foram:

Função

Finalidade

addDoc()

Adicionar uma nova tarefa ao Firestore.

onSnapshot()

Consultar as tarefas e acompanhar alterações em tempo real.

updateDoc()

Atualizar a situação de uma tarefa.

deleteDoc()

Excluir uma tarefa do banco.

collection()

Referenciar uma coleção do Firestore.

doc()

Referenciar um documento específico.

Essas operações representam o conceito de CRUD, que significa criar, consultar, atualizar e excluir dados.

No aplicativo, o CRUD é utilizado para gerenciar as tarefas cadastradas.

Organização dos dados

As tarefas são armazenadas no Firestore seguindo esta estrutura:

users/
  UID_DO_USUARIO/
    tasks/
      ID_DA_TAREFA/
        title
        description
        completed
        createdAt

O campo completed indica se a tarefa está concluída ou pendente, enquanto createdAt registra o momento em que ela foi criada.

Utilizei o UID para separar os dados de cada usuário. Além disso, as regras de segurança do Firestore restringem o acesso às tarefas ao usuário autenticado correspondente.

6. Fluxo do aplicativo

O funcionamento do TaskEasy segue este fluxo:

O usuário abre o aplicativo e encontra a tela de login.

Caso não possua uma conta, pode realizar o cadastro.

Após a autenticação, o aplicativo apresenta a tela principal.

As tarefas cadastradas são carregadas do Firestore.

O usuário pode adicionar, concluir ou excluir tarefas.

As alterações são armazenadas no banco de dados.

Ao realizar logout, o aplicativo retorna à tela de login.

Para identificar se o usuário está autenticado, utilizei a função onAuthStateChanged do Firebase Authentication.

7. Organização do código

Procurei separar o projeto em arquivos menores para facilitar o entendimento e a manutenção.

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

O arquivo firebase.ts concentra a configuração dos serviços do Firebase.

A pasta screens contém as telas do aplicativo, enquanto services concentra as funções que acessam o Firestore.

Também separei os estilos visuais e a definição do tipo Task, para não deixar toda a lógica concentrada nas telas.

8. Tratamento de erros e validações

Durante o desenvolvimento, foram implementados tratamentos para algumas situações:

Tentativa de login com credenciais incorretas.

Tentativa de cadastro com um e-mail já utilizado.

Campos obrigatórios não preenchidos.

Senha com menos de seis caracteres.

Falhas de conexão ou de comunicação com o Firebase.

Erros ao cadastrar, atualizar ou excluir tarefas.

Confirmação antes de excluir uma tarefa.

Indicadores de carregamento durante determinadas operações.

Esses tratamentos foram adicionados para informar o usuário quando uma operação não puder ser realizada e evitar ações incorretas.

9. Como executar o projeto

Para executar o aplicativo, é necessário ter o Node.js, o Android Studio e um emulador Android configurado.

Primeiro, instale as dependências:

npm install

Depois, configure o Firebase no arquivo src/config/firebase.ts com os dados do seu projeto e habilite a autenticação por e-mail/senha e o Cloud Firestore.

Para iniciar o aplicativo, execute:

npx expo start

Com o emulador Android aberto, pressione a no terminal para executar o aplicativo.

10. Conclusão

Com o desenvolvimento do TaskEasy, consegui aplicar conceitos básicos de React Native, TypeScript e Firebase em um aplicativo que realiza operações de cadastro, autenticação e gerenciamento de dados com objetivo de fortalecer a base do conhecimento.

A parte mais importante do projeto foi entender como o aplicativo se comunica com o Firebase, tanto para autenticar os usuários quanto para armazenar suas tarefas.

O projeto foi desenvolvido com funcionalidades simples, mas que permitem compreender o funcionamento de uma aplicação mobile integrada a um banco de dados na nuvem.

Vitória Valentina Maglio RM563509 2TDSPX
