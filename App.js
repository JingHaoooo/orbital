import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignupScreen from './src/screens/SignupScreen/SignupScreen';
import MainContainer from './src/screens/MainContainer/MainContainer';
import { AuthProvider, AuthContext } from './utility/AuthContext';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext;

  // if (loading) {
  //   return <Overlay message={'Loading...'} />;
  // }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen
              name="MainContainer"
              component={MainContainer}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}