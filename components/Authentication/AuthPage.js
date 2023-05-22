import { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';

import Input from './Input';


function AuthPage({ isLogin, onSubmit, invalidCredentials }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  // destructuring
  const {
    email: invalidEmail,
    confirmEmail: emailsDontMatch,
    password: invalidPassword,
    confirmPassword: passwordsDontMatch,
  } = invalidCredentials;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'confirmEmail':
        setEnteredConfirmEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View style={styles.logoContainer}>
        <Image style={styles.nuslogo} source={require('./NUSlogo.png')} />
        <Text style={styles.mentorsize}>NUSmentor</Text>
      </View>
      <View>
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={invalidEmail}
        />
        {!isLogin && ( // only happens during sign up
          <Input
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, 'confirmEmail')}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={invalidPassword}
        />
        {!isLogin && ( // only happens during sign up
          <Input
            label="Confirm Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            <Text style={styles.text}> {isLogin ? 'Log In' : 'Sign Up'} </Text>

          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthPage;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    borderRadius: 10
  },
  nuslogo: {
    width: 400,
    height: 150,
    marginBottom: 30
  },
  mentorsize: {
    fontSize: 50,
    paddingTop: 10,
    color: 'darkblue',
    textAlign: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 10,
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 20,
  }

});