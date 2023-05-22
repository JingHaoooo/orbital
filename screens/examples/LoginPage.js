import React, { useState } from 'react';
import { Image, View, TextInput, StyleSheet, Text, Checkbox } from 'react-native';
import { Button } from 'react-native-paper';


export function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Bypass authentication first, due to time constraints
        // Will need to authenticate using Firebase 
        navigation.navigate('Home');
        // Perform login logic here

        console.log('Email:', email);
        console.log('Password:', password);

    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.nuslogo} source={{ uri: "https://www.nus.edu.sg/images/default-source/identity-images/NUS_logo_full-horizontal.jpg" }} />
                <Text style={styles.mentorsize}>NUSmentor</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button onPress={handleLogin} style={{ backgroundColor: 'lightblue' }}>Login</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'

    },
    logoContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 50,
    },
    nuslogo: {
        width: 400,
        height: 150,
    },

    mentorsize: {
        fontSize: 60,
        paddingTop: 50,
        color: 'darkblue',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});
