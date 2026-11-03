
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';

import { auth } from './src/config/firebase';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTaskScreen from './src/screens/AddTaskScreen';

export default function App() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [tela, setTela] = useState<'home' | 'adicionar'>('home');

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setTela('home');
      setCarregando(false);
    });

    return cancelar;
  }, []);

  if (carregando) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#6C4AB6" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />

      {!usuario ? (
        <AuthScreen />
      ) : tela === 'adicionar' ? (
        <AddTaskScreen
          uid={usuario.uid}
          onVoltar={() => setTela('home')}
        />
      ) : (
        <HomeScreen
          user={usuario}
          onAdicionar={() => setTela('adicionar')}
        />
      )}
    </>
  );
}
