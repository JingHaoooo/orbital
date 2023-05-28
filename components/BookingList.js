import { Image, Button, View, Text, StyleSheet } from 'react-native';
import StudentBookingList from './StudentBookingList';
import TutorBookingList from './TutorBookingList';

export default function BookingList() {
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Text style={styles.bookings}>
                    This is a mobile application in progress (Milestone 1)
                    that facilitates the booking of consultations
                    between tutors and students.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'orange',
        borderRadius: 30,
    },
    bookings: {
        fontSize: 16,
        textAlign: 'left'
    }
});

