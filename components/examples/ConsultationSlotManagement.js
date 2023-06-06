

import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const BACKEND_URL =
  'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/';

const ConsultationSlotManagement = ({ slots }) => {
  const [fetchedSlots, setFetchedSlots] = useState([]);

  useEffect(() => {
    fetchSlotsFromDatabase();
  }, []);

  const fetchSlotsFromDatabase = async () => {
    try {
      const response = await axios.get(BACKEND_URL + '/slots.json');

      const fetchedData = [];
      for (const key in response.data) {
        const slotObj = {
          id: key,
          dateTime: new Date(response.data[key].dateTime),
          duration: response.data[key].duration,
        };
        fetchedData.push(slotObj);
      }

      setFetchedSlots(fetchedData);
    } catch (error) {
      console.log('Error fetching slots:', error);
    }
  };

  const sortedSlots = [...slots, ...fetchedSlots].sort(
    (a, b) => a.dateTime - b.dateTime
  );

  const saveSlotsToDatabase = async () => {
    try {
      await axios.post(BACKEND_URL + '/slots.json', slots);
      console.log('Slots saved successfully');
    } catch (error) {
      console.log('Error saving slots:', error);
    }
  };

  return (
    <View>
      {sortedSlots.map((slot, index) => (
        <Text key={index}>
          {formatDate(slot.dateTime) + ' (' + slot.duration + ' minutes)'}
        </Text>
      ))}

      <Text>---</Text>
      <Text>Actions:</Text>
      <Text>---</Text>
      <Button title='Release Slots' onPress={saveSlotsToDatabase}>Confirm Slots</Button>
      <Text onPress={fetchSlotsFromDatabase}>Fetch Slots</Text>
    </View>
  );
};

export default ConsultationSlotManagement;

const formatDate = (dateTime) => {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = dateTime.toLocaleDateString('en-US', options);
  return `${formattedDate}`;
};




