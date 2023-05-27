import React from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const SelectedSlots = ({ slots, onReleaseSlots }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    const BACKEND_URL =
        'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/';

    const handleReleaseSlots = async () => {
        try {
            const response = await axios.post(
                BACKEND_URL + 'slots.json',
                sortedSlots
            );
            console.log('Slots stored in Firebase:', response.data);

            onReleaseSlots();

        } catch (error) {
            console.error('Error storing slots:', error);
        }
    };


    return (
        <View>
            {sortedSlots.map((slot, index) => (
                <Text key={index}>
                    {formatDate(slot.dateTime) + ' (' + slot.duration + ' minutes)'}
                </Text>
            ))}
            <Button title="Release Slots" onPress={handleReleaseSlots} />
        </View>
    );
};

export default SelectedSlots;

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
