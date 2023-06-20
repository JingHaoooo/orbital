import { View } from 'react-native';
import styles from './styles';
import StudentBookingList from '../../../components/student/StudentBookingList';
import TutorBookingList from '../../../components/tutor/TutorBookingList';

export default function BookedSlotsScreen() {
  return (
    <View style={styles.container}>
      <StudentBookingList studentId={0} />
      <TutorBookingList tutorId={0} />
    </View>
  );
}

