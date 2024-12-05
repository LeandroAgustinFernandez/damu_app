import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Study = ({ item, handlePress }) => (
  <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
    <View style={styles.cardContent}>
      <MaterialIcons name="assignment" size={24} color="#F7931E" />
      <View style={styles.studyDetails}>
        <Text style={styles.name}>
          {item.name}
        </Text>
        <Text style={styles.info}>Fecha: {item.date.toLocaleDateString()}</Text>
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
  studyDetails: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F7931E", // Naranja similar al de tus botones
  },
  info: {
    fontSize: 14,
    color: "#333",
  },
});

export default Study;
