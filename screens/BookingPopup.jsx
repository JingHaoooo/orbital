import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import React from 'react';

export default function BookingPopup({ route }) {
  console.log(route.params.moduleCode);
  return (
    <>
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange',
      }}
      >
        <Text style={styles.textSize}>
          What would you like to do for{' '}
          {route.params.moduleCode}
          ?
        </Text>
      </View>
      <View style={styles.container}>
        <Button
                    // will pass in the prop containing module info.
          title="Student: Book new slot"
          onPress={() => navigation.navigate('Student: New Booking', { moduleCode: route.params.moduleCode, title: route.params.title })}
        />
        <Button
          title="Tutor: Release new slots"
          onPress={() => navigation.navigate('Tutor: Set Availaibility', { moduleCode: route.params.moduleCode, title: route.params.title })}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    alignContent: 'center',
  },
  textSize: {
    fontSize: 16,
  },
});
