import React from "react";
import { Text, Pressable, Platform, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { ComponentsStyle } from '../styles';

const DownloadLink = ({ file }) => {
  const handleDownload = async () => {
    if (!file || !file.uri) {
      Alert.alert("Error", "No se proporcionó ningún archivo para descargar.");
      return;
    }

    try {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        const fileUri = `${FileSystem.documentDirectory}${file.name || "download"}`;        
        const { uri } = await FileSystem.downloadAsync(file.uri, fileUri);
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert("Descarga completada", `Archivo guardado en: ${uri}`);
        }
      } else if (Platform.OS === "web") {
        const link = document.createElement("a");
        link.href = file.uri;

        window.open(file.uri, "_blank");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      Alert.alert("Error", "Hubo un problema al descargar el archivo.");
    }
  };

  return (
    file && (
      <Pressable onPress={handleDownload}>
        <Text style={ComponentsStyle.link}>Descargar Archivo</Text>
      </Pressable>
    )
  );
};

export default DownloadLink;