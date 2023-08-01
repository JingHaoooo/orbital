import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Slot } from '../ui/Slot';

const TutorSelectedSlots = ({ slots, onReleaseSlots, onRemoveSlot }) => {

    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    const BACKEND_URL =
        'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/';

    const handleReleaseSlots = async () => {
        try {
            const slotArrays = sortedSlots.map((slot) => [slot]);
            await Promise.all(
                slotArrays.map(async (slot) => {
                    const response = await axios.post(BACKEND_URL + 'slots.json', slot);
                    console.log('Slot stored in Firebase:', response.data);
                })
            );
            onReleaseSlots();
        } catch (error) {
            console.error('Error storing slots:', error);
        }
    };

    // Use this after changing slots from an object in an array - to just a slot object
    // const handleReleaseSlots = async () => {
    //     try {
    //         await Promise.all(
    //             sortedSlots.map(async (slot) => {
    //                 const response = await axios.post(BACKEND_URL + 'slots.json', slot);
    //                 console.log('Slot stored in Firebase:', response.data);
    //             })
    //         );
    //         onReleaseSlots();
    //     } catch (error) {
    //         console.error('Error storing slots:', error);
    //     }
    // };

    return (
        <View>
            {sortedSlots.map((slot, index) => (
                <Slot
                    key={index}
                    slot={slot}
                    buttonLabel={'Remove'}
                    func={() => onRemoveSlot(slot)}
                    user={'student'}
                />
            ))}
            {/* <TouchableOpacity
                style={styles.addButton}
                onPress={handleReleaseSlots}
                activeOpacity={0.8}
            >
                <Text style={styles.addButtonLabel}>Release Slots</Text>
            </TouchableOpacity> */}
            {sortedSlots.length > 0 ? (
                <TouchableOpacity style={styles.addButton} onPress={handleReleaseSlots}>
                    <Text style={styles.addButtonLabel}>Release Slots</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

export default TutorSelectedSlots;

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