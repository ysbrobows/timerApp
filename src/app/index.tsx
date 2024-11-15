import React, { useState, useRef, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, Image, View } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../../styles';
import SettingsScreen from './SettingsScreen';

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

      // Verifique se o tempo de descanso chegou a 11 segundos
      if (currentTimer === 2 && remainingSeconds === 10) {
        playSound(); // Tocar o som
      }
    }, 1000);
  };

  // Função para carregar e tocar o som
  const playSound = async () => {
    try {
      // Se o som já estiver carregado, apenas toque-o
      if (isSoundLoaded) {
        await sound.current.stopAsync(); // Para o som anterior
        await sound.current.playAsync(); // Reproduz o som novamente
      } else {
        // Carrega o som pela primeira vez
        await sound.current.loadAsync(require('../../assets/10seg.mp3'));
        setIsSoundLoaded(true); // Marca o som como carregado
        await sound.current.playAsync(); // Toca o som
      }
    } catch (error) {
      console.log('Erro ao tocar o som:', error);
    }
  };

  // Função para iniciar os timers em loop
  const startTimersLoop = () => {
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
      style={styles.container}
    >
      {/* Ícone de Engrenagem no canto superior direito */}
      <Ionicons
        name="settings"
        size={30}
        color="white"
        onPress={() => setShowSettings((prev) => !prev)} // Alterna entre a tela de configurações e a tela principal
      />

      {/* Exibe o SettingsScreen quando o estado showSettings for true */}
      {showSettings ? (
        <SettingsScreen setShowSettings={setShowSettings} setTheme={setTheme} theme={theme} />
      ) : (
        <>
          {/* Logo do aplicativo */}
          <Image source={require('../../assets/timerlogo.png')} style={styles.logo} />

          {/* Inputs e botões */}
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

          <TouchableOpacity
            style={[styles.button, isRunning && styles.buttonStop]}
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>{isRunning ? 'STOP' : 'Start'}</Text>
          </TouchableOpacity>

          {countdown !== null && (
            <Text style={styles.timerText}>
              {getTimerTitle()}: {countdown} segundos
            </Text>
          )}
        </>
      )}
    </LinearGradient>
  );
}
