import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BookingPopup({route}) {
  console.log(route.params.title);
  return (
    <View style={styles.container}>
      <Text> {route.params?.moduleCode} </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})