
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F7FC',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },

  logo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#7353C7',
    letterSpacing: -0.8,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#242038',
    letterSpacing: -0.8,
  },

  subtitulo: {
    color: '#9691A6',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 24,
  },

  contador: {
    color: '#7353C7',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#EEE8FC',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EDF7',
    elevation: 2,
    shadowColor: '#392B68',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  tarefaConteudo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    fontSize: 28,
    color: '#7353C7',
    marginRight: 14,
  },

  tarefaTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#29253A',
    marginBottom: 4,
  },

  concluida: {
    textDecorationLine: 'line-through',
    color: '#AAA5B5',
  },

  descricao: {
    color: '#9994A7',
    fontSize: 13,
    lineHeight: 19,
  },

  excluir: {
    color: '#E36D7D',
    fontWeight: '700',
    fontSize: 13,
    padding: 10,
  },

  botao: {
    backgroundColor: '#7353C7',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    elevation: 3,
    shadowColor: '#7353C7',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.2,
  },

  voltar: {
    color: '#7353C7',
    fontWeight: '700',
    fontSize: 15,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9E5F2',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
    marginBottom: 24,
    fontSize: 15,
    color: '#29253A',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#39334D',
  },

  vazio: {
    textAlign: 'center',
    color: '#9994A7',
    marginTop: 80,
    fontSize: 15,
    lineHeight: 24,
  },
});
