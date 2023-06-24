import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentUserUid } from '../firebase/config';
import axios from 'axios';
import { HomePageSlot } from './ui/HomePageSlot';

export default function BookingList() {
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
            const userID = getCurrentUserUid();
            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if ((slotData.tutorId === userID) && slotData.taken) {
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
                        userRole: 'Tutor'
                    });
                } else if ((slotData.studentId === userID) && slotData.taken) {
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
                        userRole: 'Student'
                    });
                }
            }

            setSlots(fetchedSlots);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    {sortedSlots.map((slot) => (
                        <HomePageSlot key={slot.id} slot={slot} userRole={slot.userRole} />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 30,
    },
});