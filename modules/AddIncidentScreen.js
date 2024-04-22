import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import config from "../config/config";

let images = [];

const UploadImageModal = ({ visible, onClose, onRemoveImage }) => {
  const imgDir = FileSystem.documentDirectory + "images/uploads/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    console.log("dirInfo", dirInfo);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }

      await ensureDirExists();
    })();

    // loadImages();
  }, []);

  const selectImage = async (useLibrary) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1
      });
      console.log("Picking images");
    } else {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    }

    if (!result.canceled) {
      //loop through the images and add them to the images array
      for (let i = 0; i < result.assets.length; i++) {
        images.push(result.assets[i].uri);
        console.log("images beig addedd to array", images);
      }
      setSelectedImages([...selectedImages, ...images]);
    }
  };

  const handleRemoveImage = (index) => {
    onRemoveImage(selectedImages[index]);
    setSelectedImages(selectedImages.filter((img, i) => i !== index));
    //update images array
    images = images.filter((img, i) => i !== index);
  };

  const closeModal = () => {
    onClose();
    setSelectedImages([]);
  };

  const renderItem = ({ item, index }) => {
    const filename = item.split("/").pop();

    return (
      <View
        style={{
          flexDirection: "row",
          margin: 1,
          alignItems: "center",
          gap: 5
        }}
      >
        <Image source={{ uri: item }} style={styles.images} />
        <Text style={{ flex: 1 }}>{filename}</Text>

        <Ionicons.Button
          name="trash"
          onPress={() => handleRemoveImage(index)}
        />
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Button title="Gallery" onPress={() => selectImage(true)} />
        <Button title="Camera" onPress={() => selectImage(false)} />
      </View>
      <Text style={styles.header}>Selected Images</Text>
      <FlatList data={selectedImages} renderItem={renderItem} />
      <Button title="Close" onPress={closeModal} />
      {loading && (
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
      )}
    </Modal>
  );
};

const AddIncidentScreen = () => {
  const [incidentDescription, setIncidentDescription] = useState("");
  const [investigationStatus, setInvestigationStatus] = useState("open");
  const [incidentStatus, setIncidentStatus] = useState("no");
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [incidentType, setIncidentType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchIncidentTypes = async () => {
    try {
      // Retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      // Fetch incident types
      const { data } = await ApiManager.get("/incident-types", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Incident types:", data);

      // Process incident types
      const processedNames = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          let processedValue = value.replace(/_/g, " "); // Replace underscores with spaces
          processedValue = processedValue.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          ); // Capitalize each word
          return [key, processedValue];
        })
      );

      setIncidentTypes(processedNames);
    } catch (error) {
      console.error("Error fetching incident types:", error);
    }
  };

  useEffect(() => {
    fetchIncidentTypes();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleRemoveImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    //update images array
    images = images.filter((img) => img !== uri);
  };

  // Handle form submission

  const handleSubmit = () => {
    console.log("submitting form data");
    if (!incidentDescription || !investigationStatus || !incidentStatus) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    //fetch user from local storage
    setLoading(true);

    const formData = new FormData();
    console.log("formData before", formData);

    formData.append("incident_description", incidentDescription);
    formData.append("investigation_status", investigationStatus);
    formData.append("incident_status", incidentStatus);
    formData.append("incident_type_id", incidentType);

    //loop through the images and add them to the images array
    for (let i = 0; i < images.length; i++) {
      const image = {
        uri: images[i],
        name: Date.now() + i + "." + images[i].split(".").pop(),
        type: `image/${images[i].split(".").pop()}` // Ensure correct content type
      };
      formData.append("images[]", image); // Use key with square brackets
    }

    console.log("formData  after", formData);
    onSubmit(formData);
  };

  //onSubmit function
  const onSubmit = async (formData) => {
    console.log("submitting form data", formData);
    try {
      //retrieve token from local storage
      const token = await AsyncStorage.getItem("token");
      console.log("retrieve token", token);
      //fetch user from local storage
      const user = await AsyncStorage.getItem("user");
      //get user id
      const userId = JSON.parse(user).id;
      //add user id to form data
      formData.append("user_id", userId);
      //create incident
      const response = await fetch(`${config.apiBaseUrl}/add-incident`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
      console.log("submitting form data", formData);

      console.log("response", response);

      if (response.status !== 200) {
        setLoading(false);
        throw new Error("Failed to create SOR record.");
      } else {
        setIncidentDescription("");
        setInvestigationStatus("open");
        setIncidentStatus("no");
        setIncidentType("");

        //loop through the images and delete them from the images array
        for (let i = 0; i < images.length; i++) {
          await FileSystem.deleteAsync(images[i]);
          //update images array
          images = [];
        }

        setLoading(false);
        Alert.alert("Success", "Incident record created successfully.");
      }
    } catch (error) {
      console.error("Error creating SOR record:", error.response);
      setLoading(false);
      Alert.alert("Error", "Failed to create SOR record.");
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
          Incident Records
        </Text>

        <View style={{ borderWidth: 1, borderColor: "#ccc", padding: 16 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
            Add A Record
          </Text>
          <View style={{ marginBottom: 16 }}>
            <Text>Incident Description</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
              multiline
              placeholder="This ...."
              value={incidentDescription}
              onChangeText={(text) => setIncidentDescription(text)}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Investigation Status</Text>
            <Picker
              selectedValue={investigationStatus}
              onValueChange={(itemValue) => setInvestigationStatus(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
            >
              <Picker.Item label="Open" value="open" />
              <Picker.Item label="Closed" value="closed" />
            </Picker>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Incident Status</Text>
            <Picker
              selectedValue={incidentStatus}
              onValueChange={(itemValue) => setIncidentStatus(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
            >
              <Picker.Item label="Yes" value="yes" />
              <Picker.Item label="No" value="no" />
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              padding: 10,
              borderRadius: 4,
              alignItems: "center",
              marginBottom: 16
            }}
            onPress={handleOpenModal}
          >
            <Text style={{ color: "white" }}>Select Images</Text>
          </TouchableOpacity>
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.images} />
            )}
            keyExtractor={(item) => item}
            horizontal
          />
          <View style={{ marginBottom: 16 }}>
            <Text>Incident Type</Text>
            <Picker
              selectedValue={incidentType}
              onValueChange={(itemValue) => setIncidentType(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
            >
              <Picker.Item label="Select Incident Type" value="" />
              {Object.entries(incidentTypes).map(([id, type]) => (
                <Picker.Item key={id} label={type} value={id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#007bff",
              padding: 8,
              borderRadius: 4,
              alignSelf: "flex-start"
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "#fff" }}>Submit</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
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
        ) : null}
        <UploadImageModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onRemoveImage={handleRemoveImage}
          submit={onSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  images: {
    width: 100,
    height: 100,
    margin: 5
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default AddIncidentScreen;
