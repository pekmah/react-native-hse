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

const ViewSorModal = () => {
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>View SOR</Text>
          <Button
            title="Close"
            onPress={() => {
              /* Close the modal */
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Render SOR details here */}
          <TextInput
            style={{ marginVertical: 5 }}
            placeholder="Observation"
            editable={false}
          />
          <TextInput
            style={{ marginVertical: 5 }}
            placeholder="Steps Taken"
            editable={false}
          />
          <TextInput
            style={{ marginVertical: 5 }}
            placeholder="Date"
            editable={false}
          />
          <TextInput
            style={{ marginVertical: 5 }}
            placeholder="Status"
            editable={false}
          />
          {/* Display media */}
          <View style={{ marginVertical: 10 }}>
            {/* Media items go here */}
            {/* You may need to implement logic to display media */}
          </View>
        </View>
      </View>
    </Modal>
  );
};


const OpenSorsScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const [openSors, setOpenSors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

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

  const OpenSors = async () => {
    // Logic to open SORs
    try {
      // Retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      // Fetch tasks for the current page
      const response = await ApiManager.get("/open-sor", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle the response
      if (response.status === 200) {
        // Set the open SORs
        setOpenSors(response.data.data);
        console.log(response.data);
      } else {
        // Handle error
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    OpenSors();
  }, []);

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  const totalPages = Math.ceil(openSors.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderSors = () => {
    return openSors
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((sor) => (
        <View
          key={sor.id}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingVertical: 8
          }}
        >
          <Text style={[styles.column, { flex: 2, marginRight: 16 }]}>
            {sor.observation}
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
            onPress={() => {
              // Handle view SOR
            }}
          >
            <Text style={{ color: "#fff" }}>View</Text>
          </TouchableOpacity>
        </View>
      ));
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
          <Text style={styles.title}>Open SORs</Text>
          <View style={{ flex: 1, padding: 10 }}>
            {/* Personnel List */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc"
              }}
            >
              <Text style={[styles.heading, styles.column]}>Observation</Text>
              <Text style={[styles.heading, styles.column]}>Action</Text>
            </View>
            {/* Render SORs here */}
            {renderSors()}
            {/* Pagination controls */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            {/* View SOR Modal */}
            <ViewSorModal />
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
  }
});

export default OpenSorsScreen;


