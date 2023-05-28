import { View, Text, StyleSheet } from 'react-native';
import BookingList from '../components/BookingList';

function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.bookings}>
                <Text style={styles.welcomeText}>Welcome to NUSmentor</Text>
                <BookingList />
            </View>
        </View>
    );
}

export default HomeScreen;

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
