import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddIncidentScreen = () => {
    const [incidentDescription, setIncidentDescription] = useState('');
    const [investigationStatus, setInvestigationStatus] = useState('open');
    const [incidentStatus, setIncidentStatus] = useState('no');
    const [incidentType, setIncidentType] = useState('');
    const [media, setMedia] = useState([]);

    const handleInputChange = (value, field) => {
        switch (field) {
            case 'incident_description':
                setIncidentDescription(value);
                break;
            case 'investigation_status':
                setInvestigationStatus(value);
                break;
            case 'incident_status':
                setIncidentStatus(value);
                break;
            case 'incident_type_id':
                setIncidentType(value);
                break;
            default:
                break;
        }
    };

    const handleFileUpload = (files) => {
        // Handle file upload logic
        setMedia(files);
    };

    const handleSubmit = () => {
        // Handle form submission logic
        console.log('Incident Description:', incidentDescription);
        console.log('Investigation Status:', investigationStatus);
        console.log('Incident Status:', incidentStatus);
        console.log('Incident Type:', incidentType);
        console.log('Media:', media);
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>Incident Records</Text>

            <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 16 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>Add A Record</Text>
                <View style={{ marginBottom: 16 }}>
                    <Text>Incident Description</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        multiline
                        placeholder="This ...."
                        value={incidentDescription}
                        onChangeText={(text) => handleInputChange(text, 'incident_description')}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text>Investigation Status</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Open"
                        value={investigationStatus}
                        onChangeText={(text) => handleInputChange(text, 'investigation_status')}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text>Incident Status</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Open"
                        value={incidentStatus}
                        onChangeText={(text) => handleInputChange(text, 'incident_status')}
                    />
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text>Media</Text>
                    {/* Implement file upload component */}
                    {/* <FileUpload onFileUpload={handleFileUpload} /> */}
                </View>
                <View style={{ marginBottom: 16 }}>
                    <Text>Incident Type</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
                        placeholder="Select Record Type"
                        value={incidentType}
                        onChangeText={(text) => handleInputChange(text, 'incident_type_id')}
                    />
                </View>
                <TouchableOpacity
                    style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 4, alignSelf: 'flex-start' }}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: '#fff' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddIncidentScreen;
