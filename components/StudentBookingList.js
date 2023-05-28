
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

// to add cancel button

const StudentBookingList = ({ studentId }) => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots.json'
            );
            const slotsData = response.data;
            console.log(slotsData);

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if (slotData.studentId === studentId && slotData.taken) {
                    fetchedSlots.push({
                        id: key,
                        dateTime: new Date(slotData.dateTime),
                        duration: slotData.duration,
                        taken: slotData.taken,
                        module: slotData.module,
                        tutorId: slotData.tutorId,
                        studentId: slotData.studentId
                    });
                }
            }

            setSlots(fetchedSlots);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleRefresh = () => {
        fetchSlots();
    };

    return (
        <View>
            <Text>Student's Booked Slots:</Text>
            <BookedSlots slots={slots} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const BookedSlots = ({ slots }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    const handleCancelSlot = async (slotId) => {
        try {

            const response = await axios.patch(
                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}/0/taken.json`,
                true
            );

            console.log('Slot canceled:', slotId);

            // fetchSlots();
        } catch (error) {
            console.error('Error canceling slot:', error);
        }
    };

    return (
        <View>
            {sortedSlots.map((slot) => (
                <View key={slot.id}>
                    <Text>
                        {formatDate(new Date(slot.dateTime))} ({slot.duration} minutes)
                    </Text>
                    {/* <TouchableOpacity onPress={() => handleCancelSlot(slot.id)}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity> */}
                </View>
            ))}
        </View>
    );
};


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
    return formattedDate;
};

export default StudentBookingList;

const styles = StyleSheet.create({
    cancelButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
});
