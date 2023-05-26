import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import AuthContextProvider, { AuthContext } from '../store/auth-context'
import { useContext } from 'react'

const Logout = () => {
    const authReactContext = useContext(AuthContext);
    return (
        <View style={styles.container} >
            <Button 
            onPress={authReactContext.logout} 
            style={styles.logoutButton} 
            titleStyle={styles.buttonTitle}>
            Logout now
            </Button>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },

    logoutButton: {
        backgroundColor:'orange',
        alignItems:'center',
    },
    
})