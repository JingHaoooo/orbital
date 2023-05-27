import { Image, Button, View, Text, StyleSheet } from 'react-native';

export default function BookingList() {
    return (
        <View style={styles.listContainer}>
            <Text style={styles.bookings}>Upcoming Bookings</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'orange',
        borderRadius: 30,
    },
    bookings: {
        fontSize: 16,
        textAlign: 'center'
    }
});
