import { View, Text } from 'react-native';
import styles from './styles';
import BookingList from '../../../components/BookingList';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.bookings}>
                <Text style={styles.welcomeText}>Welcome to NUSmentor</Text>
                <Text style={styles.bookings}>
                    This is a mobile application in progress (Milestone 2)
                    that facilitates the booking of consultations
                    between tutors and students.
                </Text>
                <Text> </Text>
                <Text> </Text>
                <Text style={styles.welcomeText}>Upcoming Bookings:</Text>
            </View>
            <BookingList />
        </View>
    );
}

export default HomeScreen;