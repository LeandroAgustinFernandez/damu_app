import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { UserContext } from '../../context/UserContext';
import { getUserDb } from '../../services';
import { AuthStyles } from '../../styles';

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
    <View style={AuthStyles.container}>
      <Text style={AuthStyles.logo}>DAMU</Text>

      <TextInput
        style={AuthStyles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={AuthStyles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => Alert.alert('Recuperar contraseña')}>
        <Text style={AuthStyles.forgotPassword}>¿Olvidaste la contraseña? <Text style={AuthStyles.linkText}>Click acá</Text></Text>
      </TouchableOpacity>

      <TouchableOpacity style={AuthStyles.button} onPress={handleSignIn}>
        <Text style={AuthStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {/* <View style={AuthStyles.socialButtons}>
        <TouchableOpacity style={AuthStyles.socialButton}>
          <FontAwesome name="facebook" size={32} color="#4267B2" />
        </TouchableOpacity>
        <TouchableOpacity style={AuthStyles.socialButton}>
          <FontAwesome name="google" size={32} color="#DB4437" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity
        style={AuthStyles.registerButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={AuthStyles.registerText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

