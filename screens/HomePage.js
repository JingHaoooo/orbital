import { Image, Button, View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingList from '../components/BookingList';


const Stack = createNativeStackNavigator();



function HomePage({ navigation }) {
    const handleBookingPress = () => {
        console.log('button pressed!');
        navigation.navigate('Booking Page');
    }
    
    const handleAvailPress = () => {
        console.log('button pressed!');
        navigation.navigate('Set Availability');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, XXX</Text>
            <BookingList />
            <View style={styles.buttonContainer}>
                <Button onPress={handleBookingPress} title='Book Now' />
                <Button onPress={handleAvailPress} title='Set Availability' />

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
        font: '',
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
        flex: 1
    }
});
