import React, { useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity} from "react-native";
import { UserContext } from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import HomeCard from "../../components/HomeCard";
import { menuOptions } from "../../constants/menu";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(UserContext);

  const handlePress = (screen) => navigation.navigate(screen);
  const handleLogout = async () => await logout();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>DAMU</Text>
        <Text style={styles.subHeader}>Accesos directos</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuOptions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <HomeCard item={item} handlePress={handlePress}/>
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
    position: "absolute",
    top: 20,
    right: 20,
  }
});

export default HomeScreen;