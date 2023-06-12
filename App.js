import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignupScreen from './src/screens/SignupScreen/SignupScreen';
import MainContainer from './screens/MainContainer';
import Overlay from "./components/ui/Overlay";
import firebase from 'firebase/compat';
import { AuthProvider, AuthContext } from './AuthContext';


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





// export default function App() {

//   const authContext = useContext(AuthContext);
//   const { user } = authContext;

//   return (
//     <AuthProvider>
//       <StatusBar style="dark" />
//       <NavigationContainer>
//         <Stack.Navigator>
//           {
//             user
//               ? (
//                 <Stack.Screen
//                   name="MainContainer"
//                   component={MainContainer}
//                   options={{ headerShown: false }} />
//               ) : (
//                 <Stack.Group>
//                   <Stack.Screen name="Login" component={LoginScreen} />
//                   <Stack.Screen name="Signup" component={SignupScreen} />
//                 </Stack.Group>
//               )
//           }
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }


// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const usersRef = firebase.firestore().collection('users');
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         usersRef
//           .doc(user.uid)
//           .get()
//           .then((document) => {
//             const userData = document.data();
//             setLoading(false);
//             setUser(userData);
//           })
//           .catch((error) => {
//             setLoading(false);
//           });
//       } else {
//         setLoading(false);
//       }
//     });
//   }, []);

//   if (loading) {
//     return <Overlay message={'Loading...'} />
//   }
//   return (
//     <>
//       <StatusBar style="dark" />
//       <NavigationContainer>
//         <Stack.Navigator>
//           {
//             user
//               ? (
//                 <Stack.Screen
//                   name="MainContainer"
//                   component={MainContainer}
//                   initialParams={{ extraData: user }}
//                   options={{ headerShown: false }} />
//               ) : (
//                 <Stack.Group>
//                   <Stack.Screen name="Login" component={LoginScreen} />
//                   <Stack.Screen name="Signup" component={SignupScreen} />
//                 </Stack.Group>
//               )
//           }
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }
