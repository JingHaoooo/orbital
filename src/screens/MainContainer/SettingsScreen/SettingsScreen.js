import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import AllSlots from '../../../components/AllSlots';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from './styles';
import { clearFirebaseCache, initializeFirebase } from '../../../firebase/config'
import { ScrollView } from 'react-native-gesture-handler';

export default function Settings() {
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

