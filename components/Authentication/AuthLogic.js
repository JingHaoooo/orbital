import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import AuthPage from './AuthPage';

function AuthLogic({ isLogin, onAuthenticate }) {

  const navigation = useNavigation();

  const [invalidCredentials, setInvalidCredentials] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    // remove whitespace around text
    email = email.trim();
    password = password.trim();

    // may want to enforce NUS email, so that this app is for NUS students and staff only
    // But some may end up entering their NUSNET passwords, which is not safe!
    const validEmail = email.includes('@');
    const validPassword = password.length >= 8;
    const equalEmails = email === confirmEmail;
    const equalPasswords = password === confirmPassword;

    if (
      !validEmail ||
      !validPassword ||
      (!isLogin && (!equalEmails || !equalPasswords))
    ) {
      Alert.alert('Failed', 'Invalid email or password!');
      setInvalidCredentials({
        // true if an attribute is invalid
        email: !validEmail,
        confirmEmail: !validEmail || !equalEmails,
        password: !validPassword,
        confirmPassword: !validPassword || !equalPasswords,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
      <KeyboardAwareScrollView>
        <View style={styles.authContent}>
          <AuthPage
            isLogin={isLogin}
            onSubmit={submitHandler}
            invalidCredentials={invalidCredentials}
          />
          <View style={styles.buttons}>
            <Button onPress={switchAuthModeHandler}>
              {isLogin
                ? 'Sign up instead'
                : 'Already have an account? Log in instead'}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
  );
}



export default AuthLogic;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 16,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
  },
  buttons: {
    marginTop: 8,
  },
});