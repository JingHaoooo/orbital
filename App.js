import { StatusBar } from 'expo-status-bar';

import { useContext } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Authentication/LoginScreen';
import Signup from './screens/Authentication/SignupScreen';
import MainContainer from './screens/MainContainer';
import AuthContextProvider, { AuthContext } from './store/auth-context';


const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const authReactContext = useContext(AuthContext);
  return <MainContainer />;
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
