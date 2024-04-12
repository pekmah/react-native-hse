import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';

const FirstAidCaseScreen = () => {
    const [search, setSearch] = useState('');
    const [firstAidCases, setFirstAidCases] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);

    useEffect(() => {
        // Fetch first aid cases data
        // Replace the API call with your actual fetch logic
        fetchFirstAidCases();
    }, []);

    const fetchFirstAidCases = () => {
        // Perform API call to fetch first aid cases data
        // Replace the API endpoint with your actual endpoint
        fetch('your_api_endpoint_here')
            .then(response => response.json())
            .then(data => setFirstAidCases(data))
            .catch(error => console.error('Error fetching first aid cases:', error));
    };

    const handleSearch = () => {
        // Perform search functionality
        // Replace with your search logic
    };

    const openDetailsModal = (id) => {
        // Fetch details of the selected first aid case
        // Replace with your fetch logic
        setSelectedCase(/* fetched data for the selected case */);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderFirstAidCases = () => {
        // return firstAidCases.map(case => (
        //     <TouchableOpacity key={case.id} onPress={() => openDetailsModal(case.id)}>
        //         <View>
        //             <Text>ID: {case.id}</Text>
        //             <Text>Investigation: {case.investigation_status === 'open' ? 'Open' : 'Closed'}</Text>
        //             <Text>Reporting Done: {case.incident_status === 'yes' ? 'Done' : 'Not Done'}</Text>
        //             <Text>Date: {case.incident_date}</Text>
        //             <Text>Description: {case.incident_description}</Text>
        //             {/* Add more fields as needed */}
        //         </View>
        //     </TouchableOpacity>
        // ));
    };

    return (
        <View>
            <Text>First Aid Case Manager</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'black', padding: 5 }}
                placeholder="Search observations"
                value={search}
                onChangeText={text => setSearch(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Text>Search</Text>
            </TouchableOpacity>

            <ScrollView>
                {firstAidCases.length === 0 ? (
                    <Text>No data found.</Text>
                ) : (
                    renderFirstAidCases()
                )}
            </ScrollView>

            <Modal visible={modalVisible} onRequestClose={closeModal}>
                <View>
                    <Text>First Aid Case Details</Text>
                    {selectedCase && (
                        <View>
                            <Text>Status: {selectedCase.investigation_status}</Text>
                            <Text>Steps Taken: {selectedCase.incident_status}</Text>
                            <Text>Date: {selectedCase.incident_date}</Text>
                            <Text>Description: {selectedCase.incident_description}</Text>
                            {/* Render media if available */}
                        </View>
                    )}
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        </View>
    );
};

export default FirstAidCaseScreen;
