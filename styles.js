// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#333',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#444',
  },
  timerText: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#008CBA', // Cor padrão (azul)
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonStop: {
    backgroundColor: '#FF0000', // Cor do botão STOP (vermelho)
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
