import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnboardingScreen = ({ navigation }) => {
  const handleFinish = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    navigation.replace("SignIn");
  };

  return (
    <Swiper
      loop={false}
      showsPagination={true}
      dot={<View className={styles.dot} />}
      activeDot={<View className={styles.activeDot} />}
    >
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/publicity1.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Tu historia medica al alcance de tu mano
        </Text>
        <Text style={styles.description}>
          Encontrá una manera sencilla de llevar y compartir tu historia.
        </Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/publicity2.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Lleva el registro de tu salud</Text>
        <Text style={styles.description}>
          Descubrí la facilidad de llevar tu salud a otro nivel con Damu.
        </Text>
      </View>
      <View style={styles.slide}>
        <Image
          source={require("../../assets/images/publicity3.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Tu salud, tu manera. Empecemos!</Text>
        <Text style={styles.description}>
          Registrate, carga tus datos y descubrí una nueva forma de llevar tu
          salud a otro nivel.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFinish}>
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: Dimensions.get("window").width * 0.8,
    height: 300,
    resizeMode: "contain",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 40,
    color: "#5d5d5d",
    textAlign: "center",
  },
  description: {
    color: "#5d5d5d",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#FF6F00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  dot: {
    width: 32,
    height: 4,
    marginVertical: 1,
    backgroundColor: "#E2E8F0",
  },
  activeDot: {
    width: 32,
    height: 4,
    marginVertical: 1,
    backgroundColor: "#3d358a",
  },
});

export default OnboardingScreen;
