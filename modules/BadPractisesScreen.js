import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const BadPractisesScreen = () => {
    const [badPractices, setBadPractices] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBadPractice, setSelectedBadPractice] = useState(null);

    useEffect(() => {
        fetchBadPractices();
    }, []);

    const fetchBadPractices = async () => {
        try {
            const response = await axios.get('API_URL'); // Replace 'API_URL' with your actual API endpoint
            setBadPractices(response.data);
        } catch (error) {
            console.error('Error fetching bad practices:', error);
        }
    };

    const openModal = (badPractice) => {
        setSelectedBadPractice(badPractice);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Bad Practices</Text>
            <ScrollView>
                {badPractices.map((badPractice) => (
                    <TouchableOpacity key={badPractice.id} onPress={() => openModal(badPractice)} style={styles.badPracticeItem}>
                        <Text style={styles.badPracticeTitle}>{badPractice.observation}</Text>
                        <Text>Status: {badPractice.status === 0 ? 'Open' : 'Closed'}</Text>
                        {/* Display other details as needed */}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal for displaying bad practice details */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeading}>Bad Practice Details</Text>
                    {selectedBadPractice && (
                        <View style={styles.modalContent}>
                            <Text><Text style={styles.boldText}>Observation:</Text> {selectedBadPractice.observation}</Text>
                            <Text><Text style={styles.boldText}>Steps Taken:</Text> {selectedBadPractice.steps_taken}</Text>
                            <Text><Text style={styles.boldText}>Date:</Text> {selectedBadPractice.date}</Text>
                            <Text><Text style={styles.boldText}>Status:</Text> {selectedBadPractice.status === 0 ? 'Open' : 'Closed'}</Text>
                            {/* Display other details as needed */}
                            {/* Display images if available */}
                            {selectedBadPractice.media.length > 0 && (
                                <View style={styles.imageContainer}>
                                    {selectedBadPractice.media.map((media, index) => (
                                        <Image key={index} source={{ uri: media.original_url }} style={styles.image} />
                                    ))}
                                </View>
                            )}
                        </View>
                    )}
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    badPracticeItem: {
        marginBottom: 20,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
    },
    badPracticeTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalContent: {
        marginBottom: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginHorizontal: 10,
    },
});

export default BadPractisesScreen;
