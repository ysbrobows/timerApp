import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para carregar o tema do AsyncStorage
export const loadTheme = async () => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light'; // Retorna o tema salvo ou 'light' como padrão
  } catch (error) {
    console.log('Erro ao carregar o tema:', error);
    return 'light'; // Caso haja erro, retorna o tema padrão
  }
};

// Função para salvar o tema no AsyncStorage
export const saveTheme = async (newTheme: string) => {
  try {
    await AsyncStorage.setItem('theme', newTheme); // Salva o novo tema
  } catch (error) {
    console.log('Erro ao salvar o tema:', error);
  }
};
