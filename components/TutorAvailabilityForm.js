import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TutorAvailabilityForm = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');

  const addSlot = () => {
    if (selectedDate && selectedTime && selectedDuration) {
      const slot = {
        // to fix: showing incorrect time
        // to fix: add end time
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime.toTimeString().split(' ')[0],
        duration: selectedDuration,
      };

      setSlots([...slots, slot]);
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

  const handleDurationSelect = duration => {
    if (duration === 'custom') {
      <View> 
        <TextInput
        placeholder="Enter duration"
        value={selectedDuration}
        onChangeText={duration => setSelectedDuration(duration)}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
        keyboardType="numeric"
        step="15"
      />
      </View>
      // Handle custom duration input logic
    } else {
      setSelectedDuration(duration.toString());
    }
  };



  return (
    <View>
      <Text>Select Date:</Text>
      <DateTimePicker
        value={selectedDate || new Date()}
        mode="date"
        onChange={handleDateChange}
        format="dd-MMM-yyyy"
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
      </View>

      <Button title="Add Slot" onPress={addSlot} />

      <Text>Available Slots:</Text>
      {slots.map((slot, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text>Date: {slot.date}</Text>
          <Text>Time: {slot.time}</Text>
          <Text>Duration: {slot.duration} minutes</Text>
        </View>
      ))}
    </View>
  );
};

export default TutorAvailabilityForm;
