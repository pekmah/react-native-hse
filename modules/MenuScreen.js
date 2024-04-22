import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MenuItem = ({ title, onPress, isActive }) => {
  return (
    <TouchableOpacity
     style={styles.menuItem}
     onPress={onPress}>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SubMenuItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.subMenuItem} onPress={onPress}>
      <Text style={styles.subMenuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const VerticalNav = () => {
  const navigation = useNavigation();
  const [showSorSubmenu, setShowSorSubmenu] = useState(false);
  const [showIncidentSubmenu, setShowIncidentSubmenu] = useState(false);
  const [showImediateCorrectiveAction, setShowImediateCorrectiveAction] =
    useState(false);

  const handleMenuItemPress = (routeName) => {
    navigation.navigate(routeName);
  };

  const handleSorSubmenuPress = (action) => {
    // Implement navigation logic for SOR submenu items
    navigation.navigate(action);

  };

  const handleIncidentSubmenuPress = (action) => {
    // Implement navigation logic for Incident Manager submenu items
    navigation.navigate(action);
  };

  const handleImediateCorrectiveActionSubmenuPress = (action) => {
    // Implement navigation logic for Incident Manager submenu items
    navigation.navigate(action);
  };



  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        {/* Brand */}
        <View style={styles.brand}>
          <Image
            source={require("../images/Opticom Logo.png")}
            style={styles.brandLogo}
          />
          <Text style={styles.brandText}>Opticom HSE</Text>
        </View>
        {/* Menu Items */}
        <ScrollView style={styles.menuItems}>
          <MenuItem
            title="Dashboard"
            onPress={() => handleMenuItemPress("Dashboard")}
          />
          <MenuItem
            title="Supervisor"
            onPress={() => handleMenuItemPress("Supervisor")}
          />
          <MenuItem
            title="Personnel"
            onPress={() => handleMenuItemPress("Personnel")}
          />
          <MenuItem
            title="SOR's"
            onPress={() => setShowSorSubmenu(!showSorSubmenu)}
          />
          {showSorSubmenu && (
            <View style={styles.submenu}>
              <SubMenuItem
                title="Add Record"
                onPress={() => handleSorSubmenuPress("Add Record")}
              />
              <SubMenuItem
                title="Open SOR's"
                onPress={() => handleSorSubmenuPress("Open Sors")}
              />
              <SubMenuItem
                title="Reported Hazards"
                onPress={() => handleSorSubmenuPress("Reported Hazards")}
              />
              <SubMenuItem
                title="Suggested Improvements"
                onPress={() => handleSorSubmenuPress("Suggested Improvements")}
              />
              <SubMenuItem
                title="Good Practises"
                onPress={() => handleSorSubmenuPress("Good Practises")}
              />
              <SubMenuItem
                title="Bad Practises"
                onPress={() => handleSorSubmenuPress("Bad Practises")}
              />
            </View>
          )}
          <MenuItem
            title="Incident Manager"
            onPress={() => setShowIncidentSubmenu(!showIncidentSubmenu)}
          />
          {showIncidentSubmenu && (
            <View style={styles.submenu}>
              <SubMenuItem
                title="Add Incident"
                onPress={() => handleIncidentSubmenuPress("Add Incident")}
              />
              <SubMenuItem
                title="Open Incidents"
                onPress={() => handleIncidentSubmenuPress("Open Incidents")}
              />
              <SubMenuItem
                title="Near Miss"
                onPress={() => handleIncidentSubmenuPress("Near Miss")}
              />
              <SubMenuItem
                title="First Aid Case"
                onPress={() => handleIncidentSubmenuPress("First Aid Case")}
              />
              <SubMenuItem
                title="Medical Treated Case"
                onPress={() => handleIncidentSubmenuPress("Medical Treatment Case")}
              />
              <SubMenuItem
                title="Lost Time Accidents"
                onPress={() => handleIncidentSubmenuPress("Lost Time Accident")}
              />
              <SubMenuItem
                title="SIF"
                onPress={() => handleIncidentSubmenuPress("SIF")}
              />
            </View>
          )}
          <MenuItem
            title="Immediate Corrective Action"
            onPress={() =>
              setShowImediateCorrectiveAction(!showImediateCorrectiveAction)
            }
          />
          {showImediateCorrectiveAction && (
            <View style={styles.submenu}>
              <SubMenuItem
                title="Add ICA's"
                onPress={() => handleImediateCorrectiveActionSubmenuPress("Add Ica")}
              />
              <SubMenuItem
                title="View ICA's"
                onPress={() =>
                  handleImediateCorrectiveActionSubmenuPress("View Ica")
                }
              />
            </View>
          )}
            <MenuItem
                title="Permits Applicable"
                onPress={() => handleMenuItemPress("Permits Applicable")}
            />
          <MenuItem
            title="Tasks"
            onPress={() => handleMenuItemPress("Tasks")}
          />
            <MenuItem
            title="Environmental Concerns"
            onPress={() => handleMenuItemPress("Environmental Concerns")}
            />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menu: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10
  },
  brand: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  brandText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: -70
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginLeft: -70
  },
  menuItems: {
    marginTop: 20
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16
  },
  menuItemText: {
    fontSize: 16
  },
  submenu: {
    marginLeft: 20
  },
  subMenuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  subMenuItemText: {
    fontSize: 15
  }
});

export default VerticalNav;
