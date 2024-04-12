import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import axios from "axios";

const NearMissScreen = () => {
  const [nearMisses, setNearMisses] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNearMiss, setSelectedNearMiss] = useState(null);

  useEffect(() => {
    fetchNearMisses();
  }, []);

  const fetchNearMisses = async () => {
    try {
      const response = await axios.get("your_api_endpoint_here");
      setNearMisses(response.data);
    } catch (error) {
      console.error("Error fetching near misses:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("your_search_api_endpoint_here", {
        params: { search },
      });
      setNearMisses(response.data);
    } catch (error) {
      console.error("Error searching near misses:", error);
    }
  };

  const handleShowModal = (nearMiss) => {
    setSelectedNearMiss(nearMiss);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Near Miss Manager</Text>
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Description"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View> */}
      <ScrollView>
        {nearMisses.map((nearMiss) => (
          <TouchableOpacity
            key={nearMiss.id}
            style={styles.nearMissItem}
            onPress={() => handleShowModal(nearMiss)}
          >
            <Text style={styles.nearMissText}>
              ID: {nearMiss.id}, Description: {nearMiss.incident_description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>Near Miss Details</Text>
          {selectedNearMiss && (
            <View style={styles.modalContent}>
              <Text>Description: {selectedNearMiss.incident_description}</Text>
              <Text>
                Reporting Done: {selectedNearMiss.incident_status === "yes" ? "Done" : "Not Done"}
              </Text>
              <Text>
                Investigation:{" "}
                {selectedNearMiss.investigation_status === "open" ? "Open" : "Closed"}
              </Text>
              <Text>Date: {selectedNearMiss.incident_date}</Text>
              {/* Display media if needed */}
            </View>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
  },
  nearMissItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  nearMissText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#fff",
  },
});

export default NearMissScreen;
