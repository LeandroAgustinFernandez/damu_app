import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const HomeCard = ({ item, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item.screen)}
    >
      <Ionicons name={item.icon} size={50} color="#F7931E" />
      <Text style={styles.cardTitle}>{item.title}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default HomeCard;