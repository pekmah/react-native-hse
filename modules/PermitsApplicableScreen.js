import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "./MenuScreen";

const PermitsApplicableScreen = () => {
  const [permits, setPermits] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // Mocked permits data, replace with actual data fetching logic
  useEffect(() => {
    const mockedPermits = [
      {
        id: 1,
        type: "General Work",
        date: "2024-03-26",
        authorized_person: "John Doe",
        competent_person: "Jane Doe",
        area_owner: "Company A"
      },
      {
        id: 2,
        type: "Hot Work",
        date: "2024-03-27",
        authorized_person: "John Smith",
        competent_person: "Emily Johnson",
        area_owner: "Company B"
      }
    ];
    setPermits(mockedPermits);
  }, []);
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

  const navigationView = () => <MenuScreen closeDrawer={closeDrawer} />;
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
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Permits Applicable</Text>
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
              <Text style={[styles.heading, styles.column]}>Type</Text>
              <Text style={[styles.heading, styles.column]}>Date</Text>
              <Text style={[styles.heading, styles.column]}>AP</Text>
              <Text style={[styles.heading, styles.column]}>CP</Text>
              <Text style={[styles.heading, styles.column]}>AO</Text>
            </View>
            {permits.map((permit) => (
              <View
                key={permit.id}
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc"
                }}
              >
                <Text style={[styles.column, styles.cell]}>{permit.id}</Text>
                <Text style={[styles.column, styles.cell]}>{permit.type}</Text>
                <Text style={[styles.column, styles.cell]}>{permit.date}</Text>
                <Text style={[styles.column, styles.cell]}>
                  {permit.authorized_person}
                </Text>
                <Text style={[styles.column, styles.cell]}>
                  {permit.competent_person}
                </Text>
                <Text style={[styles.column, styles.cell]}>
                  {permit.area_owner}
                </Text>
              </View>
            ))}
          </View>
        </View>
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  menu: {
    padding: 10
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    margin: 20
  },
  heading: {
    fontWeight: "bold",
    padding: 10
  },
  column: {
    flex: 1
  },
  cell: {
    padding: 10
  },
    footer: {
        padding: 10,
        backgroundColor: "#fff",
        marginTop: 10,
        alignItems: "center"
    },
    footerText: {
        color: "#666"
    }
};

export default PermitsApplicableScreen;
