// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Função para carregar o tema do AsyncStorage
// const playSound10seg = async () => {
//     try {
//       // Se o som já estiver carregado, apenas toque-o
//       if (isSoundLoaded) {
//         await sound.current.stopAsync(); // Para o som anterior
//         await sound.current.playAsync(); // Reproduz o som novamente
//       } else {
//         // Carrega o som pela primeira vez
//         await sound.current.loadAsync(require('../../assets/10seg.mp3'));
//         setIsSoundLoaded(true); // Marca o som como carregado
//         await sound.current.playAsync(); // Toca o som
//       }
//     } catch (error) {
//       console.log('Erro ao tocar o som:', error);
//     }
//   };