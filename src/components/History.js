import { ScrollView } from "react-native-gesture-handler";
import BookingList from "./BookingList";
import { Text, View } from 'react-native';

export default function History() {
    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 18, padding: 8 }}>History:</Text>
                <BookingList booleanCondition={(slotTime) => slotTime < new Date()} />
            </View>
        </ScrollView>
    )
}