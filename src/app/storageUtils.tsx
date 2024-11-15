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

// Função para carregar os tempos do AsyncStorage (workSeconds e restSeconds)
export const loadTimers = async () => {
  try {
    const savedWorkSeconds = await AsyncStorage.getItem('workSeconds');
    const savedRestSeconds = await AsyncStorage.getItem('restSeconds');
    
    // Retorna os tempos ou valores padrão
    return {
      workSeconds: savedWorkSeconds ? savedWorkSeconds : '0', 
      restSeconds: savedRestSeconds ? savedRestSeconds : '0'   
    };
  } catch (error) {
    console.log('Erro ao carregar os tempos do AsyncStorage:', error);
    return {
      workSeconds: '0', 
      restSeconds: '0'   
    };
  }
};

// Função para salvar os tempos no AsyncStorage
export const saveTimers = async (workSeconds: string, restSeconds: string) => {
  try {
    await AsyncStorage.setItem('workSeconds', workSeconds);
    await AsyncStorage.setItem('restSeconds', restSeconds);
  } catch (error) {
    console.log('Erro ao salvar os tempos no AsyncStorage:', error);
  }
};

// Função para salvar a configuração do assistente de voz
export const saveVoiceAssistant = async (voiceSetting: string) => {
  try {
    await AsyncStorage.setItem('voiceAssistant', voiceSetting); // Salva a configuração do assistente de voz
  } catch (error) {
    console.log('Erro ao salvar a configuração do assistente de voz:', error);
  }
};

// Função para carregar a configuração do assistente de voz
export const loadVoiceAssistant = async (): Promise<string | null> => {
  try {
    const savedVoiceSetting = await AsyncStorage.getItem('voiceAssistant');
    return savedVoiceSetting;
  } catch (error) {
    console.log('Erro ao carregar a configuração do assistente de voz:', error);
    return null;
  }
};