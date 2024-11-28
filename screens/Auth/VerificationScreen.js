// screens/VerificationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { saveUserToDatabase } from '../../services/api';

const VerificationScreen = ({ navigation, route }) => {
  const { email, name } = route.params;
  const [code, setCode] = useState('');
  const { signUp, setActive } = useSignUp(); // Obtener signUp desde Clerk

  const handleVerifyCode = async () => {
    try {
      // Intentar verificar el código de correo electrónico
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      console.log(completeSignUp)
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        await saveUserToDatabase(completeSignUp.createdUserId, name, email)
        Alert.alert('Éxito', 'Verificación completada. Ahora puedes iniciar sesión.');
        navigation.navigate('SignIn'); // Redirigir al login
      } else {
        Alert.alert('Error', 'Algo salió mal. Intenta de nuevo.');
      }
    } catch (err) {
      Alert.alert('Error', 'Código inválido o expirado.');
      console.error('Error de verificación:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingrese el código de verificación</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de verificación"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      <Button title="Verificar código" onPress={handleVerifyCode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, marginBottom: 20, fontSize: 18 },
});

export default VerificationScreen;