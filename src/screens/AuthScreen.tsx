
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
        <View style={styles.iconeContainer}>
          <Text style={styles.icone}>✓</Text>
        </View>

        <Text style={styles.logo}>TaskEasy</Text>

        <Text style={styles.subtitulo}>
          Organize suas tarefas com leveza.
        </Text>

        <Text style={styles.tituloFormulario}>
          {cadastro ? 'Crie sua conta' : 'Bem-vindo de volta!'}
        </Text>

        <Text style={styles.descricao}>
          {cadastro
            ? 'Comece a organizar seu dia com a gente.'
            : 'Entre na sua conta para continuar.'}
        </Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="exemplo@email.com"
          placeholderTextColor="#AAA5B5"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#AAA5B5"
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
              {cadastro ? 'Criar minha conta' : 'Entrar na minha conta'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCadastro(!cadastro)}
        >
          <Text style={styles.alternar}>
            {cadastro
              ? 'Já tem uma conta? Entrar'
              : 'Não tem uma conta? Cadastre-se'}
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
    paddingHorizontal: 24,
    backgroundColor: '#F8F7FC',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderRadius: 26,
    elevation: 4,
    shadowColor: '#392B68',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },

  iconeContainer: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: '#EEE8FC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },

  icone: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7353C7',
  },

  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7353C7',
    textAlign: 'center',
    letterSpacing: -1,
  },

  subtitulo: {
    textAlign: 'center',
    color: '#9994A7',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 35,
  },

  tituloFormulario: {
    fontSize: 22,
    fontWeight: '800',
    color: '#29253A',
    marginBottom: 8,
  },

  descricao: {
    fontSize: 14,
    color: '#9994A7',
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#39334D',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E9E5F2',
    backgroundColor: '#FAF9FD',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    fontSize: 15,
    color: '#29253A',
  },

  botao: {
    backgroundColor: '#7353C7',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  alternar: {
    color: '#7353C7',
    textAlign: 'center',
    marginTop: 26,
    fontSize: 14,
    fontWeight: '600',
  },
});
