import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveStudy, updateStudy, uploadFileToCloudinary } from "../../services";
import Header from "../../components/Header";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ModalAlert } from "../../components";
import { FormStyles } from "../../styles";
import { validateField } from "../../utils/validations"

const StudiesForm = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { study } = route.params || {};
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const [formData, setFormData] = useState({
    name: study?.name || "",
    date: study?.date ? new Date(study.date) : new Date(),
    doctor_name: study?.doctor_name || "",
    additional_info: study?.additional_info || "",
    file: study?.file_name
      ? { name: study.file_name, uri: study?.file_url }
      : "",
  });

  const [errors, setErrors] = useState({});

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.date;
    setShowDatePicker(false);
    handleInputChange("date", currentDate);
  };

  const handleInputChange = (field, value) => {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
    setFormData({ ...formData, [field]: value });
  };

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!result.canceled) {
        let selectedFile = null;
        if (result.assets && result.assets.length > 0) {
          selectedFile = result.assets[0];
        } else {
          selectedFile = result;
        }
        if (selectedFile) {
          setFormData({ ...formData, file: selectedFile });
        }
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleSaveStudy = async () => {
    try {
      let fileUrl = "";
      if (study && study?.file_name === formData.file.name) {
        fileUrl = study.file_url;
      } else {
        fileUrl = formData.file
          ? await uploadFileToCloudinary(formData.file, Platform.OS)
          : study?.file_url || "";
      }

      const studyData = {
        ...formData,
        user_id: user.user_id,
        file_name: formData.file.name.replace(/[#-]/g, ""),
        file_url: fileUrl,
      };

      if (study) {
        await updateStudy(study.id, studyData);
      } else {
        await saveStudy(studyData);
      }
      setModalProps({
        iconName: "assignment",
        iconStatus: "check-circle",
        iconStatusColor: "#4CAF50",
        message: "El estudio se guardó correctamente!",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving study:", error);
      setModalProps({
        iconName: "assignment",
        iconStatus: "close-circle",
        iconStatusColor: "#ff0000",
        message: "Hubo un error al tratar de guardar el registro.",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
      setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={FormStyles.container}>
      <Header
        title={study ? "Editar estudio" : "Nuevo estudio"}
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      <ScrollView contentContainerStyle={FormStyles.form}>
        {Platform.OS === "web" ? (
          <Text style={[FormStyles.input, FormStyles.inputSelect]}>
            <input
              type="date"
              value={formData.date.toISOString().slice(0, 10)}
              onChange={(e) =>
                handleInputChange("date", new Date(e.target.value))
              }
              style={FormStyles.inputTextWeb}
            />
          </Text>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={FormStyles.input}
            >
              <Text style={FormStyles.inputText}>
                {formData.date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChangeDate}
              />
            )}
          </>
        )}

        <TextInput
          style={FormStyles.input}
          placeholder="Nombre del estudio"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        {errors["name"] && (
          <Text style={FormStyles.error}>{errors["name"]}</Text>
        )}
        <TextInput
          style={FormStyles.input}
          placeholder="Indicado por"
          value={formData.doctor_name}
          onChangeText={(value) => handleInputChange("doctor_name", value)}
        />
        {errors["doctor_name"] && (
          <Text style={FormStyles.error}>{errors["doctor_name"]}</Text>
        )}
        <TouchableOpacity
          style={FormStyles.fileButton}
          onPress={handleFilePicker}
        >
          <Text style={FormStyles.fileButtonText}>
            {formData.file ? formData.file.name : "Seleccionar archivo"}
          </Text>
        </TouchableOpacity>
        {errors["file"] && (
          <Text style={FormStyles.error}>{errors["file"]}</Text>
        )}
        <TextInput
          style={FormStyles.input}
          placeholder="Otros datos"
          value={formData.additional_info}
          onChangeText={(value) => handleInputChange("additional_info", value)}
        />
        <TouchableOpacity
          style={FormStyles.saveButton}
          onPress={handleSaveStudy}
        >
          <Text style={FormStyles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
        <ModalAlert
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          {...modalProps}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudiesForm;
