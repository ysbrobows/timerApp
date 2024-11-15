import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import App from './src/app'; // Tela principal
import SettingsScreen from './SettingsScreen'; // Tela de configurações

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={App} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
