import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { getUserDb, saveUserDb } from '../../services/api';
import { UserContext } from '../../context/UserContext';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>DAMU</Text>
        <Text style={styles.subtitle}>Verificación</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Ingrese el código de verificación. El mismo llegará a su correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>Verificar código</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerText}>
            No has recibido el código?{' '}
            <Text style={styles.resendText}>Reenviar código</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#F57C00',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
  },
  logo: {
    fontSize: 36,
    color: '#4A369D',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#4A369D',
    fontWeight: '500',
  },
  formContainer: {
    paddingVertical: 100,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingHorizontal: 15,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#ff8000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
  },
  resendText: {
    color: '#5a3d8a',
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
