
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { Slot } from '../ui/Slot';

const StudentBookingList = () => {
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
            const studentId = getCurrentUserUid();

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0]; // Access the first element of the array

                if (slotData.studentId === studentId && slotData.taken) {
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

    const handleRefresh = () => {
        fetchSlots();
        console.log(studentId);
    };

    return (
        <View>
            <Text style={{ fontSize: 18, paddingBottom: 4 }}>Student's Booked Slots:</Text>
            <BookedSlots slots={slots} func={fetchSlots} />
            <Button title="Refresh" onPress={handleRefresh} />
        </View>
    );
};

const BookedSlots = ({ slots, func }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

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

    // return (
    //     <View>
    //         {sortedSlots.map((slot) => (
    //             <View key={slot.id}>
    //                 <Text style = {{fontWeight:'bold',}}>Module: {slot.module}</Text>
    //                 <Text>
    //                     {formatDate(new Date(slot.dateTime))} ({slot.duration} minutes)
    //                 </Text>
    //                 <Text>Tutor: {slot.tutorName} </Text>
    //                 {/* <TouchableOpacity onPress={() => handleCancelSlot(slot.id)}>
    //                      <Text style={styles.cancelButtonText}>Cancel</Text>
    //                 </TouchableOpacity> */}
    //             </View>
    //         ))}
    //     </View>
    // );  

    // return (
    //     <View>
    //         {sortedSlots.map((slot) => Slot({ slot }))}
    //     </View>
    // );

    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Cancel Slot'} func={handleCancelSlot} user={'student'} />
            ))}
        </View>
    );

    // <View>
    //   {sortedSlots.map((slot) => (
    //     <Slot slot={slot} func={handleCancelSlot} />
    //   ))}
    // </View> 
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