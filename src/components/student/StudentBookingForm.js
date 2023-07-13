import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import 'firebase/compat/auth';
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';
import { Slot } from '../ui/Slot';
import { ScrollView } from 'react-native-gesture-handler';

const StudentBookingForm = ({ moduleCode }) => {
    const [slots, setSlots] = useState([]);
    const currentUserUid = getCurrentUserUid();

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots.json'
            );
            const slotsData = response.data;

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                const slotDateTime = new Date(slotData.dateTime);
                const currentTime = new Date();

                if (slotDateTime > currentTime) {
                    if (!slotData.taken && (moduleCode == slotData.module)) {
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
            }

            setSlots(fetchedSlots);
            console.log(fetchedSlots);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const handleBookSlot = async (slotId) => {
        const studentDetails = await fetchUserData();
        try {
            const response = await axios.patch(
                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}/0.json`,
                { taken: true, studentId: currentUserUid, studentName: studentDetails.displayName, }
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
        <ScrollView>
            <View>
                <ReleasedSlots slots={slots} onBookSlot={handleBookSlot} />
                <Button title="Refresh" onPress={handleRefresh} />
            </View>
        </ScrollView>
    );
};

const ReleasedSlots = ({ slots, onBookSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    return (
        <View>
            <Text style={{ fontSize: 18, paddingBottom: 4 }}>Choose Your Slots:</Text>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Book Slot'} func={onBookSlot} user={'student'} />
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
