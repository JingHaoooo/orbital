import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

function Module({ module, title, onPress, user }) {

    const getCornerColor = () => {
        if (user === 'STUDENT') {
            return '#FFA500'; // Orange color for student
        } else if (user === 'TUTOR') {
            return '#00BFFF'; // Blue color for tutor
        } else {
            return '#808080'; // Gray color for other users
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.moduleContainer, { borderColor: getCornerColor() }]}>
                <View style={[styles.userCorner, { backgroundColor: getCornerColor() }]}>
                    <Text style={styles.userCornerText}>{user}</Text>
                </View>
                <Text style={styles.moduleCode}>{module}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Module;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        width: '90%',
        alignSelf: 'center',
    },
    moduleContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFA500', // Default border color (orange)
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    moduleCode: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        marginBottom: 8,
    },
    userCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#FFA500', // Default corner color (orange)
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    userCornerText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
});