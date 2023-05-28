import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function BookingPopup({ route }) {
    console.log(route.params.title);
    return (
        <View style={styles.container}>
            <Text> Welcome! What would you like to do for {route.params.moduleCode}? </Text>
            <Button
                // will pass in the prop containing module info. 
                title={'Student: Book new slot'}
                onPress={() => navigation.navigate('Student: New Booking')
                }
            />
            <Button
                title={'Tutor: Release new slots'}
                onPress={() => navigation.navigate('Tutor: Set Availaibility')}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})