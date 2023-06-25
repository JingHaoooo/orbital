import { View } from 'react-native';
import TutorReleasedSlots from '../../components/tutor/TutorReleasedSlots';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import { getCurrentUserUid } from '../../firebase/config'

const currentUserUid = getCurrentUserUid();

export default function ReleasedSlotsScreen() {
  return (
    <View>
      <TutorReleasedSlots tutorId={currentUserUid} />
    </View>
  );
}