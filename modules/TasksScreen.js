import React, { useState, useRef, useEffect } from "react";
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
  DrawerLayoutAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Preloader from "./Preloader";

const TasksScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const drawerRef = useRef(null);

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

  useEffect(() => {
    // Fetch tasks when component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      // Retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      // Fetch tasks for the current page
      const response = await ApiManager.get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Handle the response
      if (response.status === 200) {
        // Set the tasks
        setTasks(response.data.data);
        // Set loading to false
        setIsLoading(false);
      } else {
        // Handle error
        console.error(response.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderTasks = () => {
    return tasks
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((task) => (
        <View
          key={task.id}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingVertical: 8
          }}
        >
          <Text style={[styles.column, { flex: 2, marginRight: 16 }]}>
            {task.description}
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
          <Text style={styles.title}>Tasks</Text>
          <View style={{ flex: 1, padding: 10 }}>
            {/* Render the preloader if loading */}
            {isLoading && (
              <View style={styles.preloaderContainer}>
                <Preloader />
              </View>
            )}
            {!isLoading && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc"
                  }}
                >
                  <Text style={[styles.heading, styles.column]}>
                    Observation
                  </Text>
                  <Text style={[styles.heading, styles.column]}>Action</Text>
                </View>
                {renderTasks()}
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

export default TasksScreen;
