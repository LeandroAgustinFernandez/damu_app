import React from 'react';
import { Text, StyleSheet, Pressable, Platform, Linking, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const DownloadLink = ({ file }) => {
  const handleDownload = async () => {
    if (!file || !file.uri) {
      Alert.alert('Error', 'No se proporcionó ningún archivo para descargar.');
      return;
    }

    try {
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        const fileUri = `${FileSystem.documentDirectory}${file.name || 'download'}`;
        console.log(file.uri);
        console.log(fileUri);       
        const { uri } = await FileSystem.downloadAsync(file.uri, fileUri);
        console.log(uri);
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert('Descarga completada', `Archivo guardado en: ${uri}`);
        }
      } 
      else if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.href = file.uri;
        link.download = file.name || 'download';
        link.click();
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Error', 'Hubo un problema al descargar el archivo.');
    }
  };

  return (
    file && (
      <Pressable onPress={handleDownload}>
        <Text style={styles.link}>Descargar Archivo</Text>
      </Pressable>
    )
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    marginVertical: 8,
  },
});

export default DownloadLink;
