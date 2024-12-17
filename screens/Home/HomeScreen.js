import React, { useContext } from "react";
import { SafeAreaView, FlatList, View, Text, TouchableOpacity} from "react-native";
import { UserContext } from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import HomeCard from "../../components/HomeCard";
import { menuOptions } from "../../constants/menu";
import { ScreenStyles } from "../../styles";

const HomeScreen = ({ navigation }) => {
  const { logout } = useContext(UserContext);

  const handlePress = (screen) => navigation.navigate(screen);
  const handleLogout = async () => await logout();
  
  return (
    <SafeAreaView style={ScreenStyles.container}>
      <View style={ScreenStyles.header}>
        <Text style={ScreenStyles.headerText}>DAMU</Text>
        <Text style={ScreenStyles.subHeader}>Accesos directos</Text>
        <TouchableOpacity onPress={handleLogout} style={ScreenStyles.logoutButton}>
          <Ionicons name="log-out-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={menuOptions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={ScreenStyles.list}
        renderItem={({ item }) => (
          <HomeCard item={item} handlePress={handlePress}/>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;