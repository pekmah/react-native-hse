import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const GoodPractices = () => {
    const [search, setSearch] = useState('');
    const [goodPractices, setGoodPractices] = useState([]);

    const handleSearch = () => {
        // Handle search logic here
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 16 }}>Good Practices</Text>

                {/* Search input field */}
                <View style={{ marginBottom: 24 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            style={{ flex: 1, marginRight: 16, borderWidth: 1, borderColor: '#ccc', padding: 8 }}
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
                </View>

                {/* DataTable with Buttons */}
                <View style={{ borderWidth: 1, borderColor: '#ccc' }}>
                    {/* Table Header */}
                    <View style={{ flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 8 }}>
                        <Text style={{ flex: 1, fontWeight: 'bold' }}>Id</Text>
                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Observation</Text>
                        <Text style={{ flex: 2, fontWeight: 'bold' }}>Steps Taken</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold' }}>Date</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold' }}>Status</Text>
                        <Text style={{ flex: 1, fontWeight: 'bold' }}>Action</Text>
                    </View>

                    {/* Table Body */}
                    {goodPractices.length === 0 ? (
                        <Text style={{ padding: 16 }}>No data found.</Text>
                    ) : (
                        goodPractices.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', padding: 8 }}>
                                <Text style={{ flex: 1 }}>{item.id}</Text>
                                <Text style={{ flex: 2 }}>{item.observation}</Text>
                                <Text style={{ flex: 2 }}>{item.steps_taken}</Text>
                                <Text style={{ flex: 1 }}>{item.date}</Text>
                                <Text style={{ flex: 1 }}>{item.status === 0 ? 'Open' : 'Closed'}</Text>
                                <TouchableOpacity
                                    style={{ flex: 1, backgroundColor: '#007bff', padding: 8, borderRadius: 4 }}
                                    onPress={() => console.log('Action button pressed')}
                                >
                                    <Text style={{ color: '#fff', textAlign: 'center' }}>Action</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default GoodPractices;
