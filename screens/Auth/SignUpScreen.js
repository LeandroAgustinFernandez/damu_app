import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { AuthStyles } from '../../styles';

export default function SignUpScreen({ navigation }) {
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /\d/.test(password) &&
      /[a-zA-Z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password) &&
      !/\s/.test(password)
    );
  };

  const handleSignUp = async () => {
    if (!isLoaded) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'El correo electrónico no es válido');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        'Error',
        'La contraseña no es válida. Debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.'
      );
      return;
    }

    try {
      let user_create = await signUp.create({
        emailAddress: email,
        password: password,
      });
      let user_email_verification = await signUp.prepareEmailAddressVerification();
      navigation.navigate('Verification', { email: email, name: name });
    } catch (err) {
      Alert.alert(
        'Error de registro',
        err.errors[0]?.message || 'Ocurrió un error'
      );
    }
  };

  return (
    <View>
      <View style={AuthStyles.header}>
        <Text style={AuthStyles.logoSignUp}>DAMU</Text>
        <Text style={AuthStyles.subtitle}>Registro</Text>
      </View>
      <View style={AuthStyles.containerSignUp}>
        <TextInput
          style={AuthStyles.inputSignUp}
          placeholder="Nombre"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={AuthStyles.inputSignUp}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={AuthStyles.inputSignUp}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={AuthStyles.inputSignUp}
          placeholder="Repetir contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={AuthStyles.buttonSignUp} onPress={handleSignUp}>
          <Text style={AuthStyles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={AuthStyles.footerText}>
            Ya es miembro?{' '}
            <Text style={AuthStyles.loginText}>Iniciar sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}