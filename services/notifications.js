import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DAYS } from "../constants/days";

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

export async function getScheduledNotifications() {
  try {
    const scheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    console.log("Notificaciones programadas:", scheduledNotifications);
  } catch (error) {
    console.log("Error al obtener las notificaciones programadas:", error);
  }
}

export async function cancelNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notificación con ID ${notificationId} cancelada.`);
  } catch (error) {
    console.log("Error al cancelar notificación:", error);
  }
}

export async function askForNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  console.log(`Permision Status ${status}`);

  if (status !== "granted") {
    alert("Se necesita permiso para enviar notificaciones");
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
  
  if (allDays) {
    try {
      const notificationResponse =
        await Notifications.scheduleNotificationAsync({
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
      console.log(
        "Notificación programada con el identificador:",
        notificationResponse
      );
      await saveNotificationId(notificationResponse)
      await getScheduledNotifications();
    } catch (error) {
      console.error("Error al programar la notificación:", error);
    }
  } else {
    for (const [day, time] of Object.entries(schedule)) {
      const dayIndex = DAYS.indexOf(day) + 1;

      if (dayIndex < 1 || dayIndex > 7) {
        continue;
      }

      if (time) {
        try {
          const notificationResponse =
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "Recordatorio de Medicación",
                body: `Es hora de tomar ${dose} ${dose_type} de ${medication}`,
              },
              trigger: {
                weekday: dayIndex,
                hour: parseInt(time.split(":")[0]),
                minute: parseInt(time.split(":")[1]),
                repeats: true,
              },
            });
          console.log(
            "Notificación programada con el identificador:",
            notificationResponse
          );
          await saveNotificationId(notificationResponse)

        } catch (error) {
          console.error(
            `Error programando la notificación para ${day}:`,
            error
          );
        }
      }
    }
    await getScheduledNotifications();
  }
}
