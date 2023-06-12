import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';

import { firebase } from '../firebase/config'; // Import firebase module
import { AuthContext } from '../../AuthContext';

export default function MainContainer() {

    const authContext = useContext(AuthContext);
    const { user, loading, login, logout } = authContext;

    const handleLogout = () => {
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
    