import { View } from 'react-native';
import TutorAvailabilityForm from '../../../components/tutor/TutorAvailabilityForm';
import TutorReleasedSlots from '../../../components/tutor/TutorReleasedSlots';

export default function SetAvailabilityScreen({ route }) {
  return (
    <View>
      <TutorAvailabilityForm moduleCode={route.params.moduleCode} />
      <TutorReleasedSlots tutorId={0} />
    </View>
  );
}
