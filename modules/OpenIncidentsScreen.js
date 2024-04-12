import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const ViewIncidentModal = () => {
  return (
    <Modal
      visible={false} // Set the visibility based on some state
      animationType="slide"
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>View Incident</Text>
          <TouchableOpacity onPress={() => { /* Close the modal */ }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Render incident details here */}
        </View>
      </View>
    </Modal>
  );
};

const OpenIncidentsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Open Incidents</Text>
        {/* DataTable with Buttons */}
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {/* Render your table here */}
          </View>
        </ScrollView>
      </View>
      <ViewIncidentModal />
    </View>
  );
};

export default OpenIncidentsScreen;
