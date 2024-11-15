import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../styles'; // Importa o arquivo de estilos

type SettingsScreenProps = {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<string>>; // Função para atualizar o tema
  theme: string; // Estado do tema atual
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setShowSettings, setTheme, theme }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Configurações</Text>

      {/* Seletor de tema */}
      <Text style={styles.label}>Selecione o Tema:</Text>
      <Picker
        selectedValue={theme}
        onValueChange={(itemValue) => setTheme(itemValue)} // Atualiza o estado de tema
        style={styles.picker} // Aplica o estilo personalizado
      >
        <Picker.Item label="Padrão" value="light" />
        <Picker.Item label="Escuro" value="dark" />
      </Picker>
    </View>
  );
};

export default SettingsScreen;
