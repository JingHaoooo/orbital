import { StatusBar } from 'expo-status-bar';

import { useContext } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Authentication/Login';
import Signup from './screens/Authentication/Signup';
import HomePage from './screens/HomePage';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import Booking from './screens/Booking';
import SetAvailability from './screens/SetAvailability';
import StackNavigator from './screens/StackNavigator';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const authReactContext = useContext(AuthContext);

/*  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomePage}
        options={ //expects function
          { headerRight: () => <Button onPress={authReactContext.logout}>Logout</Button> }
        } />
        <Stack.Screen 
        name='Booking page'
        component={Booking}        
        />
        <Stack.Screen 
        name='Set availability'
        component={SetAvailability}
        />
    </Stack.Navigator>
  ); */
  return (
    <>
      <StackNavigator />
    </>
  );
}

function NotAuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authReactContext = useContext(AuthContext);

  return (
    <NavigationContainer l>
      {authReactContext.isAuthenticated
        ? <AuthenticatedStack />
        : <NotAuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </KeyboardAvoidingView>
  );
}
