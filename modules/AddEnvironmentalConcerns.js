import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Dimensions,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";


const AddCheckListModal = ({ isVisible, onClose }) => {
  const [checklist, setChecklist] = useState([]);

  const handleAddChecklistItem = () => {
    setChecklistItems([...checklistItems, checklist]);
    setChecklist("");
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <KeyboardAvoidingWrapper>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <View style={{ flex: 1, paddingVertical: 24 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
              Enviromental Policy Checklist
            </Text>

            {/* Environmental Policy Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Environmental Policy
              </Text>
              <Text style={{ marginBottom: 10 }}>
                Is the Enviromental Policy displayed on Site?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is the Enviromental Policy upto date?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is the Enviromental Policy signed by the CEO?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are Environmental factors included in Risk Assessments?{" "}
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are Environmental emergency procedures adequately addressed and
                displayed?{" "}
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are Environmental control measures described in method statements?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are all operatives briefed and aware of good Environmental
                practices?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are sub-contractors conforming to the company's Environmental
                Policy?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Site Establishment Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Site Establishment
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Are site cabins clean and in good condition?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are there adequate parking facilities off/onsite?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are fences, hoardings, and gates in good condition?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Waste Management Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Waste Management
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Is there any existing contamination onsite? Is it being dealt with
                adequately?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are transfer notes (consignment notes for special waste) in place?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are adequate segregation measures in place?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Energy Management Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Energy Management
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Is electrical power for light and heat kept at a minimum period?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is water usage minimized? (e.g. low flush toilets, waterless
                urinals, etc.)
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is plant shut down when not in use?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Water Protection Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Water Protection
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Are consents in place for the discharge of water?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are drains identified (surface and sewer)?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is silt being prevented from discharging to watercourses?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are fuel tanks, bowsers, and drums within a bund to EA guidelines?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are drip trays in place for plant and fuelling points?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are emergency measures in place (spill kits)?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are all chemicals stored safely and marked?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is plant in good condition and without any leaks?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are plant and materials reasonably kept away from drains and
                watercourses?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are wheel washes suitably constructed and contained?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Material Management Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Material Management
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Are there alternative arrangements for unused materials other than
                disposal?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are materials such as hardwoods acquired from a sustainable
                source?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are there arrangements to reuse/recycle existing site material?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>

            {/* Nuisance Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Nuisance
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Is dust suppression adequate?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are noise and vibration within reasonable limits?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>Are activities smokeless?</Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Is there any inessential burning on-site?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are deliveries arranged to minimize disruption to neighbors?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are there arrangements to keep neighbors informed and liaison
                procedures?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are site lights positioned away from neighbors?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are site cabins screened from neighbors as appropriate?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Flora & Fauna Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Flora & Fauna
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>
                Is adequate protection in place for existing planted areas?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
              <Text style={{ marginBottom: 10 }}>
                Are measures in place to protect initial life adequate?
              </Text>
              <Picker
                selectedValue={checklist}
                onValueChange={(itemValue) => setChecklist(itemValue)}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Yes" value="1" />
                <Picker.Item label="No" value="0" />
              </Picker>
            </View>
            {/* Completion and Sign-Off Section */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Completion and Sign-Off
              </Text>
              {/* Select inputs */}
              <Text style={{ marginBottom: 10 }}>Further Comments:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  marginBottom: 10
                }}
                multiline
                numberOfLines={4}
              />
              <Text style={{ marginBottom: 10 }}>Corrective Action</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  marginBottom: 10
                }}
                multiline
                numberOfLines={4}
              />
              <Text style={{ marginBottom: 10 }}>Project/Site Manager:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  marginBottom: 10
                }}
              />
              <Text style={{ marginBottom: 10 }}>Auditor:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  marginBottom: 10
                }}
              />
            </View>
            <Button title="Submit" onPress={onClose} />
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </Modal>
  );
};

const AddFreeFormModal = ({ isVisible, onClose }) => {
  const [type, setType] = useState("");
  const [comment, setComment] = useState("");
  const [correctiveAction, setCorrectiveAction] = useState("");
  const [status, setStatus] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [auditor, setAuditor] = useState("");

  return (
    <Modal visible={isVisible} animationType="slide">
      <KeyboardAvoidingWrapper>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <View style={{ flex: 1, paddingVertical: 24 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 16 }}>
              Add Free Form
            </Text>
            <Text style={{ marginBottom: 10 }}>Type</Text>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(itemValue)}
            >
              <Picker.Item label="Select" value="" />
              <Picker.Item label="Waste Management" value="Waste Management" />
              <Picker.Item label="Water Protection" value="Water Protection" />
              <Picker.Item label="Air Management" value="Air Management" />
              <Picker.Item label="Noise Management" value="Noise Management" />
              <Picker.Item label="Soil Management" value="Soil Management" />
              <Picker.Item
                label="Biodiversity Management"
                value="Biodiversity Management"
              />
              <Picker.Item label="Energy Management" value="Energy Management" />
              <Picker.Item
                label="Chemical Management"
                value="Chemical Management"
              />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <Text style={{ marginBottom: 10 }}>Comment</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10
              }}
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
            <Text style={{ marginBottom: 10 }}>Corrective Action</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10
              }}
              multiline
              numberOfLines={4}
              value={correctiveAction}
              onChangeText={setCorrectiveAction}
            />
            <Text style={{ marginBottom: 10 }}>Status</Text>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
            >
              <Picker.Item label="Select Status" value="" />
              <Picker.Item label="Open" value="Open" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
            <Text style={{ marginBottom: 10 }}>Project Manager</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10
              }}
              value={projectManager}
              onChangeText={setProjectManager}
            />
            <Text style={{ marginBottom: 10 }}>Auditor</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                marginBottom: 10
              }}
              value={auditor}
              onChangeText={setAuditor}
            />
            <Button title="Submit" onPress={onClose} />
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
    </Modal>
  );
};

const AddEnvironmentalConcerns = () => {
  const [isFreeFormModalVisible, setIsFreeFormModalVisible] = useState(false);
  const [isCheckListModalVisible, setIsCheckListModalVisible] = useState(false);

  // Open the free form modal
  const toggleFreeFormModal = () => {
    setIsFreeFormModalVisible(!isFreeFormModalVisible);
  };

  // Open the checklist modal
  const toggleCheckListModal = () => {
    setIsCheckListModalVisible(!isCheckListModalVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.freeFormButton}
            onPress={toggleFreeFormModal}
          >
            <Text style={{ color: "white" }}>Add Free Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.policyButton}
            onPress={toggleCheckListModal}
          >
            <Text style={{ color: "white" }}>Add Policy Checklist</Text>
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 OptiSafe Ltd. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Free Form Modal */}
      <AddFreeFormModal
        isVisible={isFreeFormModalVisible}
        onClose={toggleFreeFormModal}
      />

      {/* Checklist Modal */}
      <AddCheckListModal
        isVisible={isCheckListModalVisible}
        onClose={toggleCheckListModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  scrollViewContent: {
    flexGrow: 1
  },
  body: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row"
  },
  freeFormButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5
  },
  policyButton: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
    width: "100%",
    borderRadius: 5
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5
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
  },
  preloaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AddEnvironmentalConcerns;
