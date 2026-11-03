
import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Alert, ActivityIndicator,
} from 'react-native';
import { User, signOut } from 'firebase/auth';

import { auth } from '../config/firebase';
import { Task } from '../types/Task';
import {
  listarTarefas,
  atualizarTarefa,
  excluirTarefa,
} 
from '../services/taskService';
import { styles } from '../styles/taskStyles';

interface Props {
  user: User;
  onAdicionar: () => void;
}

export default function HomeScreen({ user, onAdicionar }: Props) {
  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const cancelar = listarTarefas(
      user.uid,
      (lista: Task[]) => {
        setTarefas(lista);
        setCarregando(false);
    },
      () => {
        Alert.alert('Erro', 'Não foi possível carregar as tarefas.');
        setCarregando(false);
      }
    );

    return cancelar;
  }, [user.uid]);

  async function concluir(tarefa: Task) {
    try {
      await atualizarTarefa(user.uid, tarefa);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa.');
    }
  }

  function remover(id: string) {
    Alert.alert('Excluir tarefa', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await excluirTarefa(user.uid, id);
          } catch {
            Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
          }
        },
      },
    ]);
  }

  async function sair() {
    try {
      await signOut(auth);
    } catch {
      Alert.alert('Erro', 'Não foi possível sair.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>✓ TaskEasy</Text>
        <TouchableOpacity onPress={sair}>
          <Text style={styles.excluir}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Minhas tarefas</Text>
      <Text style={styles.subtitulo}>{user.email}</Text>

      <Text style={styles.contador}>
        {tarefas.filter(t => t.completed).length} de {tarefas.length}
        {' '}tarefas concluídas
      </Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#6C4AB6" />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.vazio}>
              Nenhuma tarefa cadastrada.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.tarefaConteudo}
                onPress={() => concluir(item)}
              >
                <Text style={styles.checkbox}>
                  {item.completed ? '☑' : '☐'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text style={[
                    styles.tarefaTitulo,
                    item.completed && styles.concluida,
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.descricao}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => remover(item.id)}>
                <Text style={styles.excluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={onAdicionar}>
        <Text style={styles.textoBotao}>+ Nova tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}
