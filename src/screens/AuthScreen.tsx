
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cadastro, setCadastro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function autenticar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);

    try {
      if (cadastro) {
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          senha
        );
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          senha
        );
      }
    } catch (error: any) {
      const mensagens: Record<string, string> = {
        'auth/email-already-in-use': 'Este e-mail já está cadastrado.',
        'auth/invalid-email': 'Informe um e-mail válido.',
        'auth/invalid-credential': 'E-mail ou senha incorretos.',
        'auth/weak-password': 'Escolha uma senha mais forte.',
        'auth/network-request-failed': 'Verifique sua conexão com a internet.',
      };

      Alert.alert(
        'Erro',
        mensagens[error.code] || 'Não foi possível autenticar.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>✓ TaskEasy</Text>
        <Text style={styles.subtitulo}>
          Organize suas tarefas com facilidade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.botao}
          onPress={autenticar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>
              {cadastro ? 'Criar conta' : 'Entrar'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCadastro(!cadastro)}
        >
          <Text style={styles.alternar}>
            {cadastro
              ? 'Já possui uma conta? Entrar'
              : 'Não possui uma conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F4F1FF',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    elevation: 3,
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#6C4AB6',
    textAlign: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    color: '#777',
    marginTop: 8,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#6C4AB6',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  alternar: {
    color: '#6C4AB6',
    textAlign: 'center',
    marginTop: 22,
  },
});
