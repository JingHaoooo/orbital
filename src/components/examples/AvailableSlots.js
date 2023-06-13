import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

const AvailableSlots = ({ slots }) => {
  const handleSlotSelect = (slot) => {
    // Handle the logic for when a slot is selected by the student
    console.log('Selected slot:', slot);
  };

  // Sort slots in chronological order based on date and time
  const sortedSlots = slots.sort((slotA, slotB) => {
    const dateA = new Date(slotA.date + ' ' + slotA.startTime);
    const dateB = new Date(slotB.date + ' ' + slotB.startTime);
    return dateA - dateB;
  });

  return (
    <ScrollView>
      {sortedSlots.map((slot, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>Date: {slot.date}</Text>
          <Text>Module: {slot.module}</Text>
          <Text>Time: {slot.startTime} - {slot.endTime}</Text>
          <Text>Duration: {slot.duration} minutes</Text>
          {/* <Button title="Select Slot" onPress={() => handleSlotSelect(slot)} /> */}
        </View>
      ))}
    </ScrollView>
  );
};

export default AvailableSlots;


// if (selectedModule && selectedDate && selectedTime && selectedDuration) {
//   const startDateTime = new Date(selectedDate);
//   const startDay = startDateTime.toLocaleDateString(undefined, { weekday: 'long' });
//   startDateTime.setHours(selectedTime.getHours());
//   startDateTime.setMinutes(selectedTime.getMinutes());
//   const durationMinutes = parseInt(selectedDuration, 10);
//   const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

//   const slot = {
//     module: selectedModule,
//     date: selectedDate.toISOString().split('T')[0],
//     day: startDay,
//     startTime: selectedTime.toTimeString().split(' ')[0],
//     endTime: endDateTime.toTimeString().split(' ')[0],
//     duration: selectedDuration,
//   };

