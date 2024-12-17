import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getSpecialties, saveDoctor, updateDoctor } from "../../services";
import { MultiSelect } from "react-native-element-dropdown";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import { daysOfWeek } from "../../constants/days";
import { ModalAlert } from "../../components";
import { FormStyles } from "../../styles";

const DoctorsForm = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const { doctor } = route.params || {};
  const [formData, setFormData] = useState({
    name: doctor?.name || "",
    surname: doctor?.surname || "",
    phone: doctor?.phone || "",
    address: doctor?.address || "",
    speciality_id: doctor?.speciality_id || "",
    attention_days: doctor?.attention_day || [],
    schedule: doctor?.schedule || "",
    additional_info: doctor?.additionale_info || "",
  });
  const [specialities, setSpecialities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

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
    const { name, speciality_id, attention_days, schedule } = formData;
    if (!name || !speciality_id || attention_days.length === 0 || !schedule) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      let response;
      if (doctor) {
        response = await updateDoctor(doctor.id, formData);
      } else {
        response = await saveDoctor({ ...formData, user_id: user.user_id });
      }
      setModalProps({
        iconStatus: "check-circle",
        iconStatusColor: "#4CAF50",
        message: "El médico se guardo correctamente!",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving doctor:", error);
      setModalProps({
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
      {doctor ? (
        <Header title="Editar Médico" onClose={() => navigation.goBack()} />
      ) : (
        <Header title="Nuevo Médico" onClose={() => navigation.goBack()} />
      )}
      <ScrollView contentContainerStyle={FormStyles.form}>
        <Text style={FormStyles.sectionTitle}>Datos:</Text>

        <TextInput
          style={FormStyles.input}
          placeholder="Nombre"
          value={formData.name}
          onChangeText={(value) => handleInputChange("name", value)}
        />
        <TextInput
          style={FormStyles.input}
          placeholder="Apellido"
          value={formData.surname}
          onChangeText={(value) => handleInputChange("surname", value)}
        />
        <View style={FormStyles.inputContainer}>
          {Platform.OS === "ios" ? (
            <Picker
              itemStyle={{ height: 50 }}
              selectedValue={formData.speciality_id}
              onValueChange={(value) =>
                handleInputChange("speciality_id", value)
              }
            >
              <Picker.Item label="Seleccionar especialidad*" value="" />
              {specialities.map((spec) => (
                <Picker.Item key={spec.id} label={spec.name} value={spec.id} />
              ))}
            </Picker>
          ) : (
            <Picker
              selectedValue={formData.speciality_id}
              onValueChange={(value) =>
                handleInputChange("speciality_id", value)
              }
              style={[FormStyles.multiSelect,{ height: 50 }]}
            >
              <Picker.Item label="Seleccionar especialidad*" value="" />
              {specialities.map((spec) => (
                <Picker.Item key={spec.id} label={spec.name} value={spec.id} />
              ))}
            </Picker>
          )}
        </View>

        <TextInput
          style={FormStyles.input}
          placeholder="Dirección"
          value={formData.address}
          onChangeText={(value) => handleInputChange("address", value)}
        />

        <View style={FormStyles.inputContainer}>
          <MultiSelect
            data={daysOfWeek}
            labelField="label"
            valueField="value"
            value={formData.attention_days}
            onChange={(values) => handleInputChange("attention_days", values)}
            placeholder="Días de atención*"
            style={FormStyles.multiSelect}
            selectedStyle={FormStyles.selectedStyle}
            renderItem={(item) => {
              const isSelected = formData.attention_days.includes(item.value);
              let bgColor = isSelected ? "#e0e0e0" : "white"
              return (
                <View style={[{backgroundColor: bgColor}, FormStyles.selectedItemStyle]}>
                  <Text>{item.label}</Text>
                </View>
              );
            }}
          />
        </View>

        <TextInput
          style={FormStyles.input}
          placeholder="Horario de atención (HH:MM - HH:MM)*"
          value={formData.schedule}
          onChangeText={(value) => handleInputChange("schedule", value)}
        />

        <TextInput
          style={FormStyles.input}
          placeholder="Teléfono"
          value={formData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        <TextInput
          style={[FormStyles.input, FormStyles.textArea]}
          placeholder="Información adicional"
          value={formData.additional_info}
          onChangeText={(value) => handleInputChange("additional_info", value)}
          multiline
        />

        <TouchableOpacity style={FormStyles.saveButton} onPress={handleSaveDoctor}>
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

export default DoctorsForm;
