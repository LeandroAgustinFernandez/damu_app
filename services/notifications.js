import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Permiso para enviar notificaciones denegado.');
      return;
    }
  } else {
    alert('Debe usar un dispositivo físico para recibir notificaciones.');
  }
}

export async function getScheduledNotifications() {
  try {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log("Notificaciones programadas:", scheduledNotifications);
  } catch (error) {
    console.log("Error al obtener las notificaciones programadas:", error);
  }
};

export async function cancelNotification(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Notificación con ID ${notificationId} cancelada.`);
  } catch (error) {
    console.log("Error al cancelar notificación:", error);
  }
};