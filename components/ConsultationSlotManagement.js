import React from 'react';
import { View, Text } from 'react-native';


const ConsultationSlotManagement = ({ slots }) => {
  const sortedSlots = slots.sort((a, b) => a.dateTime - b.dateTime);

  return (
    <View>
      {sortedSlots.map((slot, index) => (
        <Text key={index}>{formatDate(slot.dateTime) + ' (' + slot.duration + ' minutes)'}</Text>
      ))}
    </View>
  );
};

export default ConsultationSlotManagement;

const formatDate = (dateTime) => {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  const formattedDate = dateTime.toLocaleDateString('en-US', options);
  return `${formattedDate}`;
};



