import BookingList from "./BookingList";
import { Text, View, StyleSheet } from 'react-native';

export default function History() {
    return (
        <View>
            <Text style={{ fontSize: 18, padding: 8 }}>History:</Text>
            <BookingList booleanCondition={(slotTime) => slotTime < new Date()} />
        </View>
    )
}