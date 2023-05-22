import { useState } from "react";

import AuthLogic from "../../components/Authentication/AuthLogic";
import { createUser } from "../../utility/Auth";


export default function Signup() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // returns a Promise 
    async function signUpHandler({ email, password }) { 
        setIsAuthenticating(true);
        await createUser(email, password); // blocking
        setIsAuthenticating(false); // authentication done
    }

    if (isAuthenticating) {
        // TODO creating user message ... 
    }
    return <AuthLogic onAuthenticate={signUpHandler} />
}


