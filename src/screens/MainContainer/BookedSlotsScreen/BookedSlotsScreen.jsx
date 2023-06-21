import { View } from 'react-native';
import styles from './styles';
import StudentBookingList from '../../../components/student/StudentBookingList';
import TutorBookingList from '../../../components/tutor/TutorBookingList';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import TutorReleasedSlots from '../../../components/tutor/TutorReleasedSlots';
import { getCurrentUserUid } from '../../../firebase/config';

const currentUserUid = getCurrentUserUid();

export default function BookedSlotsScreen() {
  return (
    <View style={styles.container}>
      <StudentBookingList />
      <TutorBookingList  />
      <TutorReleasedSlots  />
    </View>
  );
}

