import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Definindo o fundo como transparente ou remova para usar o fundo padrão da tela
  },
  logo: {
    width: 200, // Largura da logo
    height: 200, // Altura da logo
    marginTop: 10, // Distância do topo da tela
    marginBottom: 20, // Espaçamento abaixo da logo
    resizeMode: 'contain', // Ajusta a imagem dentro das dimensões  
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
    color: '#fff', // Cor do texto como branco
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
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#2E2E2E', // Fundo escuro
    borderColor: '#FFFFFF', // Cor da borda branca
    borderWidth: 1, // Definindo a largura da borda
    color: '#FFFFFF', // Cor da fonte branca
    paddingLeft: 10, // Ajuste para o texto não ficar colado à borda
  },
});

export default styles;
