/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';

import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignupScreen from './src/screens/SignupScreen/SignupScreen';
import MainContainer from './screens/MainContainer';
import { firebase } from './src/firebase/config';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    // eslint-disable-next-line no-shadow
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          // eslint-disable-next-line no-unused-vars
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {
            user
              ? (
                <Stack.Screen name="Home" component={MainContainer} initialParams={{ extraData: user }} options={{ headerShown: false }} />
              ) : (
                <Stack.Group>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Group>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

// working code (axios):
// const Stack = createNativeStackNavigator();

// function AuthenticatedStack() {
//   const authReactContext = useContext(AuthContext);
//   return <MainContainer />;
// }

// function NotAuthenticatedStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="Signup" component={Signup} />
//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   const authReactContext = useContext(AuthContext);
//   return (
//     <NavigationContainer l>
//       {authReactContext.isAuthenticated
//         ? <AuthenticatedStack />
//         : <NotAuthenticatedStack />}
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <StatusBar style="dark" />
//       <AuthContextProvider>
//         <Navigation />
//       </AuthContextProvider>
//     </KeyboardAvoidingView>
//   );
// }
