import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ReportedHazardsScreen = () => {
  const [search, setSearch] = useState('');
  const [hazards, setHazards] = useState([]);

  // Function to search hazards
  const searchHazards = () => {
    // Logic to search hazards
  };

  // Function to show hazard details
  const showHazardDetails = (id) => {
    // Logic to show hazard details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reported Hazards</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search observations"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchHazards}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* Table */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  table: {
    // Styles for the table
  },
  // Add more styles as needed
});

export default ReportedHazardsScreen;
