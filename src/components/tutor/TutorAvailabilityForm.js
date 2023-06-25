import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectedSlots from '../SelectedSlots';
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

  // const handleDurationSelect = (duration) => {
  //   setSelectedDuration(duration.toString());
  // };

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
          {/* <TouchableOpacity
            style={styles.durationButton}
            onPress={() => handleDurationSelect(15)}
            activeOpacity={0.8}
          >
            <Text style={styles.durationButtonText}>15</Text>
          </TouchableOpacity> */}
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
        <SelectedSlots slots={slots} onReleaseSlots={handleReleaseSlots} />
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
    backgroundColor: 'orange',
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

// const TutorAvailabilityForm = ({ moduleCode }) => {
//   const [slots, setSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const [timePickerVisible, setTimePickerVisible] = useState(false);

//   const handleDateChange = (event, date) => {
//     setSelectedDate(date || selectedDate);
//   };

//   const handleTimeChange = (event, time) => {
//     setSelectedTime(time || selectedTime);
//   };

//   const handleDurationSelect = (duration) => {
//     setSelectedDuration(duration.toString());
//   };

//   const handleReleaseSlots = () => {
//     setSlots([]);
//   };

//   const addSlot = async () => {
//     const currentUserUid = getCurrentUserUid();
//     const userDetails = await fetchUserData();

//     if (selectedDate && selectedTime && selectedDuration) {
//       const dateTime = new Date(selectedDate);
//       dateTime.setHours(selectedTime.getHours());
//       dateTime.setMinutes(selectedTime.getMinutes());
//       dateTime.setSeconds(0);
//       const slot = {
//         dateTime: dateTime,
//         duration: selectedDuration,
//         taken: false,
//         module: moduleCode,
//         tutorId: currentUserUid,
//         studentId: 0,
//         tutorName: userDetails.displayName,
//         studentName: '',
//       };

//       setSlots([...slots, slot]);
//       setSelectedTime(null);
//       setSelectedDuration('');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.inputGroup}>
//         <Text> </Text>
//         <Text style={styles.label}>Select Date:</Text>
//         <TouchableOpacity style={styles.button} onPress={() => setDatePickerVisible(true)}>
//           <Text style={styles.buttonText}>{selectedDate ? selectedDate.toDateString() : 'Choose Date'}</Text>
//         </TouchableOpacity>
//         {datePickerVisible && (
//           <DateTimePicker
//             value={selectedDate || new Date()}
//             mode="date"
//             onChange={(event, date) => {
//               setDatePickerVisible(false);
//               handleDateChange(event, date);
//             }}
//             format="dd-MMM-yyyy"
//             minimumDate={new Date()}
//           />
//         )}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Select Time:</Text>
//         <TouchableOpacity style={styles.button} onPress={() => setTimePickerVisible(true)}>
//           <Text style={styles.buttonText}>{selectedTime ? selectedTime.toTimeString() : 'Choose Time'}</Text>
//         </TouchableOpacity>
//         {timePickerVisible && (
//           <DateTimePicker
//             value={selectedTime || new Date()}
//             minuteInterval={15}
//             mode="time"
//             onChange={(event, time) => {
//               setTimePickerVisible(false);
//               handleTimeChange(event, time);
//             }}
//           />
//         )}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Select Duration (in minutes):</Text>
//         <View style={styles.durationButtons}>
//           <TouchableOpacity
//             style={styles.durationButton}
//             onPress={() => handleDurationSelect(15)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.durationButtonText}>15</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.durationButton}
//             onPress={() => handleDurationSelect(30)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.durationButtonText}>30</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.durationButton}
//             onPress={() => handleDurationSelect(45)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.durationButtonText}>45</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.durationButton}
//             onPress={() => handleDurationSelect(60)}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.durationButtonText}>60</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.slotButtonContainer}>
//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={addSlot}
//           disabled={!selectedDate || !selectedTime || !selectedDuration}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.addButtonLabel}>Review Slot</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputGroup}>
//         <Text> </Text>
//         {/* <Text style={styles.label}>Selected Slot:</Text> */}
//         <SelectedSlots slots={slots} onReleaseSlots={handleReleaseSlots} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 10,
//     // fontWeight: 'bold',
//     fontSize: 20,
//   },
//   button: {
//     backgroundColor: '#e5e5e5',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   durationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   durationButton: {
//     backgroundColor: '#e5e5e5',
//     padding: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   durationButtonText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   slotButtonContainer: {
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: 'orange',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   addButtonLabel: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default TutorAvailabilityForm;



// const TutorAvailabilityForm = ({ moduleCode }) => {
//   const [slots, setSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const [timePickerVisible, setTimePickerVisible] = useState(false);

//   const handleDateChange = (event, date) => {
//     setSelectedDate(date || selectedDate);
//   };

//   const handleTimeChange = (event, time) => {
//     setSelectedTime(time || selectedTime);
//   };

//   const handleDurationSelect = (duration) => {
//     setSelectedDuration(duration.toString());
//   };

//   const handleReleaseSlots = () => {
//     setSlots([]);
//   };

//   const addSlot = async () => {
//     const currentUserUid = getCurrentUserUid();
//     const userDetails = await fetchUserData();

//     if (selectedDate && selectedTime && selectedDuration) {
//       const dateTime = new Date(selectedDate);
//       dateTime.setHours(selectedTime.getHours());
//       dateTime.setMinutes(selectedTime.getMinutes());
//       dateTime.setSeconds(0);
//       const slot = {
//         dateTime: dateTime,
//         duration: selectedDuration,
//         taken: false,
//         module: moduleCode,
//         tutorId: currentUserUid,
//         studentId: 0,
//         tutorName: userDetails.displayName,
//         studentName: '',
//       };

//       setSlots([...slots, slot]);
//       setSelectedTime(null);
//       setSelectedDuration('');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Select Date:</Text>
//         <Button
//           title={selectedDate ? selectedDate.toDateString() : 'Choose Date'}
//           onPress={() => setDatePickerVisible(true)}
//         />
//         {datePickerVisible && (
//           <DateTimePicker
//             value={selectedDate || new Date()}
//             mode="date"
//             onChange={(event, date) => {
//               setDatePickerVisible(false);
//               handleDateChange(event, date);
//             }}
//             format="dd-MMM-yyyy"
//             minimumDate={new Date()}
//           />
//         )}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Select Time:</Text>
//         <Button
//           title={selectedTime ? selectedTime.toTimeString() : 'Choose Time'}
//           onPress={() => setTimePickerVisible(true)}
//         />
//         {timePickerVisible && (
//           <DateTimePicker
//             value={selectedTime || new Date()}
//             minuteInterval={15}
//             mode="time"
//             onChange={(event, time) => {
//               setTimePickerVisible(false);
//               handleTimeChange(event, time);
//             }}
//           />
//         )}
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Select Duration (in minutes):</Text>
//         <View style={styles.durationButtons}>
//           <Button title="15" onPress={() => handleDurationSelect(15)} />
//           <Button title="30" onPress={() => handleDurationSelect(30)} />
//           <Button title="45" onPress={() => handleDurationSelect(45)} />
//           <Button title="60" onPress={() => handleDurationSelect(60)} />
//         </View>
//       </View>

//       <View style={styles.slotButtonContainer}>
//         <Button
//           title="Add Slot"
//           onPress={addSlot}
//           disabled={!selectedDate || !selectedTime || !selectedDuration}
//         />
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.label}>Selected Slots:</Text>
//         <SelectedSlots slots={slots} onReleaseSlots={handleReleaseSlots} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   durationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   slotButtonContainer: {
//     marginTop: 10,
//   },
// });

// export default TutorAvailabilityForm;





// todo: prevent overlapping slots and add ability to add multiple slot at once

// const TutorAvailabilityForm = ({ moduleCode }) => {
//   const [slots, setSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDuration, setSelectedDuration] = useState('');
//   const [datePickerVisible, setDatePickerVisible] = useState(false);
//   const [timePickerVisible, setTimePickerVisible] = useState(false);

//   const handleDateChange = (event, date) => {
//     setSelectedDate(date || selectedDate);
//   };

//   const handleTimeChange = (event, time) => {
//     setSelectedTime(time || selectedTime);
//   };

//   const handleDurationSelect = (duration) => {
//     setSelectedDuration(duration.toString());
//   };

//   const handleReleaseSlots = () => {
//     // Clear the slots by setting an empty array
//     setSlots([]);
//   };

//   const addSlot = async () => {
//     const currentUserUid = getCurrentUserUid();
//     const userDetails = await fetchUserData();
//     console.log(userDetails);
//     if (selectedDate && selectedTime && selectedDuration) {
//       const dateTime = new Date(selectedDate);
//       dateTime.setHours(selectedTime.getHours());
//       dateTime.setMinutes(selectedTime.getMinutes());
//       dateTime.setSeconds(0);
//       const slot = {
//         dateTime: dateTime,
//         duration: selectedDuration,
//         taken: false,
//         module: moduleCode,
//         tutorId: currentUserUid,
//         studentId: 0,
//         tutorName: userDetails.displayName,
//         studentName: '',
//       };

//       setSlots([...slots, slot]);
//       // setSelectedDate(null);
//       setSelectedTime(null);
//       setSelectedDuration('');
//     }
//   };

//   return (
//     <ScrollView>
//       <View>
//         <Text>Date:</Text>
//         <Button
//           title={selectedDate ? selectedDate.toDateString() : 'Select Date'}
//           onPress={() => setDatePickerVisible(true)}
//         />
//         {datePickerVisible && (
//           <DateTimePicker
//             value={selectedDate || new Date()}
//             mode="date"
//             onChange={(event, date) => {
//               setDatePickerVisible(false);
//               handleDateChange(event, date);
//             }}
//             format="dd-MMM-yyyy"
//             minimumDate={new Date()} // Restrict minimum date to current date
//           />
//         )}

//         <Text>Time (15min intervals):</Text>
//         <Button
//           title={selectedTime ? selectedTime.toTimeString() : 'Select Time'}
//           onPress={() => setTimePickerVisible(true)}
//         />
//         {timePickerVisible && (
//           <DateTimePicker
//             value={selectedTime || new Date()}
//             minuteInterval={15}
//             mode="time"
//             onChange={(event, time) => {
//               setTimePickerVisible(false);
//               handleTimeChange(event, time);
//             }}
//           />
//         )}

//         <Text>Select Duration (in minutes):</Text>
//         <View style={{ flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignContent: 'center' }}>
//           <Button title="15" onPress={() => handleDurationSelect(15)} />
//           <Button title="30" onPress={() => handleDurationSelect(30)} />
//           <Button title="45" onPress={() => handleDurationSelect(45)} />
//           <Button title="60" onPress={() => handleDurationSelect(60)} />
//         </View>

//         {slots.length === 0 && (
//           <Button title="Add Slot" onPress={addSlot} />
//         )}

//         <Text>Slot selected:</Text>
//         <SelectedSlots slots={slots} onReleaseSlots={handleReleaseSlots} />
//       </View>
//     </ScrollView>
//   );
// };

// export default TutorAvailabilityForm;
