import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Switch,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { saveAlarm, updateAlarm } from "../../services";
import { ModalAlert } from "../../components";
import Header from "../../components/Header";
import * as Notifications from "expo-notifications";
import {
  getScheduledNotifications,
  registerForPushNotificationsAsync,
} from "../../services/notifications";

const DAYS = ["Lu", "Ma", "Mi", "Jue", "Vie", "Sab", "Dom"];

const AlarmsForm = ({ navigation, route }) => {
  const { user } = useContext(UserContext);
  const alarmToEdit = route.params?.alarm || null;
  const [formData, setFormData] = useState({
    medication: "",
    dose: "",
    dose_type: "",
    schedule: {},
    selectedDays: [],
    allDays: false,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  useEffect(() => {
    if (alarmToEdit) {
      const parsedSchedule = parseSchedule(alarmToEdit.schedule);
      setFormData({
        medication: alarmToEdit.medication,
        dose: alarmToEdit.dose,
        dose_type: alarmToEdit.dose_type,
        schedule: parsedSchedule.schedule,
        selectedDays: parsedSchedule.selectedDays,
        allDays: parsedSchedule.allDays,
      });
    }
  }, [alarmToEdit]);

  const parseSchedule = (scheduleArray) => {
    if (scheduleArray.some((item) => item.startsWith("Todos los días"))) {
      const time = scheduleArray[0].split(" ").slice(-1)[0];
      return {
        schedule: { allDays: time },
        selectedDays: [],
        allDays: true,
      };
    } else {
      const schedule = {};
      const selectedDays = [];
      scheduleArray.forEach((entry) => {
        const [dayLabel, time] = entry.split(" ");
        let selectedDay = ""
        for (day of DAYS) {
          if (getDayLabel(day) === dayLabel) {
            selectedDay = day
            break
          };
        }
        if (day) {
          schedule[day] = time;
          selectedDays.push(day);
        }
      });
      return { schedule, selectedDays, allDays: false };
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleDaySelection = (day) => {
    setFormData((prevData) => {
      const isSelected = prevData.selectedDays.includes(day);
      const updatedDays = isSelected
        ? prevData.selectedDays.filter((d) => d !== day)
        : [...prevData.selectedDays, day];
      return {
        ...prevData,
        selectedDays: updatedDays,
        schedule: {
          ...prevData.schedule,
          [day]: isSelected ? undefined : prevData.schedule[day] || "",
        },
      };
    });
  };

  const handleDayScheduleChange = (day, time) => {
    setFormData((prevData) => ({
      ...prevData,
      schedule: {
        ...prevData.schedule,
        [day]: time,
      },
    }));
  };

  const convertScheduleToArray = (schedule, allDays) => {
    if (allDays) {
      return ["Todos los días " + schedule.allDays];
    }
    const scheduleArray = [];
    for (const [day, time] of Object.entries(schedule)) {
      if (time) {
        const dayLabel = getDayLabel(day);
        scheduleArray.push(`${dayLabel} ${time}`);
      }
    }
    return scheduleArray;
  };

  const getDayLabel = (day) => {
    const dayLabels = {
      Lu: "Lunes",
      Ma: "Martes",
      Mi: "Miércoles",
      Jue: "Jueves",
      Vie: "Viernes",
      Sab: "Sábado",
      Dom: "Domingo",
    };
    return dayLabels[day] || day;
  };

  const handleSaveAlarm = async () => {
    const { medication, dose, dose_type, schedule, selectedDays, allDays } =
      formData;

    if (
      !medication ||
      !dose ||
      !dose_type ||
      (selectedDays.length === 0 && !allDays)
    ) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      const scheduleArray = convertScheduleToArray(schedule, allDays);

      const alarmData = {
        medication,
        dose,
        dose_type,
        schedule: scheduleArray,
        user_id: user.user_id,
      };

      console.log(formData);
      
      if (alarmToEdit) {
        response = await updateAlarm(alarmToEdit.id, alarmData);
      } else {
        response = await saveAlarm(alarmData);
      }
      
      setModalProps({
        iconStatus: "check-circle",
        iconStatusColor: "#4CAF50",
        message: "La alarma se guardó correctamente!",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving alarm:", error);
      setModalProps({
        iconStatus: "close-circle",
        iconStatusColor: "#ff0000",
        message: "Hubo un error al tratar de guardar la alarma.",
        onClose: () => {
          setModalVisible(false);
          navigation.goBack();
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={alarmToEdit ? "Editar alarma" : "Nueva alarma"}
        onClose={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.sectionTitle}>Detalle de la alarma:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de la medicación*"
          value={formData.medication}
          onChangeText={(value) => handleInputChange("medication", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Cantidad de la dosis*"
          value={formData.dose}
          onChangeText={(value) => handleInputChange("dose", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Tipo de dosis*"
          value={formData.dose_type}
          onChangeText={(value) => handleInputChange("dose_type", value)}
        />

        <Text style={styles.sectionTitle}>Frecuencia:</Text>
        {DAYS.map((day) => (
          <View key={day} style={styles.dayRow}>
            <Switch
              value={formData.selectedDays.includes(day)}
              onValueChange={() => toggleDaySelection(day)}
            />
            <Text style={styles.dayLabel}>{day}</Text>
            <TextInput
              style={styles.timeInput}
              placeholder="Horario"
              value={formData.schedule[day] || ""}
              editable={formData.selectedDays.includes(day)}
              onChangeText={(time) => handleDayScheduleChange(day, time)}
            />
          </View>
        ))}

        <View style={styles.dayRow}>
          <Switch
            value={formData.allDays}
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                allDays: value,
                schedule: value
                  ? { allDays: prevData.schedule.allDays || "" }
                  : {},
              }))
            }
          />
          <Text style={styles.dayLabel}>Todos los días</Text>
          <TextInput
            style={styles.timeInput}
            placeholder="Horario"
            value={formData.schedule.allDays || ""}
            editable={formData.allDays}
            onChangeText={(time) =>
              setFormData((prevData) => ({
                ...prevData,
                schedule: { ...prevData.schedule, allDays: time },
              }))
            }
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAlarm}>
          <Text style={styles.saveButtonText}>Guardar</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayLabel: {
    flex: 1,
    fontSize: 16,
  },
  timeInput: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  saveButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AlarmsForm;
