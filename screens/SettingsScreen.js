import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import AllSlots from '../components/AllSlots';

import { AuthContext } from '../AuthContext';



export default function Settings() {

  const authContext = useContext(AuthContext);
  const { user, loading, login, logout } = authContext;

  const handleLogout = () => {
    console.log({ user });
    logout();
  };

  return (

    <View style={styles.container}>
      <Button
        onPress={handleLogout}
        style={styles.logoutButton}
        titleStyle={styles.buttonTitle}
      >
        Logout now
      </Button>
      <View>
        <AllSlots />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    backgroundColor: 'orange',
    alignItems: 'center',
  },
});


// export default function Settings() {
//   // const { updateUser } = useContext(AuthContext);

//   const handleLogout = () => {
//     firebase.auth().signOut()
//       .then(() => {
//         // updateUser(null);
//         console.log('Logout successful');
//         // Add code to update the authentication status, e.g., navigate to login screen
//       })
//       .catch((error) => {
//         // Handle logout error
//         console.log('Logout error:', error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Button
//         onPress={handleLogout}
//         style={styles.logoutButton}
//         titleStyle={styles.buttonTitle}
//       >
//         Logout now
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoutButton: {
//     backgroundColor: 'orange',
//     alignItems: 'center',
//   },
// });
