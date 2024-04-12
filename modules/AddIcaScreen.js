import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddIcaScreen = () => {
    const [formData, setFormData] = useState({
        observation: '',
        status: 'open',
        steps_taken: '',
        action_owner: '',
        images: [],
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        // Add your form submission logic here
        console.log(formData);
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>ICA Records</Text>

            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add A Record</Text>
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Observation</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                    placeholder="This ...."
                    value={formData.observation}
                    onChangeText={(text) => handleChange('observation', text)}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Status</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                    placeholder="open"
                    value={formData.status}
                    onChangeText={(text) => handleChange('status', text)}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Steps Taken</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                    placeholder="Steps taken"
                    multiline
                    numberOfLines={4}
                    value={formData.steps_taken}
                    onChangeText={(text) => handleChange('steps_taken', text)}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Action Owner</Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'black', padding: 8 }}
                    placeholder="Action Owner"
                    value={formData.action_owner}
                    onChangeText={(text) => handleChange('action_owner', text)}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Images</Text>
                {/* Implement image upload logic here */}
            </View>

            <TouchableOpacity
                style={{ backgroundColor: 'blue', padding: 8, borderRadius: 4, alignItems: 'center' }}
                onPress={handleSubmit}
            >
                <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddIcaScreen;
