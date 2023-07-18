import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { getCurrentUserUid } from '../../firebase/config';
import { AuthContext } from '../../../utility/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import Bubble from '../../components/ui/Bubble';
import { useRoute } from '@react-navigation/native';

export default function EnterDetailsScreen() {
  const { user } = useContext(AuthContext);
  const userId = getCurrentUserUid();
  const navigation = useNavigation();
  const route = useRoute();

  const [displayName, setDisplayName] = useState('');
  const [modulesTaken, setModulesTaken] = useState([]);
  const [modulesTeaching, setModulesTeaching] = useState([]);

  useEffect(() => {
    if (user.displayName !== '') {
      navigation.replace('MainContainer');
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
        navigation.replace('MainContainer');
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
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          underlineColorAndroid="transparent"
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={26}
        />

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