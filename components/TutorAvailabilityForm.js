import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ConsultationSlotManagement from './ConsultationSlotManagement';

const TutorAvailabilityForm = () => {
  
  const [slots, setSlots] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');

  const addSlot = () => {
    if (selectedTutorId && selectedModule && selectedDate && selectedTime && selectedDuration) {
      const slot = {
        tutorId: selectedTutorId,
        module: selectedModule,
        date: selectedDate,
        time: selectedTime,
        duration: selectedDuration,
      };

      setSlots([...slots, slot]);

      setSelectedTutorId('');
      setSelectedModule('');
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedDuration('');
    }
  };

  const handleDateChange = (event, date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event, time) => {
    setSelectedTime(time);
  };

  const handleDurationSelect = (duration) => {
    if (duration === 'custom') {
      // Handle custom duration input logic
      <TextInput
        value={selectedTutorId}
        onChangeText={setSelectedTutorId}
        placeholder="Enter tutor ID"
      />
    } else {
      setSelectedDuration(duration.toString());
    }
  };

  return (
    <View>
      <Text>Enter Tutor ID:</Text>
      <TextInput
        value={selectedTutorId}
        onChangeText={setSelectedTutorId}
        placeholder="Enter tutor ID"
      />

      <Text>Select Module:</Text>
      <TextInput
        value={selectedModule}
        onChangeText={setSelectedModule}
        placeholder="Enter module name"
      />

      <Text>Select Date:</Text>
      <DateTimePicker
        value={selectedDate || new Date()}
        mode="date"
        onChange={handleDateChange}
        format="dd-MMM-yyyy"
        minimumDate={new Date()} // Restrict minimum date to current date
      />

      <Text>Select Time:</Text>
      <DateTimePicker
        value={selectedTime || new Date()}
        minuteInterval={15}
        mode="time"
        onChange={handleTimeChange}
      />

      <Text>Select Duration (in minutes):</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <Button title="15" onPress={() => handleDurationSelect(15)} />
        <Button title="30" onPress={() => handleDurationSelect(30)} />
        <Button title="45" onPress={() => handleDurationSelect(45)} />
        <Button title="60" onPress={() => handleDurationSelect(60)} />
        <Button title="Custom" onPress={() => handleDurationSelect('custom')} />
      </View>

      <Button title="Add Slot" onPress={addSlot} />

      <Text>Your Slots:</Text>
      <ConsultationSlotManagement slots={slots} />
    </View>
  );
};

export default TutorAvailabilityForm;

