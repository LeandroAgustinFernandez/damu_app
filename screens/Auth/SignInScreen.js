import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { UserContext } from '../../context/UserContext';
import { getUserDb } from '../../services/api';
import { FontAwesome } from '@expo/vector-icons';

export default function SignInScreen({ navigation }) {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { saveUser } = useContext(UserContext);

  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      let response_signin = await signIn.create({
        identifier: email,
        password: password,
      });

      let db_user = await getUserDb(email);
      await saveUser({
        email: db_user.email,
        name: db_user.name,
        clerk_id: db_user.clerk_id,
        user_id: db_user.id,
      });
    } catch (err) {
      Alert.alert(
        'Error de autenticación',
        err.errors[0]?.message || 'Ocurrió un error'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DAMU</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => Alert.alert('Recuperar contraseña')}>
        <Text style={styles.forgotPassword}>¿Olvidaste la contraseña? <Text style={styles.linkText}>Click acá</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={32} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={32} color="#DB4437" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B358D', // Fondo azul oscuro
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F7931E', // Naranja
    textAlign: 'center',
    marginBottom: 50,
  },
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#F7931E', // Línea naranja
    marginBottom: 25,
    fontSize: 18,
    color: 'white',
  },
  forgotPassword: {
    color: 'white',
    textAlign: 'right',
    marginBottom: 30,
  },
  linkText: {
    color: '#F7931E',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6C56C1', // Botón de inicio de sesión
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    marginHorizontal: 20,
  },
  registerButton: {
    backgroundColor: '#6C56C1',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerText: {
    color: '#F7931E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
