import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  hidden: {
    display: 'none',
  },
  logo: {
    width: 200,
    height: 200, 
    marginTop: 10, 
    marginBottom: 20, 
    resizeMode: 'contain',  
    alignSelf: 'center',
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
    fontSize: 40,
    marginVertical: 20,
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#008CBA',
    padding: 20,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center'
  },
  buttonStop: {
    backgroundColor: '#FF0000',
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
  settingsIcon: {
    position: 'absolute',
    top: 40, 
    right: 20,
  },
  countdownText: {
    fontSize: 60,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  box: {
    width: '80%',
    alignSelf: 'center',
  },
});

export default styles;
