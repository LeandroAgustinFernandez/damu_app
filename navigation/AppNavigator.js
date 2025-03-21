import HomeScreen from "../screens/Home/HomeScreen";
import DoctorsScreen from "../screens/Doctors/DoctorsScreen";
import MedicationsScreen from "../screens/Medications/MedicationsScreen";
import MedicationsForm from "../screens/Medications/MedicationsForm";
import DoctorsForm from "../screens/Doctors/DoctorsForm";
import StudiesScreen from "../screens/Studies/StudiesScreen";
import StudiesForm from "../screens/Studies/StudiesForm";
import AlarmsScreen from "../screens/Alarms/AlarmsScreen";
import AlarmsForm from "../screens/Alarms/AlarmsForm";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getScheduledNotifications, registerForPushNotificationsAsync } from "../services/notifications";
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createStackNavigator();

export const AppNavigator = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
    getScheduledNotifications()
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
      <Stack.Screen name="DoctorsForm" component={DoctorsForm} />
      <Stack.Screen name="MedicationsScreen" component={MedicationsScreen} />
      <Stack.Screen name="MedicationsForm" component={MedicationsForm} />
      <Stack.Screen name="StudiesScreen" component={StudiesScreen} />
      <Stack.Screen name="StudiesForm" component={StudiesForm} />
      <Stack.Screen name="AlarmsScreen" component={AlarmsScreen} />
      <Stack.Screen name="AlarmsForm" component={AlarmsForm} />
    </Stack.Navigator>
  );
};
