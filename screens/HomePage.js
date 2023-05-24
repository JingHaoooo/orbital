import { Image, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingList from '../components/BookingList';
import { Button } from 'react-native-paper';

// navigation after log in will be done later
const Stack = createNativeStackNavigator();

function HomePage({ navigation }) {
    const handleBookingPress = () => {
        console.log('button pressed!');
        navigation.navigate('Booking page');
    }

    const handleAvailPress = () => {
        console.log('button pressed!');
        navigation.navigate('Set availability');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, XXX</Text>
            <BookingList />
            <View style={styles.buttonContainer}>
                <Button style={{backgroundColor:'lightblue',}} onPress={handleBookingPress} > Book Now </Button>
                <Button style={{backgroundColor:'lightblue',}} onPress={handleAvailPress} >Set Availability </Button>
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
        fontSize: 16,
        textAlign: 'center',

    },
    listContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: 'orange',
        borderRadius: 30
    },
    buttonContainer: {
        flex: 1,
        gap: 10,
        paddingTop: 5,
    }
});
