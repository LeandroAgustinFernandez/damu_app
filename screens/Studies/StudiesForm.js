import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveStudy, updateStudy } from "../../services/api";
import Header from "../../components/Header";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dajilyvt7/upload";
const uploadPreset = "damu_uploads";

const StudiesForm = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { study } = route.params || {};
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    name: study?.name || "",
    date: study?.date ? new Date(study.date) : new Date(),
    doctor_name: study?.doctor_name || "",
    additional_info: study?.additional_info || "",
    file: null,
  });

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setShowDatePicker(false);
    handleInputChange("date", currentDate);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      console.log(result);
      if (Platform.OS === "web") {
        if (result && !result.canceled) setFormData({ ...formData, file: result });
      } else {
        if (!result.canceled) {
          let selectedFile = null;
          if (result.assets && result.assets.length > 0) {
            selectedFile = result.assets[0]; // iOS
          } else {
            selectedFile = result;
          }
          if (selectedFile) {
            setFormData({ ...formData, file: selectedFile });
          }
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const uploadFileToCloudinary = async (file) => {
    if (!file) return null;

    const data = new FormData();
    data.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: file.name,
    });
    data.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      return result.secure_url; // URL del archivo subido
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert("Error", "Error uploading file to Cloudinary");
      return null;
    }
  };

  const handleSaveStudy = async () => {
    try {
       console.log(formData.file);
       
      let fileUrl = formData.file
        ? await uploadFileToCloudinary(formData.file)
        : study?.file_url || "";
      console.log(fileUrl);
      const studyData = {
        ...formData,
        user_id: user.user_id,
        file_url: fileUrl,
      };

      if (study) {
        await updateStudy(study.id, studyData);
      } else {
        await saveStudy(studyData);
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error saving study:", error);
      Alert.alert("Error", "Failed to save study");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={study ? "Editar estudio" : "Nuevo estudio"}
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text style={styles.inputText}>
            {formData.date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Nombre del estudio"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Indicado por"
          value={formData.doctor_name}
          onChangeText={(value) => handleInputChange("doctor_name", value)}
        />
        <TouchableOpacity style={styles.fileButton} onPress={handleFilePicker}>
          <Text style={styles.fileButtonText}>
            {formData.file ? formData.file.name : "Seleccionar archivo"}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Otros datos"
          value={formData.additional_info}
          onChangeText={(value) => handleInputChange("additional_info", value)}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveStudy}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },
  fileButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  fileButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StudiesForm;
