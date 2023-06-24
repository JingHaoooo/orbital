// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';


import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const formatDate = (dateTime) => {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  };

  const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];
  const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
  const month = dateTime.toLocaleDateString('en-US', { month: 'short' });
  const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  const year = dateTime.getFullYear();
  return [day, date, month, time, year];
};

export const Slot = ({ slot }) => {
  const date = formatDate(new Date(slot.dateTime));
  return (
    <View style={styles.container} key={slot.id}>
      <View style={styles.leftContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>{date[2]}</Text>
          <Text style={styles.date}>{date[1]}</Text>
          <Text style={styles.text}>{date[4]}</Text>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>{date[0]}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.module}>{slot.module}</Text>
        <Text style={styles.time}>{date[3]}</Text>
        <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
        <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
        <Text style={styles.detailText}>Student: {slot.studentName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    padding: 8,
    height: 128,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateContainer: {
    flex: 4,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    width: windowWidth * 0.2, // Adjust the width based on window width
    height: windowWidth * 0.2, // Adjust the height based on window width
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContainer: {
    flex: 1,
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: windowWidth * 0.06, // Adjust the font size based on window width
    fontWeight: 'bold',
  },
  text: {
    fontSize: windowWidth * 0.04, // Adjust the font size based on window width
  },
  time: {
    fontSize: windowWidth * 0.04,
    color: 'blue' // Adjust the font size based on window width
  },
  module: {
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
  },
  rightContainer: {
    flex: 3,
    paddingLeft: 16,
  },
  detailText: {
    fontSize: windowWidth * 0.035, // Adjust the font size based on window width
  },
  dayText: {
    fontSize: windowWidth * 0.035, // Adjust the font size based on window width
  },
});




// const formatDate = (dateTime) => {
//     const options = {
//         day: 'numeric',
//         month: 'short',
//         year: 'numeric',
//         weekday: 'short',
//         hour: 'numeric',
//         minute: 'numeric',
//     };

//     const day = dateTime.toLocaleDateString('en-US', { weekday: 'long' }).split(',')[0];
//     // console.log(day) // Wed
//     const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
//     // console.log(date) // 28
//     const month = dateTime.toLocaleDateString('en-US', { month: 'short' });
//     // console.log(month) // Jun
//     const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
//     // console.log(time) // 2:30 PM
//     const year = dateTime.getFullYear();
//     return [day, date, month, time, year];

//     // const formattedDate = dateTime.toLocaleDateString('en-US', options);
//     // return formattedDate;
// };

// export const Slot = ({ slot }) => {
//     const date = formatDate(new Date(slot.dateTime));
//     return (
//         <View style={styles.container} key={slot.id}>


//             <View style={styles.leftContainer}>
//                 <View style={styles.dateContainer}>
//                     <Text style={styles.text}>{date[2]}</Text>
//                     <Text style={styles.date}>{date[1]}</Text>
//                     <Text style={styles.text}>{date[4]}</Text>
//                 </View>
//                 <View style={styles.dayContainer}>
//                 <Text style={styles.text}>{date[0]}</Text>
//                 </View>
//             </View>


//             <View style={styles.rightContainer}>
//             <Text style={styles.detailText}>{slot.module}</Text>
            
//             <Text style={styles.detailText}>{date[3]}</Text>
//             <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
//             <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
//             <Text style={styles.detailText}>Student: {slot.studentName}</Text>


//             </View>



//         </View>
//     );
// };


  

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#FFFFFF',
//         flexDirection: 'row',
//         borderRadius: 16,
//         marginBottom: 16,
//         padding: 8,
//         height: 128,
//     },
//     leftContainer: {
//         flex: 1,
//         flexDirection: 'column',
//         padding: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dateContainer: {
//         flex: 5,
//         backgroundColor: '#FFA500',
//         borderRadius: 10,
//         width: 72,
//         height: 72,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dayContainer: {
//         flex: 1,
//         height: 'auto', // Remove the fixed width
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
      
//     date: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
   
//     text: {
//         fontSize: 14,
//     },

//     rightContainer: {
//         flex: 3,

//     },
    
//     detailText: {
//         fontSize: 18,
 
//     },
// });


