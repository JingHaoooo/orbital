import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from './styles';
import History from '../../../components/History';
import { ScrollView } from 'react-native-gesture-handler';

export default function Settings() {
  const authContext = useContext(AuthContext);
  const { user, loading, login, logout } = authContext;

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={flex= 5}>
        <History />
      </View>
      <View style={flex= 1}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonLabel}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

