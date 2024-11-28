import React, { useContext } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Asegúrate de tener instalada @expo/vector-icons

const options = [
  { id: "1", title: "Alarmas", screen: "AlarmsList", icon: "notifications-outline" },
  { id: "2", title: "Medicación", screen: "MedicationsList", icon: "medkit-outline" },
  { id: "4", title: "Estudios", screen: "StudiesList", icon: "document-text-outline" },
  { id: "5", title: "Médicos", screen: "DoctorsScreen", icon: "person-outline" }
];

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(UserContext);

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const handleLogout = async () => {
    console.log("Entro logout")
    await logout();
    // navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DAMU</Text>
        <Text style={styles.subHeader}>Accesos directos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Options grid */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.screen)}
          >
            <Ionicons name={item.icon} size={50} color="#F7931E" />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4B358D",
    paddingVertical: 50,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 28,
    color: "#F7931E",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    color: "white",
  },
  logoutButton: {
    position: "absolute",  // Posicionamos el icono en la parte superior derecha
    top: 20,
    right: 20,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    margin: 10,
    height: 120,  // Tamaño cuadrado
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#4B358D",
  },
});

export default HomeScreen;