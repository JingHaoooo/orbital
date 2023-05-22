import axios from 'axios';

const API_KEY = 'AIzaSyBoKd6aC_0UlGOpEUqY8eml-VH3OLWfrmk';

// returns a Promise 
async function authenticate(mode, email, password) {
    const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
    const token = response.data.idToken;

    console.log(response.data); // for debugging
    return token;
}

export async function createUser(email, password) {
    return authenticate('signUp', email, password);
}

export async function login(email, password) {
    return authenticate('signInWithPassword', email, password);
}
