import HomeScreen from "../screens/Home/HomeScreen";
import DoctorsScreen from "../screens/Doctors/DoctorsScreen";
import DoctorsForm from "../screens/Doctors/DoctorsForm";
import MedicatList from "../screens/Medications/MedicationsList";
import StudiesList from "../screens/Studies/StudiesList";
import AlarmsList from "../screens/Alarms/AlarmsList";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// Stack principal de la app (post-login)
export const AppStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="DoctorsScreen" component={DoctorsScreen} />
    <Stack.Screen name="DoctorsForm" component={DoctorsForm} />
    {/* <Stack.Screen name="Medications" component={MedicatList} />
      <Stack.Screen name="Studies" component={StudiesList} />
      <Stack.Screen name="Alarms" component={AlarmsList} /> */}
  </Stack.Navigator>
);
