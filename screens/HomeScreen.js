import { View, Text, StyleSheet } from 'react-native';
import BookingList from '../components/BookingList';

function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.bookings}>
                <Text style={styles.welcomeText}>Welcome, user</Text>
                <BookingList />
            </View>
        </View>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    welcomeText: {
        fontSize: 20,
        paddingBottom: 16,
        textAlign: 'left'

    },
    bookings: {
        flex: 0.6,
    }
});
