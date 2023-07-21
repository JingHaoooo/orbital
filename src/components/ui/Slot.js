import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const formatDate = (dateTime) => {

  const day = dateTime.toLocaleDateString('en-US', { weekday: 'short' }).split(',')[0];
  const date = dateTime.toLocaleDateString('en-US', { day: 'numeric' });
  const month = dateTime.toLocaleDateString('en-US', { month: 'long' });
  const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  const year = dateTime.getFullYear();
  return [day, date, month, time, year];
};

export const Slot = ({ slot, buttonLabel, func, user }) => {
  const date = formatDate(new Date(slot.dateTime));
  return (
    <View style={styles.container} key={slot.id}>
      <View style={styles.leftContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.detailText}>{date[2]}</Text>
          <Text style={styles.date}>{date[1]}</Text>
          <Text style={styles.detailText}>{date[4]}</Text>
        </View>
        <View style={styles.dayContainer}>
          <Text style={styles.dayText}>{date[0]}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.module}>{slot.module}</Text>
        <Text style={styles.time}>{date[3]}</Text>
        <Text style={styles.detailText}>Duration: {slot.duration} minutes</Text>
        {user == 'student'
          ? <Text style={styles.detailText}>Tutor: {slot.tutorName}</Text>
          : <Text style={styles.detailText}>Student: {slot.studentName}</Text>
        }
        <TouchableOpacity onPress={() => func(slot.id)}>
          <Text style={styles.button}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.userRoleContainer, { backgroundColor: 'red' }]}>
        <Text style={styles.userRoleText}>hi</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 18,
    marginBottom: 12,
    padding: 8,
    height: 136,
    borderWidth: 2,
    borderColor: 'white', // #00BFFF  //FFA500
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 5,
    position: 'relative',
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
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
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
    fontSize: windowWidth * 0.06,
  },
  text: {
    fontSize: windowWidth * 0.04,
  },
  button: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    color: 'red'
  },
  time: {
    fontSize: windowWidth * 0.04,
    color: 'blue'
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
    fontSize: windowWidth * 0.035,
  },
  dayText: {
    fontSize: windowWidth * 0.035,
  },
  userRoleContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  userRoleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  }
});