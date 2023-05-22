import { KeyboardAvoidingView, Platform } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Authentication/Login';
import Signup from './screens/Authentication/Signup';
import HomePage from './screens/HomePage';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}


// working code

// import { KeyboardAvoidingView, Platform } from 'react-native';

// import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomePage from './screens/HomePage';
// import { LoginPage } from './screens/LoginPage';
// import Booking from './screens/Booking';
// import SetAvailability from './screens/SetAvailability';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={{ flex: 1 }}
//     >
//       <StatusBar style="dark" />
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Login Page" component={LoginPage} />
//           <Stack.Screen name="Home" component={HomePage} />
//           <Stack.Screen name="Booking Page" component={Booking} />
//           <Stack.Screen name="Set Availability" component={SetAvailability} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </KeyboardAvoidingView>
//   );
// }
