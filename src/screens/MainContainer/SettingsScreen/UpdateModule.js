import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import { getCurrentUserUid, firebase } from '../../../firebase/config';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../../../../utility/AuthContext';
import styles from '../../../screens/EnterDetailsScreen/styles'
import { ScrollView } from 'react-native-gesture-handler';
import Bubble from '../../../components/ui/Bubble';

export default UpdateModule = () => {
  const { user } = useContext(AuthContext);
  const userId = getCurrentUserUid();
  const navigation = useNavigation();
  const route = useRoute();

  const [displayName, setDisplayName] = useState('');
  const [modulesTaken, setModulesTaken] = useState([]);
  const [modulesTeaching, setModulesTeaching] = useState([]);

  useEffect(() => {
    if (user.displayName !== '') {
      //navigation.replace('History');
    }

    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.displayName) {
            setDisplayName(userData.displayName);
          }
          if (userData.modulesTaken) {
            setModulesTaken(userData.modulesTaken);
          }
          if (userData.modulesTeaching) {
            setModulesTeaching(userData.modulesTeaching);
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    if (route.params) {
      const { selectedModules, user } = route.params;
      // selectedModules cannot be null
      if (selectedModules) {
        // Check whether the modules are for modulesTaken or modulesTeaching
        if (user == 'Student') {
          setModulesTaken(selectedModules);
        } else if (user == 'Tutor') {
          setModulesTeaching(selectedModules);
        }
      }
    }
  }, [route.params]);

  const onSaveDetailsPress = () => {
    const data = {
      displayName,
      modulesTaken,
      modulesTeaching
    };

    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(userId)
      .update(data)
      .then(() => {
        navigation.replace('History');
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>
          Let us know the modules you are taking and/or teaching this semester!
        </Text>

        <View style={styles.dropdownContainer1}>
          <Text style={styles.text}>Which modules are you taking this semester?</Text>
          <View style={styles.moduleBubbleContainer}>
            {modulesTaken.map((mod) => (
              <Bubble key={mod} moduleCode={mod} />
            ))}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Add Module', {
                currModules: modulesTaken,
                user: 'Student'
              })
            }}>
            <Text style={styles.buttonLabel}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownContainer2}>
          <Text style={styles.text}>Which modules are you teaching this semester?</Text>
          <View style={styles.moduleBubbleContainer}>
            {modulesTeaching.map((mod) => (
              <Bubble key={mod} moduleCode={mod} />
            ))}
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('Add Module', {
                currModules: modulesTeaching,
                user: 'Tutor'
              })
            }}>
            <Text style={styles.buttonLabel}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={onSaveDetailsPress}>
          <Text style={styles.buttonTitle}>Update Details</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}


