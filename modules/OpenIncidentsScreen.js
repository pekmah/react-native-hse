import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  DrawerLayoutAndroid,
  StyleSheet,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Preloader from "./Preloader";

const ViewIncidentModal = () => {
  return (
    <Modal
      visible={false} // Set the visibility based on some state
      animationType="slide"
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            View Incident
          </Text>
          <TouchableOpacity
            onPress={() => {
              /* Close the modal */
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Render incident details here */}
        </View>
      </View>
    </Modal>
  );
};

const OpenIncidentsScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (!isDrawerOpen) {
      drawerRef.current.openDrawer();
    } else {
      drawerRef.current.closeDrawer();
    }
  };

  const handleOutsideTouch = () => {
    closeDrawer(); // Close the drawer when touched outside
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    drawerRef.current.closeDrawer();
  };

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await ApiManager.get("/open-incidents", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIncidents(response.data.data);
        setLoading(false);
      } else {
        // Handle error
        console.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  const totalPages = Math.ceil(incidents.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderIncidents = () => {
    return incidents && incidents.length > 0 ? (
      incidents
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((incident) => (
          <View
            key={incident.id}
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingVertical: 8
            }}
          >
            <Text style={[styles.column, { flex: 2, marginRight: 16 }]}>
              {incident.incident_description}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#007bff",
                padding: 4,
                borderRadius: 5,
                marginRight: 16,
                justifyContent: "center",
                alignItems: "center",
                height: 30
              }}
              onPress={() => {}}
            >
              <Text style={{ color: "#fff" }}>View</Text>
            </TouchableOpacity>
          </View>
        ))
    ) : (
      <Text style={{ textAlign: "center", padding: 10 }}>
        No incidents found
      </Text>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <View style={{ flex: 1 }}>
        {/* Wrap the content in a ScrollView */}
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          onTouchStart={handleOutsideTouch} // Handle touch outside drawer
          onScrollBeginDrag={handleOutsideTouch} // Handle scroll outside drawer
        >
          <TouchableOpacity style={styles.menu} onPress={toggleDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {/* Header */}
          <Text style={styles.title}>Open Incidents</Text>
          <View style={{ flex: 1, padding: 10 }}>
            {/* Render the preloader if loading */}
            {loading && (
              <View style={styles.preloaderContainer}>
                <Preloader />
              </View>
            )}
            {/* Render SORs if not loading */}
            {!loading && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc"
                  }}
                >
                  <Text style={[styles.heading, styles.column]}>
                    Incident Description
                  </Text>
                  <Text style={[styles.heading, styles.column]}>Actions</Text>
                </View>
                {renderIncidents()}
                {/* Pagination controls */}
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={styles.paginationButton}
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    <Text>Previous</Text>
                  </TouchableOpacity>
                  <Text style={styles.pageIndicator}>
                    Page {currentPage} of {totalPages}
                  </Text>
                  <TouchableOpacity
                    style={styles.paginationButton}
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>OptiSafe Health & Safety</Text>
            <Text style={styles.footerText}>
              © 2024 OptiSafe Ltd. All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  menu: {
    position: "absolute",
    top: 10,
    left: 10
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10
  },
  heading: {
    fontWeight: "bold",
    padding: 10,
    textAlign: "center"
  },
  column: {
    flex: 1,
    padding: 10
  },
  text: {
    textAlign: "center"
  },
  paginationButton: {
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#007bff",
    borderRadius: 5
  },
  pageIndicator: {
    padding: 8,
    marginHorizontal: 5,
    textAlign: "center"
  },
  cardFooter: {
    fontSize: 14,
    color: "#666"
  },
  footer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    alignItems: "center"
  },
  footerText: {
    color: "#666",
    textAlign: "center"
  },
  preloaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default OpenIncidentsScreen;
