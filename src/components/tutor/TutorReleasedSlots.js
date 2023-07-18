
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { Slot } from '../ui/Slot';
import { ScrollView } from 'react-native-gesture-handler';

const TutorReleasedSlots = () => {
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
            const userId = getCurrentUserUid();

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if (slotData.tutorId === userId) {
                    const slotDateTime = new Date(slotData.dateTime);
                    const currentTime = new Date();

                    if (slotDateTime > currentTime) {
                        fetchedSlots.push({
                            id: key,
                            dateTime: slotDateTime,
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
        <ScrollView>
            <View>
                <ReleasedSlots slots={slots} onCancelSlot={handleCancelSlot} />
                <Button title="Refresh" onPress={handleRefresh} />
            </View>
        </ScrollView>
    );
};

const ReleasedSlots = ({ slots, onCancelSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, padding: 8 }}>Your Released Slots:</Text>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Remove Slot'} func={onCancelSlot} user={'tutor'} />
            ))}
            <Text style={styles.endText}>You have reached the end of the list.</Text>
        </View>
    );
};

// const formatDate = (dateTime) => {
//     const options = {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//         weekday: 'short',
//         hour: 'numeric',
//         minute: 'numeric',
//     };

//     const formattedDate = dateTime.toLocaleDateString('en-US', options);
//     return formattedDate;
// };

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cancelButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    endText: {
        fontSize: 18,
        textAlign: 'center'
    },
});

export default TutorReleasedSlots;