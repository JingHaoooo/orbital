import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BookingPopup({ route, navigation }) {
  const { moduleCode, title, user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.moduleCode}>{moduleCode}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          What would you like to do for {moduleCode}?
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.want}>
          I wish to...
        </Text>
        {user === 'STUDENT' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Student: New Booking', {
                moduleCode: moduleCode,
                title: title,
              })
            }
          >
            <Text style={styles.buttonText}>Book consultation slots!</Text>
          </TouchableOpacity>
        )}
        {user !== 'STUDENT' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('Tutor: Set Availability', {
                moduleCode: moduleCode,
                title: title,
              })
            }
          >
            <Text style={styles.buttonText}>Release new consultation slots!</Text>
          </TouchableOpacity>
        )}
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