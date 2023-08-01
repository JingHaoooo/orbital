import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from './styles';
import History from '../../../components/History';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={flex = 5}>
        <History />
      </View>
      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonLabel}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Update Modules")}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonLabel}>Update Modules</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}