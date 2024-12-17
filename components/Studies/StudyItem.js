import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { ItemStyles } from "../../styles";

const Study = ({ item, handlePress }) => (
  <TouchableOpacity style={ItemStyles.card} onPress={() => handlePress(item)}>
    <View style={ItemStyles.cardContent}>
      <MaterialIcons name="assignment" size={32} color="#F7931E" />
      <View style={ItemStyles.studyDetails}>
        <Text style={[ItemStyles.name, ItemStyles.studyName]}>{item.name}</Text>
        <Text style={ItemStyles.info}>Fecha: {item.date.toLocaleDateString()}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default Study;
