import HomeScreen from "../screens/Home/HomeScreen";
import DoctorsScreen from "../screens/Doctors/DoctorsScreen";
import MedicationsScreen from "../screens/Medications/MedicationsScreen";
import DoctorsForm from "../screens/Doctors/DoctorsForm";
import StudiesScreen from "../screens/Studies/StudiesScreen";
import AlarmsList from "../screens/Alarms/AlarmsList";
import { createStackNavigator } from "@react-navigation/stack";
import MedicationsForm from "../screens/Medications/MedicationsForm";
import StudiesForm from "../screens/Studies/StudiesForm";

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
    <Stack.Screen name="MedicationsScreen" component={MedicationsScreen} />
    <Stack.Screen name="MedicationsForm" component={MedicationsForm} />
    <Stack.Screen name="StudiesScreen" component={StudiesScreen} />
    <Stack.Screen name="StudiesForm" component={StudiesForm} />

    {/* <Stack.Screen name="Alarms" component={AlarmsList} /> */}
  </Stack.Navigator>
);
