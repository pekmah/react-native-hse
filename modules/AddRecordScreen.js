import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import UploadImageModal from "./UploadImageModal";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";



const AddRecordScreen = () => {
  const [observation, setObservation] = useState("");
  const [status, setStatus] = useState("0");
  const [stepsTaken, setStepsTaken] = useState("");
  const [actionOwner, setActionOwner] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [sorTypes, setSorTypes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchSorTypes = async () => {
      try {
        //retrieve token from local storage
        const token = await AsyncStorage.getItem("token");

        //fetch SOR types
        const { data } = await ApiManager.get("/sor-types", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSorTypes(data);
      } catch (error) {
        console.error("Error fetching SOR types:", error);
      }
    };

    fetchSorTypes();
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleImageSelected = (image) => {
    setSelectedImages([...selectedImages, image]);
  };

  // Handle form submission

  const handleSubmit = async () => {
    try {
      if (!observation || !stepsTaken || !actionOwner || !selectedType) {
        Alert.alert("Error", "Please fill in all fields.");
        return;
      }
      console.log("selectedImages", selectedImages);
      const user = await AsyncStorage.getItem("user");
      const user_id = JSON.parse(user).id;
      const formData = {
        action_owner: actionOwner,
        observation: observation,
        status: status,
        steps_taken: stepsTaken,
        type_id: selectedType,
        assignor_id: user_id,
        images: image
      };

      
      console.log("formData", formData);
      // Call the onSubmit function with formData
      await onSubmit(formData);
    } catch (error) {
      console.error("Error handling form submission:", error);
      Alert.alert("Error", "Failed to handle form submission.");
    }
  };


  //onSubmit function
  const onSubmit = async (formData) => {
    try {
      //retrieve token from local storage
      const token = await AsyncStorage.getItem("token");

      //create SOR record and upload images
      // const response = await ApiManager.post("/add-sor", formData, {

      const response = await ApiManager.post("/add-sor", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
        
      });

      console.log("response", response.data);

      if (response.status !== 200) {
        throw new Error("Failed to create SOR record.");
      } else {
        setObservation("");
        setStatus("0");
        setStepsTaken("");
        setActionOwner("");
        setSelectedImages([]);
        setSelectedType("");

        console.log("SOR record created:", formData);
        Alert.alert("Success", "SOR record created successfully.");
      }
    } catch (error) {
      console.error("Error creating SOR record:", error.response);
      Alert.alert("Error", "Failed to create SOR record.");
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20
        }}
      >
        Safety Observation Records
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }}
        placeholder="Observation"
        value={observation}
        onChangeText={setObservation}
      />
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Picker.Item label="Open" value="0" />
        <Picker.Item label="Closed" value="1" />
      </Picker>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          height: 100
        }}
        placeholder="Steps Taken"
        multiline
        value={stepsTaken}
        onChangeText={setStepsTaken}
      />
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10
        }}
        placeholder="Action Owner"
        value={actionOwner}
        onChangeText={setActionOwner}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: 10
        }}
        onPress={handleOpenModal}
      >
        <Text style={{ color: "white" }}>Select Images</Text>
      </TouchableOpacity>
      {selectedImages.map((image, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>{image.fileName}</Text>
        </View>
      ))}
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Picker.Item label="Select Record Type" value="" />
        {Object.entries(sorTypes).map(([id, type]) => (
          <Picker.Item key={id} label={type} value={id} />
        ))}
      </Picker>
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 10,
          borderRadius: 5,
          alignItems: "center"
        }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "white" }}>Submit</Text>
      </TouchableOpacity>
      {/* Render UploadImageModal */}
      <UploadImageModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onImageSelected={handleImageSelected}
        onRemoveImage={handleRemoveImage}
      />
    </ScrollView>
  );
};

export default AddRecordScreen;
