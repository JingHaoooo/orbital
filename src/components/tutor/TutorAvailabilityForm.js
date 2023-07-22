import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TutorSelectedSlots from './TutorSelectedSlots';
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';
import { ScrollView } from 'react-native-gesture-handler';

const TutorAvailabilityForm = ({ moduleCode }) => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedDurationButton, setSelectedDurationButton] = useState('');
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
    setSelectedDurationButton(duration.toString()); // Set the selected duration button
  };

  const handleReleaseSlots = () => {
  setSlots([]);
  };

  const addSlot = async () => {
    const currentUserUid = getCurrentUserUid();
    const userDetails = await fetchUserData();

    if (selectedDate && selectedTime && selectedDuration) {
      Alert.alert('Please confirm timing', 'Kindly make sure that the slot timings does not overlap', [
        {text: 'OK'},
      ]);
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
        studentName: '',
      };

      setSlots([...slots, slot]);
      setSelectedTime(null);
      setSelectedDuration('');
      setSelectedDurationButton('');
    }
  };

  const removeSlot = (selectedSlot) => {
    const updatedSlots = slots.filter((slot) => slot !== selectedSlot);
    setSlots(updatedSlots);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
        <Text> </Text>
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity style={styles.button} onPress={() => setDatePickerVisible(true)}>
          <Text style={styles.buttonText}>{selectedDate ? selectedDate.toDateString() : 'Choose Date'}</Text>
        </TouchableOpacity>
        {datePickerVisible && (
          <DateTimePicker
            value={selectedDate || new Date()}
            mode="date"
            onChange={(event, date) => {
              setDatePickerVisible(false);
              handleDateChange(event, date);
            }}
            format="dd-MMM-yyyy"
            minimumDate={new Date()}
          />
        )}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Time:</Text>
        <TouchableOpacity style={styles.button} onPress={() => setTimePickerVisible(true)}>
          <Text style={styles.buttonText}>{selectedTime ? selectedTime.toTimeString() : 'Choose Time'}</Text>
        </TouchableOpacity>
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
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Duration (in minutes):</Text>
        <View style={styles.durationButtons}>

          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDurationButton === '15' && { backgroundColor: 'orange' },
            ]}
            onPress={() => handleDurationSelect(15)}
            activeOpacity={0.8}
          >
            <Text style={styles.durationButtonText}>  15  </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDurationButton === '30' && { backgroundColor: 'orange' },
            ]}
            onPress={() => handleDurationSelect(30)}
            activeOpacity={0.8}
          >
            <Text style={styles.durationButtonText}>  30  </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDurationButton === '45' && { backgroundColor: 'orange' },
            ]}
            onPress={() => handleDurationSelect(45)}
            activeOpacity={0.8}
          >
            <Text style={styles.durationButtonText}>  45  </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.durationButton,
              selectedDurationButton === '60' && { backgroundColor: 'orange' },
            ]}
            onPress={() => handleDurationSelect(60)}
            activeOpacity={0.8}
          >
            <Text style={styles.durationButtonText}>  60  </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.slotButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addSlot}
          disabled={!selectedDate || !selectedTime || !selectedDuration}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonLabel}>Review Slot</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text> </Text>
        {/* <Text style={styles.label}>Selected Slot:</Text> */}
        <TutorSelectedSlots
          slots={slots}
          onReleaseSlots={handleReleaseSlots}
          onRemoveSlot={removeSlot}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  durationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationButton: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  durationButtonText: {
    fontSize: 16,
    color: '#333',
  },
  slotButtonContainer: {
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#00BFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TutorAvailabilityForm;

// {/* <View style={styles.inputGroup}>
// <Text> </Text>
// {/* <Text style={styles.label}>Selected Slot:</Text> */}
// <TutorSelectedSlots
//   slots={slots}
//   onReleaseSlots={handleReleaseSlots}
// />
// </View> */}