import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EnvironmentalConcernsScreen = () => {
  const [concerns, setConcerns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch concerns when component mounts
    fetchConcerns();
  }, []);

  const fetchConcerns = async () => {
    try {
      // Fetch concerns from API
      // Replace this with your actual API call
      const response = await fetch('your_api_endpoint');
      const data = await response.json();
      setConcerns(data.concerns);
    } catch (error) {
      console.error('Error fetching concerns:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Render concerns */}
        {concerns.map((concern, index) => (
          <View key={index} style={styles.concern}>
            <Text>Type: {concern.type}</Text>
            <Text>Comment: {concern.comment}</Text>
            <Text>Corrective Action: {concern.correctiveAction}</Text>
            <Text>Status: {concern.status}</Text>
            <Text>Project Manager: {concern.projectManager}</Text>
            <Text>Auditor: {concern.auditor}</Text>
            {/* Add action buttons here */}
            <TouchableOpacity style={styles.actionButton}>
              <Text>View</Text>
            </TouchableOpacity>
            {/* Add other action buttons as needed */}
          </View>
        ))}
      </ScrollView>

      {/* Modal for adding new concern */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContent}>
          {/* Add form fields for adding new concern */}
          <TextInput placeholder="Type" style={styles.input} />
          <TextInput placeholder="Comment" style={styles.input} />
          <TextInput placeholder="Corrective Action" style={styles.input} />
          <TextInput placeholder="Status" style={styles.input} />
          <TextInput placeholder="Project Manager" style={styles.input} />
          <TextInput placeholder="Auditor" style={styles.input} />
          {/* Add submit button */}
          <Button title="Save" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>

      {/* Button to toggle modal visibility */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  concern: {
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    borderRadius: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default EnvironmentalConcernsScreen;
