import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Doctor = ({ item, handlePress }) => (
  <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
    <View style={styles.cardContent}>
      <MaterialIcons name="person" size={24} color="#ff7f00" />
      <Text style={styles.name}>
        {item.speciality}: {item.name} {item.surname}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "normal",
  },
});

export default Doctor