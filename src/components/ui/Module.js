import {
    Pressable, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import 'firebase/compat/auth';
import { getCurrentUserUid, fetchUserData } from '../../firebase/config';


// function Module({ moduleCode, title, onPress }) {
function Module({ moduleCode }) {


    return (
        <TouchableOpacity
            style={styles.container}
        // onPress={onPress}
        >
            <View style={styles.modulecontainer}>
                <Text style={styles.modulesize}>
                    {moduleCode}
                    {' '}
                </Text>
                <Text style={styles.moduletitle}>{moduleCode}</Text>
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
        paddingBottom: 5,
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
