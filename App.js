import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './context/UserContext';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  const clerckFrontendApi = Constants.expoConfig.extra.EXPO_PUBLIC_CLERK_API_KEY;

  return (
    <ClerkProvider publishableKey={clerckFrontendApi}>
      <UserProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </UserProvider>
    </ClerkProvider>
  );
}