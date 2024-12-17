import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { getUserDb, saveUserDb } from '../../services';
import { UserContext } from '../../context/UserContext';
import { AuthStyles } from '../../styles';

const VerificationScreen = ({ navigation, route }) => {
  const { email, name } = route.params;
  const [code, setCode] = useState('');
  const { signUp, setActive } = useSignUp(); // Obtener signUp desde Clerk
  const { saveUser } = useContext(UserContext);

  const handleVerifyCode = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        await saveUserDb(completeSignUp.createdUserId, name, email);
        let db_user = await getUserDb(email);
        await saveUser({
          email: db_user.email,
          name: db_user.name,
          clerk_id: db_user.clerk_id,
          user_id: db_user.id,
        });
        Alert.alert('Éxito', 'Verificación completada. Bienvenido!');
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
    <View style={AuthStyles.containerVerification}>
      <View style={AuthStyles.header}>
        <Text style={AuthStyles.logoSignUp}>DAMU</Text>
        <Text style={AuthStyles.subtitle}>Verificación</Text>
      </View>
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.title}>Ingrese el código de verificación. El mismo llegará a su correo electrónico</Text>
        <TextInput
          style={AuthStyles.inputSignUp}
          placeholder="Código de verificación"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <TouchableOpacity style={AuthStyles.buttonSignUp} onPress={handleVerifyCode}>
          <Text style={AuthStyles.buttonText}>Verificar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerificationScreen;
