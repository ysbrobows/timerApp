import React, { useState, useRef, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, Image, View, Alert  } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles';
import SettingsScreen from './SettingsScreen';
import { loadTheme, saveTheme, loadTimers, saveTimers, loadVoiceAssistant, saveVoiceAssistant } from './storageUtils';

export default function App() {
  const [workSeconds, setWorkSeconds] = useState('');
  const [restSeconds, setRestSeconds] = useState('');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1);
  const [showSettings, setShowSettings] = useState(false); // Estado para controlar a exibição de SettingsScreen
  const [theme, setTheme] = useState('light'); // Estado para controlar o tema
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const sound = useRef(new Audio.Sound());
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);
  const [voiceAssistantState, setVoiceAssistantState] = useState(null);
   
  useEffect(() => {
    loadTheme().then((loadedTheme) => {
      setTheme(loadedTheme || 'light'); // Defina o tema carregado ou 'light' por padrão
    }).catch((error) => {
      console.error('Erro ao carregar tema:', error);
    });

    // Carrega o estado do Voice Assistant
    loadVoiceAssistant().then((voiceAssistantState) => {
      // Use o estado carregado do assistente de voz aqui
      setVoiceAssistantState(voiceAssistantState);
      console.log(voiceAssistantState); // Ou qualquer ação que deseje realizar com o estado carregado
    }).catch((error) => {
      console.error("Erro ao carregar o assistente de voz:", error);
    });
      
    loadTimers().then((timers) => {
      setWorkSeconds(timers.workSeconds);        
      setRestSeconds(timers.restSeconds);
    }).catch((error) => {
      console.error("Erro ao carregar os timers:", error);
    });
  }, []);
  
    // Função para alterar o tema e salvar a preferência
    const handleChangeTheme = (newTheme: string) => {
      setTheme(newTheme);
      saveTheme(newTheme); // Salva o novo tema
    };

  // Função para iniciar o timer
  const startTimer = (seconds: number) => {
    let remainingSeconds = seconds;
    setCountdown(remainingSeconds);

    timerInterval.current = setInterval(() => {
      remainingSeconds -= 1;
      setCountdown(remainingSeconds);

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval.current as NodeJS.Timeout);

        if (isRunning) {          
          // Alterna entre o timer de trabalho e o timer de descanso
          setCurrentTimer((prev) => (prev === 1 ? 2 : 1));
        }
      }
      console.log(remainingSeconds);
      console.log("esse: "+voiceAssistantState)
      if (currentTimer === 1 && remainingSeconds == 0 && voiceAssistantState != 'off'){
        console.log("playRestSound");
        playRestSound();
      }
      // Verifique se o tempo de descanso chegou a 11 segundos
      if (currentTimer === 2 && remainingSeconds === 11 && voiceAssistantState == '10seg') {
        playSound10seg(); // Tocar o som
      }
      else if (currentTimer === 2 && remainingSeconds === 6 && voiceAssistantState == '5seg') {
        playSound5seg(); // Tocar o som
      }
    }, 1000);
  };

  // Função para carregar e tocar o som
  const playSound10seg = async () => {
    try {
        await sound.current.unloadAsync();
        await sound.current.loadAsync(require('../../assets/10seg.mp3'));
        setIsSoundLoaded(true); // Marca o som como carregado
        await sound.current.playAsync(); // Toca o som      
    } catch (error) {
      console.log('Erro ao tocar o som:', error);
    }
  };

  const playSound5seg = async () => {
    try {
        await sound.current.unloadAsync();
        await sound.current.loadAsync(require('../../assets/5seg.mp3'));
        setIsSoundLoaded(true); // Marca o som como carregado
        await sound.current.playAsync(); // Toca o som      
    } catch (error) {
      console.log('Erro ao tocar o som:', error);
    }
  };

  const playRestSound = async () => {
    try {
        await sound.current.unloadAsync(); 
        await sound.current.loadAsync(require('../../assets/descanso.mp3'));
        setIsSoundLoaded(true); 
        await sound.current.playAsync();     
    } catch (error) {
      console.log('Erro ao tocar o som de descanso:', error);
    }
  };

  // Função para iniciar os timers em loop
  const startTimersLoop = () => {
    if (!workSeconds || !restSeconds) {
      Alert.alert('Erro', 'Por favor, preencha os tempos de Trabalho e Descanso.');
      return; // Impede a execução se algum campo estiver vazio
    }
    saveTimers(workSeconds, restSeconds)
    setIsRunning(true);
    // Começa o primeiro timer (Trabalho)
    if (workSeconds && !restSeconds) {
      startTimer(Number(workSeconds));
    } else {
      startTimer(Number(workSeconds));
    }
  };

  // Função para parar os timers
  const stopTimers = () => {
    clearInterval(timerInterval.current as NodeJS.Timeout);
    setIsRunning(false);
    setCountdown(null);
    setCurrentTimer(1); // Reseta para o timer de trabalho
    if (isSoundLoaded) {
      sound.current.stopAsync(); // Para o som quando o timer for parado
    }
  };

  // UseEffect para controlar o ciclo entre os timers
  useEffect(() => {
    if (isRunning) {
      if (currentTimer === 1 && workSeconds) {
        startTimer(Number(workSeconds)); // Timer de trabalho
      } else if (currentTimer === 2 && restSeconds) {
        startTimer(Number(restSeconds)); // Timer de descanso
      }
    }
    // Cleanup
    return () => clearInterval(timerInterval.current as NodeJS.Timeout);
  }, [currentTimer, isRunning, workSeconds, restSeconds]);

  // Função para alternar o estado do botão (Start/Stop)
  const handleStartStop = () => {
    loadVoiceAssistant().then((voiceAssistantState) => {
      // Use o estado carregado do assistente de voz aqui
      console.log(voiceAssistantState);
      setVoiceAssistantState(voiceAssistantState);
      saveVoiceAssistant(voiceAssistantState);
      console.log(voiceAssistantState); // Ou qualquer ação que deseje realizar com o estado carregado
    }).catch((error) => {
      console.error("Erro ao carregar o assistente de voz:", error);
    });
    if (isRunning) {
      stopTimers();
    } else {
      startTimersLoop();
    }
  };

  // Função para determinar o título baseado no timer ativo
  const getTimerTitle = () => {
    if (currentTimer === 1) {
      return 'Tempo de Trabalho';
    } else if (currentTimer === 2) {
      return 'Tempo de Descanso';
    }
    return 'Tempo restante';
  };

  return (
    <LinearGradient
      colors={theme === 'light' ? ['#19f1b2', '#085d7f'] : ['#2E2E2E', '#2E2E2E']}
      style={[styles.container, { paddingTop: 40 }]} // Aumentando o padding do topo
    >
      {/* Ícone de Engrenagem no canto superior direito */}
      <Ionicons
        name="settings"
        size={30}
        color="white"
        onPress={() => setShowSettings((prev) => !prev)} // Alterna entre a tela de configurações e a tela principal
        style={[styles.settingsIcon, { zIndex: 1 }]} // Adicionando uma classe de estilo para personalizar o ícone
      />

      {/* Exibe o SettingsScreen quando o estado showSettings for true */}
      {showSettings ? (
        <SettingsScreen setShowSettings={setShowSettings} setTheme={handleChangeTheme} theme={theme} />
      ) : (
        <>
          {/* Logo do aplicativo */}
          <Image source={require('../../assets/timerlogo.png')} style={styles.logo} />

          {/* Contêiner para os Inputs e Labels */}
          <View style={isRunning ? styles.hidden : styles.box}>
              <Text style={styles.label}>Trabalho (segundos):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={workSeconds}
                onChangeText={setWorkSeconds}
                placeholder="Segundos"
                editable={!isRunning}
              />

              <Text style={styles.label}>Descanso (segundos):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={restSeconds}
                onChangeText={setRestSeconds}
                placeholder="Segundos"
                editable={!isRunning}
              />
          </View>

          <TouchableOpacity
            style={[styles.button, isRunning && styles.buttonStop]}
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>{isRunning ? 'STOP' : 'Start'}</Text>
          </TouchableOpacity>

          {countdown !== null && (
            <View>
              <Text style={styles.timerText}>
                {getTimerTitle()}
              </Text>
              <Text style={styles.countdownText}>
                {countdown}
              </Text>
            </View>
          )}
        </>
      )}
    </LinearGradient>
  );
}