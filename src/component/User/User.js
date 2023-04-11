import axios from 'axios';
import { AddressAPI } from '../AddressAPI/AddressAPI';

export const getUser = (id, callBack) => {
    const formData = new FormData();
    formData.append('id', id)
    axios.post(`${AddressAPI}getUserById`, formData)
    .then(res => {
        callBack(res);
    }).catch(err => console.error(err));
}

export const getMyFriend = (callBack) => {
    const formData = new FormData();
    formData.append('id', JSON.parse(localStorage.getItem('userLogin')).id)
    axios.post(`${AddressAPI}getMyFriend`, formData)
    .then(res => {
        callBack(res);
    }).catch(err => console.error(err));
}

export const getMyFollow = (callBack) => {
    const formData = new FormData();
    formData.append('id', JSON.parse(localStorage.getItem('userLogin')).id)
    axios.post(`${AddressAPI}getMyFollow`, formData)
    .then(res => {
        callBack(res);
    }).catch(err => console.error(err));
}