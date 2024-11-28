import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getSpecialties, saveDoctor } from "../../services/api";
import { MultiSelect } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";

const daysOfWeek = [
  { label: "Lunes", value: "Lunes" },
  { label: "Martes", value: "Martes" },
  { label: "Miércoles", value: "Miércoles" },
  { label: "Jueves", value: "Jueves" },
  { label: "Viernes", value: "Viernes" },
  { label: "Sábado", value: "Sábado" },
  { label: "Domingo", value: "Domingo" },
];

const DoctorsForm = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    speciality: "",
    address: "",
    attention_days: [],
    schedule: "",
    phone: "",
    additional_info: "",
  });
  const [specialities, setSpecialities] = useState([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await getSpecialties();
        setSpecialities(response);
      } catch (error) {
        console.error("Error fetching specialities:", error);
      }
    };
    fetchSpecialities();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveDoctor = async () => {
    const { name, speciality, attention_days, schedule } = formData;
    if (!name || !speciality || attention_days.length === 0 || !schedule) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      await saveDoctor({ ...formData, user_id: user.user_id });
      alert("Médico agregado con éxito.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving doctor:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Nuevo Médico" onClose={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.sectionTitle}>Datos:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={formData.surname}
          onChangeText={(value) => handleInputChange("surname", value)}
        />
        <View style={styles.inputContainer}>
          {Platform.OS === "ios" ? (
            // Estilo para iOS
            <Picker
              itemStyle={{height:50}}
              selectedValue={formData.speciality}
              onValueChange={(value) => handleInputChange("speciality", value)}
            //   style={styles.pickerIOS}
            >
              <Picker.Item label="Seleccionar especialidad*" value="" />
              {specialities.map((spec) => (
                <Picker.Item key={spec.id} label={spec.name} value={spec.id} />
              ))}
            </Picker>
          ) : (
            <Picker
              selectedValue={formData.speciality}
              onValueChange={(value) => handleInputChange("speciality", value)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar especialidad*" value="" />
              {specialities.map((spec) => (
                <Picker.Item key={spec.id} label={spec.name} value={spec.id} />
              ))}
            </Picker>
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />

        <View style={styles.inputContainer}>
          <MultiSelect
            data={daysOfWeek}
            labelField="label"
            valueField="value"
            value={formData.attention_days}
            onChange={(values) => handleInputChange("attention_days", values)}
            placeholder="Días de atención*"
            style={styles.multiSelect}
            selectedStyle={styles.selectedStyle}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Horario de atención (HH:MM - HH:MM)*"
          value={formData.schedule}
          onChangeText={(value) => handleInputChange("schedule", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={formData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Información adicional"
          value={formData.additional_info}
          onChangeText={(value) => handleInputChange("additional_info", value)}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveDoctor}>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3F72",
    marginBottom: 10,
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
  pickerIOS: {
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  picker: {
    paddingHorizontal: 15,
    height: 50,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DoctorsForm;
