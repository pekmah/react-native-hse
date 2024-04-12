import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Button } from 'react-native';

const SIFCaseScreen = () => {
    const [search, setSearch] = useState('');
    const [sifs, setSifs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedSIF, setSelectedSIF] = useState(null);

    useEffect(() => {
        // Fetch SIF cases data
        fetchSIFCases();
    }, []);

    const fetchSIFCases = () => {
        // Perform API call to fetch SIF cases data
        // Replace the API endpoint with your actual endpoint
        fetch('your_api_endpoint_here')
            .then(response => response.json())
            .then(data => setSifs(data))
            .catch(error => console.error('Error fetching SIF cases:', error));
    };

    const handleSearch = () => {
        // Perform search functionality
        // Replace with your search logic
    };

    const openDetailsModal = (id) => {
        // Fetch details of the selected SIF case
        // Replace with your fetch logic
        setSelectedSIF(/* fetched data for the selected case */);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const renderSIFCases = () => {
        return sifs.map(sif => (
            <TouchableOpacity key={sif.id} onPress={() => openDetailsModal(sif.id)}>
                <View>
                    <Text>ID: {sif.id}</Text>
                    <Text>Investigation: {sif.investigation_status === 'open' ? 'Open' : 'Closed'}</Text>
                    <Text>Reporting Done: {sif.incident_status === 'yes' ? 'Done' : 'Not Done'}</Text>
                    <Text>Date: {sif.incident_date}</Text>
                    <Text>Description: {sif.incident_description}</Text>
                    {/* Add more fields as needed */}
                </View>
            </TouchableOpacity>
        ));
    };

    return (
        <View>
            <Text>SIF Case Manager</Text>
            <TextInput
                style={{ borderWidth: 1, borderColor: 'black', padding: 5 }}
                placeholder="Search Description"
                value={search}
                onChangeText={text => setSearch(text)}
            />
            <TouchableOpacity onPress={handleSearch}>
                <Text>Search</Text>
            </TouchableOpacity>

            <ScrollView>
                {sifs.length === 0 ? (
                    <Text>No data found.</Text>
                ) : (
                    renderSIFCases()
                )}
            </ScrollView>

            <Modal visible={modalVisible} onRequestClose={closeModal}>
                <View>
                    <Text>SIF Case Details</Text>
                    {selectedSIF && (
                        <View>
                            <Text>Status: {selectedSIF.investigation_status}</Text>
                            <Text>Steps Taken: {selectedSIF.incident_status}</Text>
                            <Text>Date: {selectedSIF.incident_date}</Text>
                            <Text>Description: {selectedSIF.incident_description}</Text>
                            {/* Render media if available */}
                        </View>
                    )}
                    <Button title="Close" onPress={closeModal} />
                </View>
            </Modal>
        </View>
    );
};

export default SIFCaseScreen;
