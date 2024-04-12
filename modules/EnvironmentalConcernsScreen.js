import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';

const EnvironmentalConcernsScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState('');
    const [comment, setComment] = useState('');
    const [correctiveAction, setCorrectiveAction] = useState('');
    const [status, setStatus] = useState('Pending');
    const [projectManager, setProjectManager] = useState('');
    const [auditor, setAuditor] = useState('');

    const handleSubmit = () => {
        // Perform submission logic here
        // Include your form submission code
        console.log('Form submitted');
        setModalVisible(false); // Close modal after submission
    };

    return (
        <View>
            <Text>Environmental Concern Manager</Text>

            {/* Add Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginRight: 10 }}>
                    <Text>Add Free Form</Text>
                </TouchableOpacity>
            </View>

            {/* Environmental Concerns List */}
            <ScrollView>
                {/* Render Environmental Concerns List */}
                {/* Replace this with the actual list of environmental concerns */}
                <View>
                    <Text>Environmental Concern 1</Text>
                    {/* Include other details */}
                </View>
                {/* Repeat for other concerns */}
            </ScrollView>

            {/* Modal for Adding Free Form */}
            <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View>
                    <Text>Add Free Form</Text>
                    <TextInput
                        placeholder="Type"
                        value={type}
                        onChangeText={setType}
                    />
                    <TextInput
                        placeholder="Comment"
                        value={comment}
                        onChangeText={setComment}
                        multiline
                    />
                    <TextInput
                        placeholder="Corrective Action"
                        value={correctiveAction}
                        onChangeText={setCorrectiveAction}
                        multiline
                    />
                    <TextInput
                        placeholder="Project Manager"
                        value={projectManager}
                        onChangeText={setProjectManager}
                    />
                    <TextInput
                        placeholder="Auditor"
                        value={auditor}
                        onChangeText={setAuditor}
                    />
                    <Button title="Save" onPress={handleSubmit} />
                    <Button title="Cancel" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default EnvironmentalConcernsScreen;
