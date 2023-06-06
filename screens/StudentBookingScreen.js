import React from 'react';
import { View } from 'react-native';
import StudentBookingForm from '../components/StudentBookingForm';

export default function StudentBookingScreen({route}) {
  return (
    <View>
      <StudentBookingForm moduleCode= {route.params.moduleCode} />
    </View>
  )
}
