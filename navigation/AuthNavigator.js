// import SignInScreen from '../screens/Auth/SignInScreen';
// import SignUpScreen from '../screens/Auth/SignUpScreen';
// import VerificationScreen from '../screens/Auth/VerificationScreen';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// export const AuthNavigator = () => (
//     <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SignIn" component={SignInScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//       <Stack.Screen name="Verification" component={VerificationScreen} />
//     </Stack.Navigator>
//   );

import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "../screens/OnBoarding/OnboardingScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import VerificationScreen from "../screens/Auth/VerificationScreen";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");
      setShowOnboarding(!hasSeen);
    };
    checkOnboarding();
  }, []);

  if (showOnboarding === null) return null; // Evita parpadeos

  return (
    <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "SignIn"} screenOptions={{ headerShown: false }}>
      {showOnboarding && <Stack.Screen name="Onboarding" component={OnboardingScreen} />}
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
    </Stack.Navigator>
  );
};
