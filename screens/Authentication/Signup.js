import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthLogic from "../../components/Authentication/AuthLogic";
import Overlay from "../../components/ui/Overlay";
import { AuthContext } from "../../store/auth-context";
import { createUser } from "../../utility/Auth";


export default function Signup() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authReactContext = useContext(AuthContext);

    // returns a Promise 
    async function signUpHandler({ email, password }) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password); // blocking
            authReactContext.authenticate(token);
        } catch (error) {
            console.log(error);
            Alert.alert('Sign up failed. Check again')
            setIsAuthenticating(false); // authentication done
        }
    }

    if (isAuthenticating) {
        return <Overlay message={'Signing up...'} />
    }

    return <AuthLogic onAuthenticate={signUpHandler} />
}


