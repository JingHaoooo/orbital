import { View } from 'react-native';
import TutorAvailabilityForm from '../components/TutorAvailabilityForm';
import TutorReleasedSlots from '../components/TutorReleasedSlots';

export default function SetAvailabilityScreen({ route }) {
  return (
    <View>
      <TutorAvailabilityForm moduleCode={route.params.moduleCode} />
      <TutorReleasedSlots tutorId={0} />
    </View>
  );
}
