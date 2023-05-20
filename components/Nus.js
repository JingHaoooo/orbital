import React, { useState } from 'react';
import { Image, View, TextInput, StyleSheet, Text, Checkbox } from 'react-native';
import { Button, } from 'react-native-paper';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.nuslogo} source={{ uri: "https://www.nus.edu.sg/images/default-source/identity-images/NUS_logo_full-horizontal.jpg" }} />
                <Text style={styles.mentorsize}>Nusmentor</Text>
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
        
    },
    logoContainer: {
        alignItems:'center',
        flexDirection: 'column',
        paddingBottom: 50,
    },
    nuslogo: {
        width: 400,
        height: 150,
    },

    mentorsize: {
        fontSize: 70,
        paddingTop:50,
        color:'darkblue',
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

