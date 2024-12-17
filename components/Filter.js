import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormStyles } from "../styles";

const Filter = ({ handleSearch, searchText }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!filterVisible);

  return (
    <View style={FormStyles.filterContainer}>
      <TouchableOpacity onPress={toggleFilter} style={FormStyles.filterButton}>
        <Ionicons
          name={filterVisible ? "close-outline" : "filter-circle-outline"}
          size={32}
          color="#ff7f00"
        />
      </TouchableOpacity>
      {filterVisible && (
        <TextInput
          style={FormStyles.searchInput}
          placeholder="Buscar por nombre..."
          value={searchText}
          onChangeText={handleSearch}
        />
      )}
    </View>
  );
};

export default Filter;
