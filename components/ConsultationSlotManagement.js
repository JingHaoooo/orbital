import React from 'react';
import { View, Text } from 'react-native';

const ConsultationSlotManagement = ({ slots }) => {
  return (
    <View>
      <Text>Consultation Slot Management:</Text>
      {slots.map((slot, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>Tutor ID: {slot.tutorId}</Text>
          <Text>Module: {slot.module}</Text>
          <Text>Date: {slot.date.toString()}</Text>
          <Text>Time: {slot.time.toString()}</Text>
          <Text>Duration: {slot.duration} minutes</Text>
        </View>
      ))}
    </View>
  );
};

export default ConsultationSlotManagement;
