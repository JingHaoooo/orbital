import React, { useState, useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { AuthContext } from '../../../AuthContext';


export default function LoginScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, loading, login, logout } = authContext;


  const onFooterLinkPress = () => {
    navigation.replace('Signup');
  };

  const onLoginPress = () => {
    login(email, password);
  };
  

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../NUSlogo.png')}
        />
        <Text style={styles.mentorsize}>NUSmentor</Text>
        <TextInput
          style={styles.input}
          placeholder="NUS E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          secureTextEntry={false}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}
        >
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?
            {' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

// const onLoginPress = () => {};
// firebase
//   .auth()
//   .signInWithEmailAndPassword(email, password)
//   .then((response) => {
//     const { uid } = response.user;
//     const usersRef = firebase.firestore().collection('users');
//     usersRef
//       .doc(uid)
//       .get()
//       .then((firestoreDocument) => {
//         if (!firestoreDocument.exists) {
//           alert('User does not exist.');
//           return;
//         }
//         const user = firestoreDocument.data();
//         // navigation.navigate('MainContainer', { user });
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   })
//   .catch((error) => {
//     alert(error);
//   });
// };