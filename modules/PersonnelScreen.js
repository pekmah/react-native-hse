import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  DrawerLayoutAndroid,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";

const PersonnelDetailModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
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
            Personnel Detail
          </Text>
          <TouchableOpacity onPress={onClose}>
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
          <View style={{ marginBottom: 10 }}>
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
          <View style={{ marginBottom: 10 }}>
            <Text>Head Count</Text>
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

const AddPersonnelModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
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
            Add Personnel
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <Text>Head Count</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                padding: 5
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
                marginRight: 10
              }}
            >
              <Text style={{ color: "#fff" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PersonnelScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const personnelData = [
    { id: 1, name: "John Doe", date: "2021-01-01", headCount: 5 },
    { id: 2, name: "Jane Doe", date: "2021-01-02", headCount: 3 }
  ];

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
        >
          <TouchableOpacity style={styles.menu} onPress={toggleDrawer}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          {/* Header */}
          <TouchableOpacity style={styles.addButton} onPress={{}}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Personnel Detail</Text>
          <View style={{ flex: 1, padding: 10 }}>

          {/* Personnel List */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text style={[styles.heading, styles.column]}>Id</Text>
            <Text style={[styles.heading, styles.column]}>Name</Text>
            <Text style={[styles.heading, styles.column]}>Date</Text>
            <Text style={[styles.heading, styles.column]}>Count</Text>
            <Text style={[styles.heading, styles.column]}>Action</Text>
          </View>
          {personnelData.map((personnel) => (
            <View
              key={personnel.id}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingVertical: 8
              }}
            >
              <Text style={{ marginRight: 16 }}>{personnel.id}</Text>
              <Text style={{ marginRight: 16 }}>{personnel.name}</Text>
              <Text style={{ marginRight: 16 }}>{personnel.date}</Text>
              <Text style={{ marginRight: 16 }}>{personnel.headCount}</Text>
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
          ))}

          <PersonnelDetailModal visible={false} onClose={() => {}} />
          <AddPersonnelModal visible={false} onClose={() => {}} />
          </View>
        </ScrollView>
        {/* Footer */}
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
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10
  },
  menu: {
    padding: 10,
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 1,
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  heading: {
    fontWeight: "bold",
    marginRight: 16,
    marginTop: 20,
    marginBottom: 8
  },
  column: {
    flex: 1
  },
  addButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5
  },
  personnelItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
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
});
export default PersonnelScreen;
