
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';




const TutorReleasedSlots = () => {
    const [slots, setSlots] = useState([]);
   // const userId= getCurrentUserUid();

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots.json'
            );
            const slotsData = response.data;
            const userId= getCurrentUserUid();
            //const userDetails = fetchUserData();
           // console.log(slotsData);

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if (slotData.tutorId === userId) {
                    fetchedSlots.push({
                        id: key,
                        dateTime: new Date(slotData.dateTime),
                        duration: slotData.duration,
                        taken: slotData.taken,
                        module: slotData.module,
                        tutorId: slotData.tutorId,
                        studentId: slotData.studentId,
                        tutorName: slotData.tutorName,
                        studentName: slotData.studentName,
                    });
                }
            }

            setSlots(fetchedSlots);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleCancelSlot = async (slotId) => {
        try {
            await axios.delete(
                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}.json`
            );
            fetchSlots();
        } catch (error) {
            console.error('Error canceling slot:', error);
        }
    };

    const handleRefresh = () => {
        fetchSlots();
    };

    return (
        <View>
            <ReleasedSlots slots={slots} onCancelSlot={handleCancelSlot} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const ReleasedSlots = ({ slots, onCancelSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    return (
        <View>
            <Text style={{paddingBottom: 5,}}>Your Released Slots:</Text>
            {sortedSlots.map((slot) => (
                <View key={slot.id} >
                    <Text style={{fontWeight: 'bold',}}>Module: {slot.module}</Text>
                    <Text>
                        {formatDate(new Date(slot.dateTime))} ({slot.duration} minutes) {slot.module}
                    </Text>
                    <TouchableOpacity
                        onPress={() => onCancelSlot(slot.id)}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
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
    cancelButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'center',
        paddingBottom: 5,
    },
});

export default TutorReleasedSlots;