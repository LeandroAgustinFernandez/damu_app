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
import { saveAlarm } from "../../services";
import { ModalAlert } from "../../components";
import Header from "../../components/Header";
import * as Notifications from "expo-notifications";
import {
  getScheduledNotifications,
  registerForPushNotificationsAsync,
} from "../../services/notifications";

const DAYS = ["Lu", "Ma", "Mi", "Jue", "Vie", "Sab", "Dom"];

const AlarmsForm = ({ navigation }) => {
  const { user } = useContext(UserContext);
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
    getScheduledNotifications();
    const scheduleNotification = async () => {
      const now = new Date();
      now.setSeconds(now.getSeconds() + 30); // 30 segundos desde ahora
      
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Prueba de Notificación",
          body: "Esto es una prueba.",
        },
        trigger: { date: now },
      });
    };

    scheduleNotification();
  },[]);

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
      return ["AllDays " + schedule.allDays]; // Si es todos los días, devolver la cadena correspondiente
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
    console.log(formData);
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

      // Guardar la alarma en la base de datos
      await saveAlarm(alarmData);

      const askForNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log(`Permision Status ${status}`);
        
        if (status !== "granted") {
          alert("Se necesita permiso para enviar notificaciones");
        }
      };

      // Llamar a esta función antes de programar las notificaciones
      askForNotificationPermissions();
      // Configurar notificaciones
      console.log(allDays);

      if (allDays) {
        console.log({
          hour: parseInt(schedule.allDays.split(":")[0]),
          minute: parseInt(schedule.allDays.split(":")[1]),
          repeats: true,
        });

        try {
          const notificationResponse = await Notifications.scheduleNotificationAsync({
            content: {
              title: "Recordatorio de Medicación",
              body: `Es hora de tomar ${dose} ${dose_type} de ${medication}`,
            },
            trigger: {
              hour: parseInt(schedule.allDays.split(":")[0]),
              minute: parseInt(schedule.allDays.split(":")[1]),
              repeats: true,
            },
          });
          console.log("Notificación programada con el identificador:", notificationResponse);
          console.log("Notificación programada para todos los días.");
          await getScheduledNotifications(); // Verificar si se ha programado correctamente
        } catch (error) {
          console.error("Error al programar la notificación:", error);
        }
      } else {
        for (const [day, time] of Object.entries(schedule)) {
          const dayIndex = DAYS.indexOf(day) + 1;

          // Verificar que dayIndex sea válido (debería ser entre 1 y 7)
          if (dayIndex < 1 || dayIndex > 7) {
            console.error(`Día inválido: ${day}`);
            continue; // Salir de la iteración si el día no es válido
          }

          console.log({
            weekday: dayIndex,
            hour: parseInt(time.split(":")[0]),
            minute: parseInt(time.split(":")[1]),
            repeats: true,
          });

          if (time) {
            try {
              const notificationResponse = await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Recordatorio de Medicación",
                  body: `Es hora de tomar ${dose} ${dose_type} de ${medication}`,
                },
                trigger: {
                  weekday: dayIndex, // Día de la semana (1 a 7)
                  hour: parseInt(time.split(":")[0]), // Hora
                  minute: parseInt(time.split(":")[1]), // Minuto
                  repeats: true, // Repetir la notificación
                },
              });          
              console.log("Notificación programada con el identificador:", notificationResponse);
              console.log(`Notificación programada para ${day} a las ${time}`);
            } catch (error) {
              console.error(
                `Error programando la notificación para ${day}:`,
                error
              );
            }
          }
        }
        await getScheduledNotifications(); // Verificar si se han programado correctamente todas las notificaciones
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
      <Header title="Nueva alarma" onClose={() => navigation.goBack()} />
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