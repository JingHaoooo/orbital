import { View } from 'react-native';
import TutorAvailabilityForm from '../components/TutorAvailabilityForm';
import TutorReleasedSlots from '../components/TutorReleasedSlots';

export default function SetAvailability() {
    return (
        <View>
            <TutorAvailabilityForm />
            <TutorReleasedSlots tutorId={0} />
        </View>
    )
}

