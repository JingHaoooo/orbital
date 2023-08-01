import { View } from 'react-native';
import TutorAvailabilityForm from '../../../components/tutor/TutorAvailabilityForm';
import 'firebase/compat/auth'; // Import the Firebase Auth module

export default function SetAvailabilityScreen({ route }) {
  return (
    <View>
      <TutorAvailabilityForm moduleCode={route.params.moduleCode} />
    </View>
  );
}