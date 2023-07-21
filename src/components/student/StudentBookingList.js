import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { Slot } from '../ui/Slot';

const StudentBookingList = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(
                'https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots.json'
            );
            const slotsData = response.data;
            const studentId = getCurrentUserUid();

            const fetchedSlots = [];

            for (const key in slotsData) {
                const slotData = slotsData[key][0];

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
            setLoading(false);
        } catch (error) {
            console.error('Error fetching slots:', error);
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        setLoading(true);
        fetchSlots();
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Student's Booked Slots:</Text>
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
            ) : slots.length === 0 ? (
                <Text style={styles.noSlots}>No slots booked.</Text>
            ) : (
                <BookedSlots slots={slots} func={fetchSlots} />
            )}
        </View>
    );
};

const BookedSlots = ({ slots, func }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

    const handleCancelSlot = (slotId) => {
        // Show confirmation modal before canceling the slot
        Alert.alert(
            'Confirm Removal',
            'Are you sure you want to remove this slot?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
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
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot
                    key={slot.id}
                    slot={slot}
                    buttonLabel={'Cancel Slot'}
                    func={handleCancelSlot}
                    user={'student'}
                />
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
    container: {
        flex: 1,
        padding: 20,
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
    noSlots: {
        fontSize: 16,
        marginTop: 8,
        textAlign: 'center',
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
});

export default StudentBookingList;