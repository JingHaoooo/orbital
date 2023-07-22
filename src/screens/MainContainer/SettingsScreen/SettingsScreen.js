import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from './styles';
import History from '../../../components/History';
import { useNavigation } from '@react-navigation/native';
import EnterDetailsScreen from '../../EnterDetailsScreen/EnterDetailsScreen';

export default function Settings() {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={flex = 5}>
        <History />
      </View>
      <View style={flex = 1}>
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