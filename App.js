import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound'; // Importando a biblioteca Sound
import styles from './styles'; // Importando os estilos
import { Platform } from 'react-native';


// Carregue o som que você quer tocar durante o timer
const tickSound = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Erro ao carregar o som:', error);
  }
});

export default function App() {
  const [workSeconds, setWorkSeconds] = useState(''); // Tempo de trabalho
  const [restSeconds, setRestSeconds] = useState(''); // Tempo de descanso
  const [countdown, setCountdown] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(1); // Controla qual timer está ativo
  const timerInterval = useRef(null); // Usando useRef para manter a referência do intervalo

  // Função para iniciar o timer
  const startTimer = (seconds) => {
    let remainingSeconds = seconds;
    setCountdown(remainingSeconds);

    timerInterval.current = setInterval(() => {
      remainingSeconds -= 1;
      setCountdown(remainingSeconds);
      
      // Toca o som a cada segundo
      tickSound.play();

      if (remainingSeconds <= 0) {
        clearInterval(timerInterval.current);

        if (isRunning) {
          // Alterna entre o timer de trabalho e o timer de descanso
          setCurrentTimer((prev) => (prev === 1 ? 2 : 1));
        }
      }
    }, 1000);
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
    clearInterval(timerInterval.current);
    setIsRunning(false);
    setCountdown(null);
    setCurrentTimer(1); // Reseta para o timer de trabalho
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
    return () => clearInterval(timerInterval.current);
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
      return "Tempo de Trabalho";
    } else if (currentTimer === 2) {
      return "Tempo de Descanso";
    }
    return "Tempo restante";
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}
