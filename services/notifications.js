import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import * as Calendar from "expo-calendar"; // Importar expo-calendar
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DAYS } from "../constants/days";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Permiso para enviar notificaciones denegado.");
      return;
    }
  } else {
    alert("Debe usar un dispositivo físico para recibir notificaciones.");
  }
}

// Función para solicitar permisos del calendario
async function requestCalendarPermissions() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  console.log('status');
  console.log(status);
   
  if (status !== "granted") {
    alert("Se necesita permiso para acceder al calendario.");
    return false;
  }
  // En iOS, también solicita permisos para REMINDERS
  if (Platform.OS === "ios") {
    const { status: remindersStatus } = await Calendar.requestRemindersPermissionsAsync();
    if (remindersStatus !== "granted") {
      alert("Se necesita permiso para acceder a los recordatorios.");
      return false;
    }
  }
  return true;
}

// Función para obtener el calendario predeterminado
async function getDefaultCalendar() {
  try {
    const hasPermission = await requestCalendarPermissions();
    if (!hasPermission) return null;

    const calendars = await Calendar.getCalendarsAsync();
    if (calendars.length === 0) {
      alert("No se encontraron calendarios en el dispositivo.");
      return null;
    }

    // Selecciona el primer calendario disponible
    const defaultCalendar = calendars[0];
    console.log("Calendario seleccionado:", defaultCalendar);
    return defaultCalendar;
  } catch (error) {
    console.error("Error al obtener calendarios:", error);
    return null;
  }
}

// Función para crear un evento en el calendario
async function createCalendarEvent(medication, dose, dose_type, schedule, allDays) {
  const hasPermission = await requestCalendarPermissions();
  if (!hasPermission) return;

  const calendar = await getDefaultCalendar();
  if (!calendar) {
    alert("No se encontró un calendario predeterminado.");
    return;
  }

  if (allDays) {
    const [hour, minute] = schedule.allDays.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hour, minute, 0, 0);

    await Calendar.createEventAsync(calendar.id, {
      title: `Recordatorio de Medicación: ${medication}`,
      startDate,
      endDate: new Date(startDate.getTime() + 30 * 60 * 1000), // 30 minutos después
      alarms: [{ relativeOffset: -10 }], // Alarma 10 minutos antes
    });
    console.log("Evento creado en el calendario para todos los días.");
  } else {
    for (const [day, time] of Object.entries(schedule)) {
      const dayIndex = DAYS.indexOf(day) + 1;

      if (dayIndex < 1 || dayIndex > 7 || !time) continue;

      const [hour, minute] = time.split(":").map(Number);
      const startDate = new Date();
      startDate.setHours(hour, minute, 0, 0);

      await Calendar.createEventAsync(calendar.id, {
        title: `Recordatorio de Medicación: ${medication}`,
        startDate,
        endDate: new Date(startDate.getTime() + 30 * 60 * 1000),
        alarms: [{ relativeOffset: 0 }],
        recurrenceRule: {
          frequency: Calendar.Frequency.WEEKLY,
          daysOfTheWeek: [{ dayOfWeek: dayIndex }],
        },
      });
      console.log(`Evento creado en el calendario para ${day}.`);
    }
  }
}

export async function askForNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  console.log(`Permision Status ${status}`);

  if (status !== "granted") {
    alert("Se necesita permiso para enviar notificaciones");
  }
}
export async function getScheduledNotifications() {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log("Notificaciones programadas:", scheduledNotifications);
    return scheduledNotifications;
  } catch (error) {
    console.log("Error al obtener las notificaciones programadas:", error);
    return [];
  }
}
async function saveNotificationId(id) {
  await AsyncStorage.setItem("notificationId", id);
}

async function getNotificationId() {
  return await AsyncStorage.getItem("notificationId");
}
export async function saveNotification(
  medication,
  dose,
  dose_type,
  schedule,
  allDays
) {
  // Crear evento en el calendario
  await createCalendarEvent(medication, dose, dose_type, schedule, allDays);

  // También puedes mantener la lógica de notificaciones si lo deseas
  if (allDays) {
    try {
      const [hour, minute] = schedule.allDays.split(":").map(Number);
      const notificationResponse =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Recordatorio de Medicación",
            body: `Es hora de tomar ${dose} ${dose_type} de ${medication}`,
            sound: "default",
          },
          trigger: {
            hour,
            minute,
            repeats: true,
          },
        });
      console.log(
        "Notificación programada con el identificador:",
        notificationResponse
      );
      await saveNotificationId(notificationResponse);
      await getScheduledNotifications();
    } catch (error) {
      console.error("Error al programar la notificación:", error);
    }
  } else {
    for (const [day, time] of Object.entries(schedule)) {
      const dayIndex = DAYS.indexOf(day) + 1;

      if (dayIndex < 1 || dayIndex > 7 || !time) continue;

      try {
        const [hour, minute] = time.split(":").map(Number);
        const notificationResponse =
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "Recordatorio de Medicación",
              body: `Es hora de tomar ${dose} ${dose_type} de ${medication}`,
              sound: "default",
            },
            trigger: {
              weekday: dayIndex,
              hour,
              minute,
              repeats: true,
            },
          });
        console.log(
          "Notificación programada con el identificador:",
          notificationResponse
        );
        await saveNotificationId(notificationResponse);
      } catch (error) {
        console.error(
          `Error programando la notificación para ${day}:`,
          error
        );
      }
    }
    await getScheduledNotifications();
  }
}