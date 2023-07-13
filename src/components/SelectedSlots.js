import React from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Slot } from './ui/Slot';

// TODO: prevent overlapping slots, prevent slots from disappearing when multiple slots are chosen
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
                <Slot key={index} slot={slot} buttonLabel={'Click To Release Slot'} func={handleReleaseSlots} user={'student'} />
            ))}
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

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonLabel: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
