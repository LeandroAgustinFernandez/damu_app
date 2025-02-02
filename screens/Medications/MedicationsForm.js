import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveMedication, updateMedications } from "../../services";
import Header from "../../components/Header";
import { MultiSelect } from "react-native-element-dropdown";
import { daysOfWeek } from "../../constants/days";
import { FormStyles } from "../../styles";
import { ModalAlert } from "../../components";
import { validateField } from "../../utils/validations"

const MedicationsForm = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { medication } = route.params || {};
  const [formData, setFormData] = useState({
    name: medication?.name || "",
    dosage: medication?.dose || "",
    type: medication?.dose_type || "",
    frequency: medication?.frequency || [],
    schedule: medication?.schedule || "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveMedication = async () => {
    const { name, dosage, type, frequency, schedule } = formData;
    if (!name || !dosage || !type || !frequency || !schedule) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      if (medication) {
        await updateMedications(medication.id, formData);
      } else {
        await saveMedication({ ...formData, user_id: user.user_id });
      }
      setModalProps({
        iconName: "medication", 
        iconStatus: "check-circle",
        iconStatusColor: "#4CAF50",
        message: "El medicamento se guardo correctamente!",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving medication:", error);
      setModalProps({
        iconName: "medication", 
        iconStatus: "close-circle",
        iconStatusColor: "#ff0000",
        message: "Hubo un error al tratar de guardar el registro.",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
    }
  };

  return (
    <SafeAreaView style={FormStyles.container}>
      <Header
        title={medication ? "Editar medicación" : "Nueva medicación"}
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      <ScrollView contentContainerStyle={FormStyles.form}>
        <TextInput
          style={FormStyles.input}
          placeholder="Nombre del medicamento"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        {errors["name"] && (
          <Text style={FormStyles.error}>{errors["name"]}</Text>
        )}
        <TextInput
          style={FormStyles.input}
          placeholder="Dosis (por ejemplo, 10mg)"
          value={formData.dosage}
          onChangeText={(value) => handleInputChange("dosage", value)}
        />
        {errors["dosage"] && (
          <Text style={FormStyles.error}>{errors["dosage"]}</Text>
        )}
        <TextInput
          style={FormStyles.input}
          placeholder="Tipo (Comprimidos, Jarabe, etc.)"
          value={formData.type}
          onChangeText={(value) => handleInputChange("type", value)}
        />
        {errors["type"] && (
          <Text style={FormStyles.error}>{errors["type"]}</Text>
        )}
        <View style={FormStyles.inputContainer}>
          <MultiSelect
            data={daysOfWeek}
            labelField="label"
            valueField="value"
            value={formData.frequency}
            onChange={(values) => handleInputChange("frequency", values)}
            placeholder="Días de toma"
            style={FormStyles.multiSelect}
            selectedStyle={FormStyles.selectedStyle}
          />
        </View>
        {errors["frequency"] && (
          <Text style={FormStyles.error}>{errors["frequency"]}</Text>
        )}
        <TextInput
          style={FormStyles.input}
          placeholder="Horario de toma (HH:MM - HH:MM)*"
          value={formData.schedule}
          onChangeText={(value) => handleInputChange("schedule", value)}
        />
        {errors["schedule"] && (
          <Text style={FormStyles.error}>{errors["schedule"]}</Text>
        )}
        <TouchableOpacity
          style={FormStyles.saveButton}
          onPress={handleSaveMedication}
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

export default MedicationsForm;
