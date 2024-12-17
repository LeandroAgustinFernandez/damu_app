import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveMedication, updateMedications } from "../../services";
import Header from "../../components/Header";
import { MultiSelect } from "react-native-element-dropdown";
import { daysOfWeek } from "../../constants/days";
import { FormStyles } from "../../styles";

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

  const handleInputChange = (field, value) => {
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
      navigation.goBack();
    } catch (error) {
      console.error("Error saving medication:", error);
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
        <TextInput
          style={FormStyles.input}
          placeholder="Dosis (por ejemplo, 10mg)"
          value={formData.dosage}
          onChangeText={(value) => handleInputChange("dosage", value)}
        />
        <TextInput
          style={FormStyles.input}
          placeholder="Tipo (Comprimidos, Jarabe, etc.)"
          value={formData.type}
          onChangeText={(value) => handleInputChange("type", value)}
        />
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

        <TextInput
          style={FormStyles.input}
          placeholder="Horario de toma (HH:MM - HH:MM)*"
          value={formData.schedule}
          onChangeText={(value) => handleInputChange("schedule", value)}
        />

        <TouchableOpacity
          style={FormStyles.saveButton}
          onPress={handleSaveMedication}
        >
          <Text style={FormStyles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};



export default MedicationsForm;
