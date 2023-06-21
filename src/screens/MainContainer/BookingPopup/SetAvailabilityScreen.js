import { View } from 'react-native';
import TutorAvailabilityForm from '../../../components/tutor/TutorAvailabilityForm';
import TutorReleasedSlots from '../../../components/tutor/TutorReleasedSlots';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import { getCurrentUserUid } from '../../../firebase/config';

const currentUserUid = getCurrentUserUid();

export default function SetAvailabilityScreen({ route }) {
  return (
    <View>
      <TutorAvailabilityForm moduleCode={route.params.moduleCode} />
      <TutorReleasedSlots tutorId={currentUserUid} />
    </View>
  );
}
