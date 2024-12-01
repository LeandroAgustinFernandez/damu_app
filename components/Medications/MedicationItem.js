import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Medication = ({ item, handlePress }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <View style={styles.cardContent}>
        <MaterialIcons name="medication" size={24} color="#ff7f00" />
        <View style={styles.medicationDetails}>
          <Text style={styles.name}>
            {item.name} {item.dose}
          </Text>
          <Text style={styles.info}>Tipo: {item.dose_type}</Text>
          <Text style={styles.info}>
            Frecuencia: {item.frequency.join(", ")}
          </Text>
          <Text style={styles.info}>Horario: {item.schedule}</Text>
        </View>
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
    medicationDetails: {
      marginLeft: 12,
    },
    name: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#ff7f00",
    },
    info: {
      fontSize: 14,
      color: "#333",
    }
  });
  
  export default Medication;