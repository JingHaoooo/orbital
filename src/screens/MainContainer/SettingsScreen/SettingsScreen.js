import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import AllSlots from '../../../components/AllSlots';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from './styles';

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

