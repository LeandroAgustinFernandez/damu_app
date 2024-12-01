import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveMedication, updateMedications } from "../../services/api";
import Header from "../../components/Header";
import { MultiSelect } from "react-native-element-dropdown";
import { daysOfWeek } from "../../constants/days";

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
    <SafeAreaView style={styles.container}>
      <Header
        title={medication ? "Editar medicación" : "Nueva medicación"}
        onClose={() => navigation.goBack()}
        bgColor="#F7931E"
      />
      <ScrollView contentContainerStyle={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Dosis (por ejemplo, 10mg)"
          value={formData.dosage}
          onChangeText={(value) => handleInputChange("dosage", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo (Comprimidos, Jarabe, etc.)"
          value={formData.type}
          onChangeText={(value) => handleInputChange("type", value)}
        />
        <View style={styles.inputContainer}>
          <MultiSelect
            data={daysOfWeek}
            labelField="label"
            valueField="value"
            value={formData.frequency}
            onChange={(values) => handleInputChange("frequency", values)}
            placeholder="Días de toma"
            style={styles.multiSelect}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Horario de toma (HH:MM - HH:MM)*"
          value={formData.schedule}
          onChangeText={(value) => handleInputChange("schedule", value)}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveMedication}
        >
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
  scheduleContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3F72",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
    borderWidth: 0,
  },
  multiSelect: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedStyle: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
});

export default MedicationsForm;
