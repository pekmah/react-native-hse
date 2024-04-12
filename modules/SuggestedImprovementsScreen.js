import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const SuggestedImprovementsScreen = () => {
    const [search, setSearch] = useState('');
    const [improvements, setImprovements] = useState([]);

    // Mocked improvements data, replace with actual data fetching logic
    useEffect(() => {
        const mockedImprovements = [
            { id: 1, observation: 'Observation 1', steps_taken: 'Steps taken 1', date: '2024-03-26', status: 0 },
            { id: 2, observation: 'Observation 2', steps_taken: 'Steps taken 2', date: '2024-03-27', status: 1 },
        ];
        setImprovements(mockedImprovements);
    }, []);

    const handleSearch = () => {
        // Handle search logic here
    };

    const handleViewImprovement = (id) => {
        // Handle viewing improvement details
    };

    const handleEditImprovement = (id) => {
        // Handle editing improvement details
    };

    const handleDeleteImprovement = (id) => {
        // Handle deleting improvement
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>Suggested Improvements</Text>

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 8 }}
                            placeholder="Search observations"
                            value={search}
                            onChangeText={setSearch}
                        />
                        <TouchableOpacity
                            style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 4 }}
                            onPress={handleSearch}
                        >
                            <Text style={{ color: '#fff' }}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 16 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Improvements List</Text>
                        <ScrollView horizontal>
                            <View>
                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Id</Text>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Observation</Text>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Steps Taken</Text>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Date</Text>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Status</Text>
                                    <Text style={{ fontWeight: 'bold', marginRight: 16 }}>Action</Text>
                                </View>
                                {improvements.map((improvement) => (
                                    <View key={improvement.id} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8 }}>
                                        <Text style={{ marginRight: 16 }}>{improvement.id}</Text>
                                        <Text style={{ marginRight: 16 }}>{improvement.observation}</Text>
                                        <Text style={{ marginRight: 16 }}>{improvement.steps_taken}</Text>
                                        <Text style={{ marginRight: 16 }}>{improvement.date}</Text>
                                        <Text style={{ marginRight: 16 }}>{improvement.status === 0 ? 'Open' : 'Closed'}</Text>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#007bff', padding: 4, borderRadius: 4 }}
                                            onPress={() => handleViewImprovement(improvement.id)}
                                        >
                                            <Text style={{ color: '#fff', paddingHorizontal: 8 }}>View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#007bff', padding: 4, borderRadius: 4, marginLeft: 8 }}
                                            onPress={() => handleEditImprovement(improvement.id)}
                                        >
                                            <Text style={{ color: '#fff', paddingHorizontal: 8 }}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{ backgroundColor: '#dc3545', padding: 4, borderRadius: 4, marginLeft: 8 }}
                                            onPress={() => handleDeleteImprovement(improvement.id)}
                                        >
                                            <Text style={{ color: '#fff', paddingHorizontal: 8 }}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 4 }}
                            onPress={() => {}}
                        >
                            <Text style={{ color: '#fff' }}>Load More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SuggestedImprovementsScreen;
