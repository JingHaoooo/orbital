import { View } from 'react-native';
import styles from './styles';
import StudentBookingList from '../../../components/student/StudentBookingList';
import TutorBookingList from '../../../components/tutor/TutorBookingList';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import { ScrollView } from 'react-native-gesture-handler';

export default function BookedSlotsScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <StudentBookingList />
        <TutorBookingList />
      </View>
    </ScrollView>
  );
}