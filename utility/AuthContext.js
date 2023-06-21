import React, { createContext, useEffect, useState } from 'react';
import { firebase } from '../src/firebase/config';

export const AuthContext = createContext({
    user: null,
    loading: false,
    login: () => { },
    logout: () => { }
});

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to handle user login
    const login = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const { uid } = response.user;
                const usersRef = firebase.firestore().collection('users');
                usersRef
                    .doc(uid)
                    .get()
                    .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                            alert('User does not exist.');
                            return;
                        }
                        const userData = firestoreDocument.data();
                        setUser(userData);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setUser(null);
                        setLoading(false);
                        alert(error);
                    });
            })
            .catch((error) => {
                setUser(null);
                setLoading(false);
                alert(error);
            });
    };
    
    // Function to handle user logout
    const logout = async () => {
        try {
            await firebase
                .auth()
                .signOut()
            setUser(null);
            setLoading(false);
            console.log('loggedout')
        } catch (error) {
            alert('Logout error:', error);
        }
    };


    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(authUser.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setUser(userData);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(null);
                        setLoading(false);
                    });
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);


    // Listen for authentication state changes
    // firebase.auth().onAuthStateChanged((authUser) => {
    //     if (authUser) {
    //         firebase.firestore().collection('users').doc(authUser.uid).get()
    //             .then((document) => {
    //                 const userData = document.data();
    //                 setUser(userData);
    //                 setLoading(false);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //                 setUser(null);
    //                 setLoading(false);
    //             });
    //     } else {
    //         setUser(null);
    //         setLoading(false);
    //     }
    // });

    // Provide the authentication context values
    const authContextValues = {
        user: user,
        loading: loading,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={authContextValues}>
            {children}
        </AuthContext.Provider>
    );
};