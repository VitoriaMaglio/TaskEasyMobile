
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
        <Text style={styles.logo}>✦ TaskEasy</Text>

        <TouchableOpacity onPress={sair}>
          <Text style={styles.excluir}>Sair →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Minhas tarefas ✨</Text>

      <Text style={styles.subtitulo}>
        Organize seu dia, uma tarefa de cada vez.
      </Text>

      <Text style={[styles.subtitulo, { marginBottom: 20 }]}>
        {user.email}
      </Text>

      <Text style={styles.contador}>
        ✓ {tarefas.filter(t => t.completed).length} de {tarefas.length}
        {' '}tarefas concluídas
      </Text>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color="#7353C7"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 70 }}>
              <Text style={{ fontSize: 42, marginBottom: 14 }}>
                📝
              </Text>
              <Text style={[styles.tarefaTitulo, { fontSize: 18 }]}>
                Tudo organizado por aqui!
              </Text>
              <Text style={styles.vazio}>
                Você ainda não possui tarefas.
                {'\n'}Que tal adicionar a primeira?
              </Text>
            </View>
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
                  <Text
                    style={[
                      styles.tarefaTitulo,
                      item.completed && styles.concluida,
                    ]}
                  >
                    {item.title}
                  </Text>

                  {!!item.description && (
                    <Text style={styles.descricao}>
                      {item.description}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => remover(item.id)}>
                <Text style={styles.excluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.botao}
        onPress={onAdicionar}
      >
        <Text style={styles.textoBotao}>
          + Adicionar nova tarefa
        </Text>
      </TouchableOpacity>
    </View>
  );
}
