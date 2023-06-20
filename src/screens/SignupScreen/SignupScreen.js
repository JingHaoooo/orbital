import React, { useState } from 'react';
import {
  Image, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function SignupScreen({ navigation }) {
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.replace('Login');
  };

  const onRegisterPress = () => {
    const validEmail = email.includes('nus.edu.sg')
      || email.includes('@u.nus.edu')
      || email.includes('test');
    const validPassword = password.length > 7;
    const equalPasswords = password === confirmPassword;

    if (!equalPasswords) {
      alert("Passwords don't match.");
      return;
    } if (!validEmail) {
      alert('Invalid NUS email.');
      return;
    } if (!validPassword) {
      alert('Choose a password with at least 8 characters.');
      return;
    }
    console.log('valid credentials entered.');

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const { uid } = response.user;
        const data = {
          id: uid,
          email,
          userID,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            // add account successfully created overlay
            // navigation.replace('Login');
            navigation.replace('Enter Details', { userId: uid });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../NUSlogo.png')}
        />
        <Text style={styles.mentorsize}>NUSmentor</Text>
        <TextInput
          style={styles.input}
          placeholder="Student ID/ Staff ID"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setUserID(text)}
          value={userID}
          underlineColorAndroid="transparent"
          autoCapitalize="characters"
        />
        <TextInput
          style={styles.input}
          placeholder="NUS Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?
            {' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
