import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Filter = ({ handleSearch, searchText }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilter = () => setFilterVisible(!filterVisible);

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
        <Ionicons
          name={filterVisible ? "close-outline" : "filter-circle-outline"}
          size={24}
          color="#ff7f00"
        />
      </TouchableOpacity>
      {filterVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={searchText}
          onChangeText={handleSearch}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "flex-end",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default Filter;
