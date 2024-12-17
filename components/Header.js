import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ComponentsStyle } from '../styles';

const Header = ({ title, onClose, bgColor = '#4A3F90' }) => {
  return (
    <View style={[ComponentsStyle.header, { backgroundColor: bgColor }]}>
      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="arrow-back" size={32} color="#fff" />
      </TouchableOpacity>
      <Text style={ComponentsStyle.title}>{title}</Text>
      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="close" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;