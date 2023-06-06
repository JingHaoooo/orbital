import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

// to add cancel button 

const TutorBookingList = ({ tutorId }) => {
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

                if (slotData.tutorId === tutorId && slotData.taken) {
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
            <Text>Tutor's Booked Slots:</Text>
            <BookedSlots slots={slots} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const BookedSlots = ({ slots }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    return (
        <View>
            {sortedSlots.map((slot) => (
                <Text key={slot.id}>
                    {formatDate(new Date(slot.dateTime))} ({slot.duration} minutes) {slot.module}
                </Text>
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

export default TutorBookingList;
