//import { BehaviorSubject } from 'rxjs';
//import config from '../helpers/config';
import { user } from '../helpers/users';
//import axios from 'axios';
let item;
/*if (typeof window !== 'undefined') {
    item = localStorage.getItem('currentUser')
}*/

//const currentUserSubject = new BehaviorSubject(item);
//url til apien
//const url = config.baseURL + config.path;
//håndterer login kaldet
const login = async (data, setMessage) => {
    console.log(data)
    const login = user.users.filter(u => {
        console.log(u);
        data.email === u.email
    })
    console.log(login)
    setMessage(login)
    return login
    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
    let res;

    await axios(`${url}login`, requestOptions).then(response => {
        res = response.data
        return res
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            console.log(res)
            throw res;
        } else if (error.request) {
            console.log(error.request + ' request')
            res = error.request;
            throw res
        } else {
            console.log(error + ' else')
            res = error.message;
            throw res
        }
    }).finally(() => {
        localStorage.setItem('currentUser', res);
        currentUserSubject.next(res);
        setMessage(res)
        console.log(res, 'ting')
        return res
    });*/

}

export const authentication = {
    login,
    logout,
    /*currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }*/
};

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}