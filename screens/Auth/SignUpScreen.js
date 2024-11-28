import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen({ navigation }) {
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      Alert.alert("Error", "El correo electrónico no es válido");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña no es válida. Debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      let user_create = await signUp.create({
        emailAddress: email,
        password: password,
      });
      let user_email_verification =
        await signUp.prepareEmailAddressVerification();
      navigation.navigate("Verification", { email: email, name: name });
    } catch (err) {
      Alert.alert(
        "Error de registro",
        err.errors[0]?.message || "Ocurrió un error"
      );
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.logo}>DAMU</Text>
        <Text style={styles.subtitle}>Registro</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          placeholderTextColor="#777"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.footerText}>
            Ya es miembro? <Text style={styles.loginText}>Iniciar sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#F57C00",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
  },
  logo: {
    fontSize: 36,
    color: "#4A369D",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2', // Color de fondo claro
  },
  title: {
    fontSize: 28, // Aumentado ligeramente
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 15, // Esquinas redondeadas
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18, // Tamaño del texto aumentado
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Para sombra en Android
  },
  button: {
    backgroundColor: '#ff8000', // Naranja
    paddingVertical: 15,
    borderRadius: 10, // Menos redondeado
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000', // Sombra en botón
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20, // Texto del botón más grande
    fontWeight: 'bold',
  },
  loginText: {
    color: '#5a3d8a',
    fontWeight: 'bold', // "Iniciar sesión" en negrita
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
  }
});
