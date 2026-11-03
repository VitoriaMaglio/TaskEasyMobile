
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F1FF',
    padding: 20,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    color: '#777',
    marginVertical: 8,
  },
  contador: {
    color: '#6C4AB6',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tarefaConteudo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 26,
    color: '#6C4AB6',
    marginRight: 12,
  },
  tarefaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  descricao: {
    color: '#777',
    marginTop: 5,
  },
  excluir: {
    color: '#D9534F',
    fontWeight: 'bold',
    padding: 8,
  },
  botao: {
    backgroundColor: '#6C4AB6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  voltar: {
    color: '#6C4AB6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  vazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 60,
  },
});
