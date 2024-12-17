import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { ComponentsStyle } from '../styles';

const HomeCard = ({ item, handlePress }) => {
  return (
    <TouchableOpacity
      style={ComponentsStyle.card}
      onPress={() => handlePress(item.screen)}
    >
      <Ionicons name={item.icon} size={50} color="#F7931E" />
      <Text style={ComponentsStyle.cardTitle}>{item.title}</Text>
  </TouchableOpacity>
  );
};

export default HomeCard;