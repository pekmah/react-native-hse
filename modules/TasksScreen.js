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
  DrawerLayoutAndroid,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // State to store tasks
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const [page, setPage] = useState(1); // State to track current page
  const [hasMore, setHasMore] = useState(true); // State to track if there are more tasks to load
  const drawerRef = useRef(null);

  useEffect(() => {
    // Fetch tasks when component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      // Fetch tasks for the current page
      const response = await ApiManager.get(`/tasks?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Check if there are more tasks
      const newTasks = response.data.data;
      if (newTasks.length === 0) {
        setHasMore(false);
      }

      // Update tasks state
      setTasks([...tasks, ...newTasks]);
      setIsLoading(false); // Set loading state to false when tasks are fetched
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (!isDrawerOpen) {
      console.log(isDrawerOpen);
      drawerRef.current.openDrawer();
    } else {
      drawerRef.current.closeDrawer();
    }
  };

  const handleOutsideTouch = () => {
    console.log(isDrawerOpen);
    console.log("outside");
    closeDrawer();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    drawerRef.current.closeDrawer();
  };

  const handleScrollEnd = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      // Load more tasks when reaching the end of the list
      if (hasMore) {
        setPage(page + 1);
        fetchTasks();
      }
    }
  };

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

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
          contentContainerStyle={styles.container}
          onTouchStart={handleOutsideTouch} // Handle touch outside drawer
          onScrollBeginDrag={handleOutsideTouch} // Handle scroll outside drawer
          onScrollEndDrag={handleScrollEnd} // Handle scroll end to detect if reached end of list
          onMomentumScrollEnd={handleScrollEnd} // Handle momentum scroll end to detect if reached end of list
        >
          <TouchableOpacity style={styles.menu} onPress={toggleDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {/* Render preloader if loading */}
          {isLoading && (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              position="absolute"
              top="50%"
              left="50%"
            />
          )}
          {/* Horizontal ScrollView for paging */}
   
            <View style={styles.pageContainer}>
              <Text style={styles.pageHeader}>Tasks</Text>
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc"
                }}
              >
                <Text style={[styles.heading, styles.column]}>Title</Text>
                <Text style={[styles.heading, styles.column]}>Due Date</Text>
                <Text style={[styles.heading, styles.column]}>Actions</Text>
              </View>
              {tasks.map((task, index) => (
                <View
                  key={task.id + index}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                    alignItems: "center"
                  }}
                >
                  <Text style={[styles.column, { flex: 2, marginRight: 16 }]}> {task.title}</Text>
                  <Text style={[styles.column, { flex: 1, marginRight: 16 }]}> {task.to}</Text>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "#007bff" }]}
                    onPress={() => {}}
                  >
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: "#dc3545" }]}
                    onPress={() => {}}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Opticom Health & Safety</Text>
            <Text style={styles.footerText}>
              © 2024 Opticom Ltd. All rights reserved.
            </Text>
          </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = {
  scrollViewContainer: {
    flexGrow: 1
  },
  horizontalScrollView: {
    flexGrow: 1
  },
  pageContainer: {
    width: Dimensions.get("window").width, // Set page width to screen width
    paddingHorizontal: 10,
    paddingTop: 20
  },
  pageHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  taskCard: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  taskTitle: {
    marginBottom: 5,
    fontWeight: "bold"
  },
  actionButton: {
    padding: 4,
    borderRadius: 4,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  actionButtonText: {
    color: "#fff",
    paddingHorizontal: 8
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
  column: {
    marginRight: 16
  },
  heading: {
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8
  }
};

export default TasksScreen;
