import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../stylesSettingsScreen';
import { loadTheme, saveTheme, loadVoiceAssistant, saveVoiceAssistant } from './storageUtils';

type SettingsScreenProps = {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar o tema
  theme: string; // Estado do tema atual
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setShowSettings, setTheme, theme }) => {
  const [voiceAssistant, setVoiceAssistant] = useState<string>('off'); // Estado para assistente de voz

  // Carregar o tema e a configuração do assistente de voz quando o componente for montado
  useEffect(() => {
    const fetchSettings = async () => {
      const storedTheme = await loadTheme();
      if (storedTheme) {
        setTheme(storedTheme); // Atualiza o estado do tema
      }

      const storedVoiceSetting = await loadVoiceAssistant();
      if (storedVoiceSetting) {
        setVoiceAssistant(storedVoiceSetting); // Atualiza a configuração do assistente de voz
      }
    };

    fetchSettings();
  }, [setTheme]);

  // Função para lidar com a mudança no tema
  const handleThemeChange = (itemValue: string) => {
    setTheme(itemValue); // Atualiza o estado do tema
    saveTheme(itemValue); // Salva o tema no AsyncStorage
  };

  // Função para lidar com a mudança na configuração do assistente de voz
  const handleVoiceAssistantChange = (itemValue: string) => {
    setVoiceAssistant(itemValue); // Atualiza o estado do assistente de voz
    saveVoiceAssistant(itemValue); // Salva a configuração do assistente de voz
  };

  return (
    <View style={styles.containerSettings}>
      <Text style={styles.titleSettings}>Configurações</Text>

      {/* Seletor de tema */}
      <Text style={styles.labelSettings}>Selecione o Tema:</Text>
      <Picker
        selectedValue={theme}
        onValueChange={handleThemeChange} // Chama a função handleThemeChange
        style={styles.pickerSettings} // Aplica o estilo personalizado
      >
        <Picker.Item style={styles.pickerItemSettings}  label="Padrão" value="light" />
        <Picker.Item style={styles.pickerItemSettings}  label="Escuro" value="dark" />
      </Picker>

      {/* Seletor de Assistente de Voz */}
      <Text style={styles.labelSettings}>Assistente de Voz:</Text>
      <Picker
        selectedValue={voiceAssistant}
        onValueChange={handleVoiceAssistantChange} // Chama a função handleVoiceAssistantChange
        style={styles.pickerSettings}
      >
        <Picker.Item style={styles.pickerItemSettings} label="10 Segundos" value="10seg" />
        <Picker.Item style={styles.pickerItemSettings}  label="5 Segundos" value="5seg" />
        <Picker.Item style={styles.pickerItemSettings} label="Desligado" value="off" />
      </Picker>
    </View>
  );
};

export default SettingsScreen;
