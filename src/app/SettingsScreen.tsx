import React from 'react';
import { View, Text } from 'react-native';

type SettingsScreenProps = {
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setShowSettings }) => {
  return (
    <View>
      <Text>Configurações</Text>
    </View>
  );
};

export default SettingsScreen;
