import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const ViewIcaScreen = () => {
  const [icas, setICAs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ICAs data from API
    fetch('https://api.example.com/icas')
      .then((response) => response.json())
      .then((data) => {
        setICAs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ICAs:', error);
        setLoading(false);
      });
  }, []);

  // Render loading indicator while data is being fetched
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render ICAs list once data is fetched
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 }}>
        Immediate Collective Actions (ICAs)
      </Text>
      <FlatList
        data={icas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, marginHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Observation: {item.observation}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Assigned To: {item.action_owner}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ViewIcaScreen;
