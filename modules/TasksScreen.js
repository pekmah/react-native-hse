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
  const drawerRef = useRef(null);

  useEffect(() => {
    // Fetch tasks when component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      //retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      //fetch tasks
      const response = await ApiManager.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data);
      setTasks(response.data.data);
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

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  // Split tasks into chunks of 6 tasks per page
  const chunkedTasks = [];
  for (let i = 0; i < tasks.length; i += 6) {
    chunkedTasks.push(tasks.slice(i, i + 6));
  }

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      {/* Wrap the content in a ScrollView */}
      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.scrollViewContainer}
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
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          contentContainerStyle={styles.horizontalScrollView}
        >
          {chunkedTasks.map((pageTasks, pageIndex) => (
            <View key={pageIndex} style={styles.pageContainer}>
              {/* Page header */}
              <Text style={styles.pageHeader}>Page {pageIndex + 1}</Text>
              {pageTasks.map((task) => (
                <View key={task.id} style={styles.taskCard}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  {/* <Text style={styles.taskDescription}>{task.description}</Text> */}
                  {/* <View style={styles.taskDates}>
                    <Text>From: {task.from}</Text>
                    <Text>To: {task.to}</Text>
                  </View>
                  <View style={styles.taskActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {}}
                    >
                      <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.actionButton,
                        { backgroundColor: "#dc3545" }
                      ]}
                      onPress={() => {}}
                    >
                      <Text style={styles.actionButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Opticom Health & Safety</Text>
          <Text style={styles.footerText}>
            © 2024 Opticom Ltd. All rights reserved.
          </Text>
        </View>
      </ScrollView>
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
  taskDescription: {
    marginBottom: 5
  },
  taskDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  taskActions: {
    flexDirection: "row"
  },
  actionButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 3,
    marginRight: 5
  },
  actionButtonText: {
    color: "#fff"
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
  }
};

export default TasksScreen;
