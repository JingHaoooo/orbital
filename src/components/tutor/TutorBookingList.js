import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { Slot } from '../ui/Slot';

// to add remove button 
const TutorBookingList = () => {
    const [slots, setSlots] = useState([]);
    const tutorId = getCurrentUserUid();

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
                const currentTime = new Date();

                if (slotData.tutorId === tutorId && slotData.taken) {
                    const slotDateTime = new Date(slotData.dateTime);

                    if (slotDateTime > currentTime) {
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
            <Text style={{ fontSize: 18, paddingBottom: 4 }}>Tutor's Booked Slots:</Text>
            <BookedSlots slots={slots} func={handleCancelSlot} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const BookedSlots = ({ slots, func }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Cancel Slot'} func={func} user={'tutor'} />
            ))}
        </View>
    );
};

export default TutorBookingList;