import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StudentBookingForm = ({moduleCode}) => {
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

                if (!slotData.taken && (moduleCode == slotData.module)) {
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
            console.log(fetchedSlots);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleBookSlot = async (slotId) => {
        try {
            const response = await axios.patch(
                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}/0.json`,
                { taken: true }
            );
            console.log('Slot booked successfully:', response.data);
            fetchSlots();
        } catch (error) {
            console.error('Error booking slot:', error);
        }
    };


    const handleRefresh = () => {
        fetchSlots();
    };

    return (
        <View>
            <ReleasedSlots slots={slots} onBookSlot={handleBookSlot} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const ReleasedSlots = ({ slots, onBookSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    return (
        <View>
            <Text>Choose Your Slots:</Text>
            {sortedSlots.map((slot) => (
                <View key={slot.id}>
                    <Text>
                        {formatDate(new Date(slot.dateTime))} ({slot.duration} minutes)
                    </Text>
                    <TouchableOpacity onPress={() => onBookSlot(slot.id)}>
                        <Text style={styles.bookButtonText}>Book Slot</Text>
                    </TouchableOpacity>
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

const styles = StyleSheet.create({
    bookButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'center'
    },
});

export default StudentBookingForm;
