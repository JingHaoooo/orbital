import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentUserUid } from '../firebase/config';
import { Slot } from './ui/Slot';
import axios from 'axios';




export default function BookingList() {
    const [slots, setSlots] = useState([]);
    const studentId = getCurrentUserUid();

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots.json'
            );
            const slotsData = response.data;
            //console.log(slotsData);
            const userID = getCurrentUserUid();

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if ((slotData.studentId === userID || slotData.tutorId === userID) && slotData.taken) {
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

    const handleRefresh = () => {
        fetchSlots();
        console.log(studentId);
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <BookedSlots slots={slots} func={fetchSlots} />
                </View>
            </View>
        </ScrollView>
    );
}

const BookedSlots = ({ slots, func }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    // to fix and add a cancel button
    const handleCancelSlot = async (slotId) => {
        try {

            const response = await axios.patch(
                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}/0.json`,
                { taken: false, studentId: 0, studentName: '' }
            );
            console.log('Slot canceled:', slotId);
            func();
        } catch (error) {
            console.error('Error canceling slot:', error);
        }
    };

    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={''} func={handleCancelSlot} user={'student'} />
            ))}
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#AAC4E5',
        borderRadius: 30,
    },

});