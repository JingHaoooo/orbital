import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingList from '../components/BookingList';


const Stack = createNativeStackNavigator();

function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome, user</Text>
            <BookingList />
        </View>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
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
    // buttonContainer: {
    //     flex: 1,
    //     gap: 10,
    //     paddingTop: 5,
    // }
});
