import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from '../store/auth-context';
import AllSlots from '../components/AllSlots';

export default function Settings() {
  const authReactContext = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button
        onPress={authReactContext.logout}
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
