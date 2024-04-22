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
import * as ImagePicker from "expo-image-picker";
import ApiManager from "../api/ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { FlatList } from "react-native-gesture-handler";
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

const AddRecordScreen = () => {
  const [observation, setObservation] = useState("");
  const [status, setStatus] = useState("0");
  const [stepsTaken, setStepsTaken] = useState("");
  const [actionOwner, setActionOwner] = useState("");
  const [sorTypes, setSorTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

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
  const handleRemoveImage = async (uri) => {
    await FileSystem.deleteAsync(uri);
    //update images array
    images = images.filter((img) => img !== uri);
  };

  // Handle form submission

  const handleSubmit = () => {
    if (!observation || !status || !stepsTaken || !actionOwner) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
  setLoading(true);

    const formData = new FormData();
    console.log("formData before", formData);

    formData.append("observation", observation);
    formData.append("status", status);
    formData.append("steps_taken", stepsTaken);
    formData.append("action_owner", actionOwner);
    formData.append("type_id", selectedType);

    //loop through the images and add them to the images array
    for (let i = 0; i < images.length; i++) {
      const image = {
        uri: images[i],
        name: Date.now()  + i +  "." + images[i].split(".").pop(),
        type: `image/${images[i].split(".").pop()}` // Ensure correct content type
      };
      formData.append("images[]", image); // Use key with square brackets
    }

    console.log("formData  after", formData);
    onSubmit(formData);
  };

  //onSubmit function
  const onSubmit = async (formData) => {
    try {
      //retrieve token from local storage
      const token = await AsyncStorage.getItem("token");
      console.log("retrieve token", token);
      //retrieve user id from local storage
      const user = await AsyncStorage.getItem("user");
      const userId = JSON.parse(user).id;
      //add user id to form data
      formData.append("assignor_id", userId);

      //create SOR record and upload images
      const response = await fetch(`${config.apiBaseUrl}/add-sor`, {
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
        setObservation("");
        setStatus("0");
        setStepsTaken("");
        setActionOwner("");
        setSelectedType("");

        //loop through the images and delete them from the images array
        for (let i = 0; i < images.length; i++) {
          await FileSystem.deleteAsync(images[i]);
          //update images array
          images = [];
        }

        console.log("SOR record created:", formData);
        setLoading(false);
        Alert.alert("Success", "SOR record created successfully.");
      }
    } catch (error) {
      console.error("Error creating SOR record:", error);
      setLoading(false);
      Alert.alert("Error", "Failed to create SOR record.");
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
          Add Safety Observation Record
        </Text>
        <View style={{ borderWidth: 1, borderColor: "#ccc", padding: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <Text>Observation</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
              placeholder="Enter Observation"
              value={observation}
              onChangeText={(text) => setObservation(text)}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Status</Text>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
            >
              <Picker.Item label="Open" value="0" />
              <Picker.Item label="Closed" value="1" />
            </Picker>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Steps Taken</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
              multiline
              placeholder="Enter Steps Taken"
              value={stepsTaken}
              onChangeText={(text) => setStepsTaken(text)}
            />
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text>Action Owner</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
              placeholder="Enter Action Owner"
              value={actionOwner}
              onChangeText={(text) => setActionOwner(text)}
            />
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
            <Text>Record Type</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 8
              }}
            >
              <Picker.Item label="Select Record Type" value="" />
              {Object.entries(sorTypes).map(([id, type]) => (
                <Picker.Item key={id} label={type} value={id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 4,
              alignItems: "center"
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white" }}>Submit</Text>
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

const styles = {
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  images: {
    width: 90,
    height: 90,
    marginVertical: 10,
    alignSelf: "center"
  }
};

export default AddRecordScreen;
