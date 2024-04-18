import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import DashboardScreen from "./modules/DashboardScreen";
import AddIcaScreen from "./modules/AddIcaScreen";
import AddIncidentScreen from "./modules/AddIncidentScreen";
import AddRecordScreen from "./modules/AddRecordScreen";
import BadPractisesScreen from "./modules/BadPractisesScreen";
import EnvironmentalConcernsScreen from "./modules/EnvironmentalConcernsScreen";
import FirstAidCaseScreen from "./modules/FirstAidCaseScreen";
import GoodPractisesScreen from "./modules/GoodPractisesScreen";
import LostTimeAccidentScreen from "./modules/LostTimeAccidentsScreen";
import MedicalTreatmentCaseScreen from "./modules/MedicalTreatedCaseScreen";
import NearMissScreen from "./modules/NearMissScreen";
import OpenIncidentsScreen from "./modules/OpenIncidentsScreen";
import OpenSorsScreen from "./modules/OpenSorsScreen";
import PermitsApplicableScreen from "./modules/PermitsApplicableScreen";
import PersonnelScreen from "./modules/PersonnelScreen";
import ReportedHazardsScreen from "./modules/ReportedHazardsScreen";
import SIFScreen from "./modules/SIFScreen";
import SuggestedImprovementsScreen from "./modules/SuggestedImprovementsScreen";
import SupervisorScreen from "./modules/SupervisorScreen";
import TasksScreen from "./modules/TasksScreen";
import ViewIcaScreen from "./modules/ViewIcaScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./api/ApiManager";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Supervisor" component={SupervisorScreen} />
        <Stack.Screen name="Personnel" component={PersonnelScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="OpenIncidents" component={OpenIncidentsScreen} />
        <Stack.Screen name="OpenSors" component={OpenSorsScreen} />
        <Stack.Screen
          name="ReportedHazards"
          component={ReportedHazardsScreen}
        />
        <Stack.Screen name="NearMiss" component={NearMissScreen} />
        <Stack.Screen
          name="LostTimeAccident"
          component={LostTimeAccidentScreen}
        />
        <Stack.Screen
          name="MedicalTreatmentCase"
          component={MedicalTreatmentCaseScreen}
        />
        <Stack.Screen name="FirstAidCase" component={FirstAidCaseScreen} />
        <Stack.Screen name="SIF" component={SIFScreen} />
        <Stack.Screen
          name="EnvironmentalConcerns"
          component={EnvironmentalConcernsScreen}
        />
        <Stack.Screen name="BadPractises" component={BadPractisesScreen} />
        <Stack.Screen name="GoodPractises" component={GoodPractisesScreen} />
        <Stack.Screen
          name="SuggestedImprovements"
          component={SuggestedImprovementsScreen}
        />
        <Stack.Screen
          name="Permits Applicable"
          component={PermitsApplicableScreen}
        />
        <Stack.Screen name="Add Incident" component={AddIncidentScreen} />
        <Stack.Screen name="Add Record" component={AddRecordScreen} />
        <Stack.Screen name="Add Ica" component={AddIcaScreen} />
        <Stack.Screen name="ViewIca" component={ViewIcaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const response = await ApiManager.post("/login", {
        email,
        password
      });
      if (response.status === 200) {
        // Save token to AsyncStorage
        await AsyncStorage.setItem("token", response.data.token);
        // Save user to AsyncStorage
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        //clear inputs
        setEmail("");
        setPassword("");

        setIsLoading(false); // Set loading state to false after successful login

        setErrorMessage("");
        setSuccessMessage("");
        // Navigate to Dashboard screen
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      setIsLoading(false); // Set loading state to false after login request completes

      // console.error(error);
      if (error.response.status === 401) {
        // Display error message
        setErrorMessage("Invalid email or password");
        setSuccessMessage(""); // Clear any previous success message
      } else if (error.response.status === 422) {
        // Display error message
        setErrorMessage(error.response.data.message);
        setSuccessMessage(""); // Clear any previous success message
      } else {
        // Display error message
        setErrorMessage("An error occurred. Please try again later.");
        setSuccessMessage(""); // Clear any previous success message
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? ( // Render preloader if isLoading is true
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.4)"
            }
          ]}
        >
          <ActivityIndicator animating size="large" color="#fff" />
        </View>
      ) : (
        <>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("./images/Opticom Logo.png")}
              style={styles.logo}
            />
          </View>

          {/* Welcome message */}
          <Text style={styles.welcomeText}>Welcome to HSE! 👋</Text>

          {/* Email input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email or username"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoFocus
          />

          {/* Password input */}
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={handleTogglePassword}
              style={styles.eyeIcon}
            ></TouchableOpacity>
          </View>

          {/* Remember me checkbox */}
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity onPress={() => {}} style={styles.checkbox}>
              <View style={styles.checkboxInner} />
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          {/* Sign in button */}
          <TouchableOpacity onPress={handleLogin} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign in</Text>
          </TouchableOpacity>

          {/* Error and success messages */}
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          {successMessage ? (
            <Text style={styles.successMessage}>{successMessage}</Text>
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30
  },
  logo: {
    width: 170,
    height: 170
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20
  },
  passwordInput: {
    flex: 1,
    padding: 10
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10
  },
  checkboxInner: {
    flex: 1,
    backgroundColor: "#007bff",
    borderRadius: 4
  },
  rememberMeText: {
    fontSize: 16
  },
  signInButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center"
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 10
  },

  successMessage: {
    color: "green",
    textAlign: "center",
    marginTop: 10
  }
});
