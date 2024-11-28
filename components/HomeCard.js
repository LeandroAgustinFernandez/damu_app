import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const HomeCard = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6200EE',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeCard;