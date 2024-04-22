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

const GoodPractices = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);    const [goodPractices, setGoodPractices] = useState([]);
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
const fetchGoodPractices = async () => {
    try{
    const token = await AsyncStorage.getItem("token");
    const response = await ApiManager.get("/good-practices", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        //handle response
        if (response.status === 200) {
            setGoodPractices(response.data.data);
        } else {
            console.log("Error fetching good practices");
        }
    }
    catch (error) {
        console.log("Error fetching good practices");
    }
    };
    useEffect(() => {
        fetchGoodPractices();
    }, []);



  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;

  const totalPages = Math.ceil(goodPractices.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

const renderGoodPractices = () => {
    return goodPractices && goodPractices
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((goodPractice) => (
            <View key={goodPractice.id} style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 8
              }}
            >
              <Text style={[styles.column, { flex: 2, marginRight: 16 }]}>
                {goodPractice.observation}
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
            <Text style={styles.title}>Good Practices</Text>
            <View style={{ flex: 1, padding: 10 }}>
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
            {renderGoodPractices()}
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

export default GoodPractices;