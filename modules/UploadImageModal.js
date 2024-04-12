import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Button
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { FlatList } from "react-native-gesture-handler";

const UploadImageModal = ({
  visible,
  onClose,
  onImageSelected,
  onRemoveImage
}) => {
  const imgDir = FileSystem.documentDirectory + "images/uploads/";

  const ensureDirExists = async () => {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
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
    })();

    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();

    const files = await FileSystem.readDirectoryAsync(imgDir);
    console.log(files);
    if (files.length > 0) {
      setSelectedImages(files.map((f) => imgDir + f));
    }
    setLoading(false);
  };

  const selectImage = async (useLibrary) => {
    let result;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
    }

    if (!result.canceled) {
      console.log(result);
      setSelectedImages([...selectedImages, result.uri]);
    }
  };

  const handleRemoveImage = (index) => {
    onRemoveImage(selectedImages[index]);
    setSelectedImages(selectedImages.filter((img, i) => i !== index));
  };

  const handleImageSelected = (uri) => {
    onImageSelected(uri);
  }


  // const uploadImage = async (uri) => {
  //   setLoading(true);

  //   let formData = new FormData();
  //   formData.append("image", {
  //     uri,
  //     type: "image/jpeg",
  //     name: uri.split("/").pop()
  //   });

  //   const response = await fetch("https://api.example.com/upload", {
  //     method: "POST",
  //     body: formData
  //   });

  //   console.log(response);
  //   setLoading(false);
  // };
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
        {/* <Ionicons.Button
          name="cloud-upload"
          onPress={() => uploadImage(item)}
        /> */}
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
      <Button title="Close" onPress={onClose} />
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

export default UploadImageModal;
