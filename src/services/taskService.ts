import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/firebase';

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

const tarefasRef = (uid: string) =>
  collection(db, 'users', uid, 'tasks');

// Consultar tarefas em tempo real
export function listarTarefas(
  uid: string,
  onSuccess: (tarefas: Task[]) => void,
  onError: (error: Error) => void
) {
  return onSnapshot(
    tarefasRef(uid),
    (snapshot) => {
      const tarefas: Task[] = snapshot.docs.map((item) => ({
        id: item.id,
        title: item.data().title,
        description: item.data().description,
        completed: item.data().completed,
      }));

      onSuccess(tarefas);
    },
    onError
  );
}

// Criar tarefa
export async function criarTarefa(
  uid: string,
  title: string,
  description: string
) {
  await addDoc(tarefasRef(uid), {
    title,
    description,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

// Atualizar tarefa
export async function atualizarTarefa(
  uid: string,
  tarefa: Task
) {
  const referencia = doc(
    db, 'users', uid, 'tasks', tarefa.id
  );

  await updateDoc(referencia, {
    completed: !tarefa.completed,
  });
}

// Excluir tarefa
export async function excluirTarefa(
  uid: string,
  id: string
) {
  await deleteDoc(doc(db, 'users', uid, 'tasks', id));
}
