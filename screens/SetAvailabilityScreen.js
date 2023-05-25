import { View, Text, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';
import TutorAvailabilityForm from '../components/TutorAvailabilityForm';


export default function SetAvailability() {
    return (
        <View>
            <TutorAvailabilityForm />
        </View>
    )
}


{/* <Text>
Select new date
</Text>

<View style={styles.calendarContainer}>
<Calendar minDate={new Date()} style={{
    borderWidth: 1,
    borderColor: 'gray',
    height: 350
}}

    // Callback that gets called when the user selects a day
    onDayPress={day => {
        console.log('selected day', day);
    }} 
    view='month'
    />
</View> */}