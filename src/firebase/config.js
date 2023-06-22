import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Import the Firebase Auth module
import 'firebase/compat/firestore'; // Import the Firebase Firestore module
import { useEffect, useState } from 'react';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoKd6aC_0UlGOpEUqY8eml-VH3OLWfrmk",
  authDomain: "orbitalteamidk.firebaseapp.com",
  databaseURL: "https://orbitalteamidk-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orbitalteamidk",
  storageBucket: "orbitalteamidk.appspot.com",
  messagingSenderId: "1020188471741",
  appId: "1:1020188471741:web:67433de1883610403c62d4",
  measurementId: "G-SG8YCRNJ7N"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const getCurrentUserUid = () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return user.uid;
  }
  return null;
};



export const fetchUserData = () => {
  //const [userData, setUserData] = useState([]);

  const particulars = () => {
    const userDetails = [];
    const uid = getCurrentUserUid();
    const usersRef = firebase.firestore().collection('users');
    usersRef
      .doc(uid)
      .get()
      .then((snapshot) => {
        userDetails.push({
          userID: snapshot.data().userID,
          displayName: snapshot.data().displayName,
          email: snapshot.data().email,
          id: snapshot.data().id,
          modulesTaken: snapshot.data().modulesTaken,
          modulesTeaching: snapshot.data().modulesTeaching,
        });
        //console.log(userDetails);

      })
    return userDetails;
  };
  const userData = particulars()
   console.log('user details =>', userData);
  ;
}



export const auth = firebase.auth();
export { firebase };