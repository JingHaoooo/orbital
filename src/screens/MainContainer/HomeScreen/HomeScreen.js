import { View, Text } from 'react-native';
import styles from './styles';
import BookingList from '../../../components/BookingList';

function HomeScreen() {
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