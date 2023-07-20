import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { getCurrentUserUid } from '../../firebase/config';
import { Slot } from '../ui/Slot';
import { ScrollView } from 'react-native-gesture-handler';

const TutorReleasedSlots = () => {
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
            setLoading(false); // Hide loading indicator when data is fetched
        } catch (error) {
            console.error('Error fetching slots:', error);
            setLoading(false); // Hide loading indicator in case of an error
        }
    };

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
                            setLoading(true); // Show loading indicator

                            await axios.delete(
                                `https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app/slots/${slotId}.json`
                            );

                            fetchSlots();
                            setLoading(false); // Hide loading indicator once the request is completed
                        } catch (error) {
                            console.error('Error removing slot:', error);
                            setLoading(false); // Hide loading indicator in case of an error
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleRefresh = () => {
        setLoading(true); // Show loading indicator when refreshing
        fetchSlots();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Your Released Slots:</Text>
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
                <ReleasedSlots slots={slots} onCancelSlot={handleCancelSlot} />
            )}
        </ScrollView>
    );
};


const ReleasedSlots = ({ slots, onCancelSlot }) => {
    const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);
    return (
        <View>
            {sortedSlots.map((slot) => (
                <Slot key={slot.id} slot={slot} buttonLabel={'Remove Slot'} func={onCancelSlot} user={'tutor'} />
            ))}
            <Text style={styles.endText}>You have reached the end of the list.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16
    },
    header: {
        fontSize: 18,
    },
    endText: {
        fontSize: 18,
        textAlign: 'center'
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

export default TutorReleasedSlots;