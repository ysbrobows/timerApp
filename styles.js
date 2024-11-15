import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent', // Definindo o fundo como transparente ou remova para usar o fundo padrão da tela
  },
  hidden: {
    display: 'none',
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
    fontSize: 40,
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#008CBA', // Cor padrão (azul)
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center'
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
  settingsIcon: {
    position: 'absolute', // Posicionamento absoluto para posicionar no topo direito
    top: 40, // Ajuste do padding top conforme necessário
    right: 20, // Para ficar na extrema direita
  },
  titleCfg:
  {
    fontSize: 20,
    color: '#FFFFFF',
    paddingBottom: 30
  },
  countdownText: {
    fontSize: 60,      // Define o tamanho da fonte como 20
    fontWeight: 'normal',
    color: 'white',      // Estilo para o countdown (ajuste conforme necessário)
    textAlign: 'center',  // Centraliza o texto horizontalmente
  },
  box: {
    width: '80%',  // Definindo a largura em porcentagem (pode ser ajustada conforme necessário)
    //maxWidth: 300, // Define um valor máximo para a largura (ajuste conforme necessário)
    alignSelf: 'center', // Isso garante que o box será centralizado
    //padding: 20,  // Pode adicionar um padding para ajustar o espaçamento interno
    //backgroundColor: 'lightgray',  // Apenas para visualização
    //borderRadius: 10,  // Opcional: para bordas arredondadas
  },
});

export default styles;
