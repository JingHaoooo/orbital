import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BookingPopup({ route, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.moduleCode}>{route.params.moduleCode}</Text>
        <Text style={styles.title}>{route.params.title}</Text>
        <Text style={styles.description}>
          What would you like to do for {route.params.moduleCode}?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.want}>
          I wish to...
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Student: New Booking', {
              moduleCode: route.params.moduleCode,
              title: route.params.title,
            })
          }
        >
          <Text style={styles.buttonText}>Book consultation slots!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Tutor: Set Availability', {
              moduleCode: route.params.moduleCode,
              title: route.params.title,
            })
          }
        >
          <Text style={styles.buttonText}>Release new consultation slots!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 16,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleCode: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30
  },
  want: {
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 18
  },
  buttonContainer: {
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#5f9ea0',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    // fontWeight: 'bold',
  },
});


// export default function BookingPopup({ route }) {
//   console.log(route.params.moduleCode);
//   return (
//     <>
//       <View style={{
//         flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange',
//       }}
//       >
//         <Text>{route.params.moduleCode}</Text>
//         <Text>{route.params.title}</Text>
//         <Text style={styles.textSize}>
//           What would you like to do for{' '}
//           {route.params.moduleCode}
//           ?
//         </Text>
//       </View>
//       <View style={styles.container}>
//         <Button
//           title="Student: Book new slot"
//           onPress={() => navigation.navigate('Student: New Booking', { moduleCode: route.params.moduleCode, title: route.params.title })}
//         />
//         <Button
//           title="Tutor: Release new slots"
//           onPress={() => navigation.navigate('Tutor: Set Availaibility', { moduleCode: route.params.moduleCode, title: route.params.title })}
//         />
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     gap: 5,
//     alignContent: 'center',
//   },
//   textSize: {
//     fontSize: 16,
//   },

// });
