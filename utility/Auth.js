import axios from 'axios';


const API_KEY = 'AIzaSyBoKd6aC_0UlGOpEUqY8eml-VH3OLWfrmk'

// returns a Promise 
export async function authenticate(logInMethod, email, password) {
    const response = axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:${logInMethod}?key='
        + API_KEY,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
    );
}


export async function createUser(email, password) {
    await authenticate('signUp', email, password);
}

export async function login(email, password) {
    await authenticate('signInWithPassword', email, password);
}
