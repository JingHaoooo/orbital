import {
    Pressable, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

function Module({ module, title, onPress, user }) {
    navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.modulecontainer}>
                <Text style={styles.modulesize}>
                    {module}
                    {' '}
                </Text>
                <Text style={styles.moduletitle}>{title}</Text>
                <Text style={styles.moduletitle}>{user}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Module;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
    },
    modulecontainer: {
        justifyContent: 'center',
        backgroundColor: 'orange',
        borderWidth: 1,
        borderRadius: 15,
        paddingBottom: 15, // Increase the value here
    },

    modulesize: {
        fontSize: 16,
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    moduletitle: {
        fontSize: 15,
        paddingLeft: 10,
    },
});
