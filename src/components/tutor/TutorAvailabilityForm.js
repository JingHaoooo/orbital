import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectedSlots from '../SelectedSlots';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';

// todo: prevent overlapping slots and add ability to add multiple slot at once

const TutorAvailabilityForm = ({ moduleCode }) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  



  const handleDateChange = (event, date) => {
    setSelectedDate(date || selectedDate);
  };

  const handleTimeChange = (event, time) => {
    setSelectedTime(time || selectedTime);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration.toString());
  };

  const handleReleaseSlots = () => {
    // Clear the slots by setting an empty array
    setSlots([]);
  };

  const addSlot = async() => {
    const currentUserUid = getCurrentUserUid();
    const userDetails = await fetchUserData();
    console.log(userDetails);
    if (selectedDate && selectedTime && selectedDuration) {
      const dateTime = new Date(selectedDate);
      dateTime.setHours(selectedTime.getHours());
      dateTime.setMinutes(selectedTime.getMinutes());
      dateTime.setSeconds(0);
      const slot = {
        dateTime: dateTime,
        duration: selectedDuration,
        taken: false,
        module: moduleCode,
        tutorId: currentUserUid,
        studentId: 0,
        tutorName: userDetails.displayName,
        studentName: 0,
      };

      setSlots([...slots, slot]);
      // setSelectedDate(null);
      setSelectedTime(null);
      setSelectedDuration('');
    }
  };

  return (
    <View>
      <Text>Date:</Text>
      <Button
        title={selectedDate ? selectedDate.toDateString() : 'Select Date'}
        onPress={() => setDatePickerVisible(true)}
      />
      {datePickerVisible && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setDatePickerVisible(false);
            handleDateChange(event, date);
          }}
          format="dd-MMM-yyyy"
          minimumDate={new Date()} // Restrict minimum date to current date
        />
      )}

      <Text>Time (15min intervals):</Text>
      <Button
        title={selectedTime ? selectedTime.toTimeString() : 'Select Time'}
        onPress={() => setTimePickerVisible(true)}
      />
      {timePickerVisible && (
        <DateTimePicker
          value={selectedTime || new Date()}
          minuteInterval={15}
          mode="time"
          onChange={(event, time) => {
            setTimePickerVisible(false);
            handleTimeChange(event, time);
          }}
        />
      )}

      <Text>Select Duration (in minutes):</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignContent: 'center' }}>
        <Button title="15" onPress={() => handleDurationSelect(15)} />
        <Button title="30" onPress={() => handleDurationSelect(30)} />
        <Button title="45" onPress={() => handleDurationSelect(45)} />
        <Button title="60" onPress={() => handleDurationSelect(60)} />
      </View>

      {slots.length === 0 && (
        <Button title="Add Slot" onPress={addSlot} />
      )}

      <Text>Slot selected:</Text>
      <SelectedSlots slots={slots} onReleaseSlots={handleReleaseSlots} />
    </View>
  );
};

export default TutorAvailabilityForm;
