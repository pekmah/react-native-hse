import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  DrawerLayoutAndroid
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";

const SupervisorDetailModal = () => {
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
            Supervisor's Detail
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
          <View style={{ marginBottom: 10 }}>
            <Text>Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 5
              }}
              editable={false}
            />
          </View>
          <View>
            <Text>Date</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 5
              }}
              editable={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const AddSupervisorModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible} // Set the visibility based on some state
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
            Add Supervisor
          </Text>
          <TouchableOpacity
            onPress={onClose}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text>Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 5
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 5,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff" }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const SupervisorScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddSupervisorModalVisible, setIsAddSupervisorModalVisible] =
    useState(false); // State for modal visibility
  const drawerRef = useRef(null);

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

  const toggleAddSupervisorModal = () => {
    setIsAddSupervisorModalVisible(!isAddSupervisorModalVisible); // Toggle modal visibility
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      {/* Wrap the content in a ScrollView */}
      <ScrollView
        contentContainerStyle={styles.container}
        onTouchStart={handleOutsideTouch} // Handle touch outside drawer
        onScrollBeginDrag={handleOutsideTouch} // Handle scroll outside drawer
      >
        <TouchableOpacity style={styles.menu} onPress={toggleDrawer}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={toggleAddSupervisorModal}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Supervisor List</Text>
        {/* Content */}
        <View style={{ flex: 1, padding: 10 }}>
          {/* Content Goes Here */}
          <View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc"
              }}
            >
              <Text style={[styles.heading, styles.column]}>Id</Text>
              <Text style={[styles.heading, styles.column]}>Name</Text>
              <Text style={[styles.heading, styles.column]}>Date</Text>
              <Text style={[styles.heading, styles.column]}>Action</Text>
            </View>

            {/* Supervisor List */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 8
              }}
            >
              <Text style={{ marginRight: 16 }}>1</Text>
              <Text style={{ marginRight: 16 }}>John Doe</Text>
              <Text style={{ marginRight: 16 }}>2021-05-01</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  padding: 4,
                  borderRadius: 4
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#fff", paddingHorizontal: 8 }}>
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#dc3545",
                  padding: 4,
                  borderRadius: 4,
                  marginLeft: 8
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#fff", paddingHorizontal: 8 }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 8
              }}
            >
              <Text style={{ marginRight: 16 }}>2</Text>
              <Text style={{ marginRight: 16 }}>Jane Doe</Text>
              <Text style={{ marginRight: 16 }}>2021-05-02</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007bff",
                  padding: 4,
                  borderRadius: 4
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#fff", paddingHorizontal: 8 }}>
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#dc3545",
                  padding: 4,
                  borderRadius: 4,
                  marginLeft: 8
                }}
                onPress={() => {}}
              >
                <Text style={{ color: "#fff", paddingHorizontal: 8 }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Add Supervisor Modal */}
        <AddSupervisorModal
          isVisible={isAddSupervisorModalVisible}
          onClose={toggleAddSupervisorModal}
        />

        {/* Footer */}
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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  heading: {
    fontWeight: "bold",
    marginRight: 16,
    marginTop: 20,
    marginBottom: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  column: {
    flex: 1
  },
  menu: {
    marginLeft: 10,
    marginTop: 10
  },
  footer: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    alignItems: "center"
  },
  addButton: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30
  },
  footerText: {
    color: "#666",
    textAlign: "center"
  }
});

export default SupervisorScreen;
