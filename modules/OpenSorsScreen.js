import React from 'react';
import { View, Text, ScrollView, Modal, TextInput, Button } from 'react-native';

const ViewSorModal = () => {
  return (
    <Modal
      visible={false} // Set the visibility based on some state
      animationType="slide"
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>View SOR</Text>
          <Button title="Close" onPress={() => { /* Close the modal */ }} />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {/* Render SOR details here */}
          <TextInput style={{ marginVertical: 5 }} placeholder="Observation" editable={false} />
          <TextInput style={{ marginVertical: 5 }} placeholder="Steps Taken" editable={false} />
          <TextInput style={{ marginVertical: 5 }} placeholder="Date" editable={false} />
          <TextInput style={{ marginVertical: 5 }} placeholder="Status" editable={false} />
          {/* Display media */}
          <View style={{ marginVertical: 10 }}>
            {/* Media items go here */}
            {/* You may need to implement logic to display media */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const OpenSorsScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Open SORs</Text>
        {/* DataTable with Buttons */}
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            {/* Render your table here */}
          </View>
        </ScrollView>
      </View>
      <ViewSorModal />
    </View>
  );
};

export default OpenSorsScreen;
