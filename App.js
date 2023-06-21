import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignupScreen from './src/screens/SignupScreen/SignupScreen';
import EnterDetailsScreen from './src/screens/EnterDetailsScreen/EnterDetailsScreen'
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
              <Stack.Screen name="Enter Details" component={EnterDetailsScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
