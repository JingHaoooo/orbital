import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AuthContextProvider, { AuthContext } from '../store/auth-context';


export default function Settings() {
    const authReactContext = useContext(AuthContext);
    return (
        <View>
            <Text>
                <Button onPress={authReactContext.logout}>Logout</Button>
            </Text>
        </View>
    )
}

    // buttonContainer: {
    //     flex: 1,
    //     gap: 10,
    //     paddingTop: 5,
    // }


