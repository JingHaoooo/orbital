import { View, StyleSheet } from 'react-native';
import StudentBookingList from '../components/StudentBookingList';
import TutorBookingList from '../components/TutorBookingList';

export default function BookedSlotsScreen() {
  return (
    <View style={styles.container}>
      <StudentBookingList studentId={0} />
      <TutorBookingList tutorId={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
