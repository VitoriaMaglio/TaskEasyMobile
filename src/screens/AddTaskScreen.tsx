
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, ActivityIndicator,
} from 'react-native';

import { criarTarefa } from '../services/taskService';
import { styles } from '../styles/taskStyles';

interface Props {
  uid: string;
  onVoltar: () => void;
}

export default function AddTaskScreen({ uid, onVoltar }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título da tarefa.');
      return;
    }

    setSalvando(true);

    try {
      await criarTarefa(uid, titulo.trim(), descricao.trim());
      Alert.alert('Sucesso', 'Tarefa cadastrada!');
      onVoltar();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Nova tarefa</Text>
        <TouchableOpacity onPress={onVoltar} disabled={salvando}>
          <Text style={styles.voltar}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Estudar React Native"
        value={titulo}
        onChangeText={setTitulo}
        maxLength={100}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Descreva sua tarefa..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
        maxLength={500}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Salvar tarefa</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
