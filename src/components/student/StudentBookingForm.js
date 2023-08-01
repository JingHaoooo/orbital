import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import 'firebase/compat/auth';
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';
import { Slot } from '../ui/Slot';

const StudentBookingForm = ({ moduleCode }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
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
            setLoading(false);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setLoading(false);
        }
    };

    const handleBookSlot = async (slotId) => {
        const studentDetails = await fetchUserData();
        Alert.alert(
            'Confirm Booking',
            'Are you sure you want to book this slot?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            const response = await axios.patch(
                                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}/0.json`,
                                {
                                    taken: true,
                                    studentId: currentUserUid,
                                    studentName: studentDetails.displayName,
                                }
                            );
                            console.log('Slot booked successfully:', response.data);
                            fetchSlots();
                        } catch (error) {
                            console.error('Error booking slot:', error);
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchSlots();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Choose Your Slots:</Text>
                    <TouchableOpacity
                        style={styles.refreshButton}
                        onPress={handleRefresh}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.refreshButtonLabel}>Refresh</Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#00BFFF" />
                ) : (
                    <>
                        <ReleasedSlots slots={slots} onBookSlot={handleBookSlot} />
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const ReleasedSlots = ({ slots, onBookSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Book Slot'} func={onBookSlot} user={'student'} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bookButtonText: {
        color: 'blue',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    container: {
        padding: 20,
    },
    refreshButton: {
        backgroundColor: '#00BFFF',
        width: '25%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    refreshButtonLabel: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },
    header: {
        fontSize: 18,
    },
});

export default StudentBookingForm;