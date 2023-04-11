import axios from "axios"
import { getNotifications } from "../../module/RealTime"

export const Title = () => {
    getNotifications(( idSend, idReceive, contentNotification ) => {
        let textNotification
        switch(contentNotification) {
            case 'unAgreeAddFriend':
                textNotification = 'khong dong y ket ban voi ban';
                break;
            case 'agreeAddFriend':
                textNotification = 'dong y ket ban voi ban';
                break;
            case 'sendAddFriend':
                textNotification = 'gui loi moi ket ban cho ban';
                break;
            case 'unSendAddFriend':
                textNotification = 'huy gui loi moi ket ban cho ban';
                break;
            case 'unFriend':
                textNotification = 'huy ket ban voi ban';
                break;
            default:
                break;
        };
        getUserById(idSend, textNotification);
    })
}

const getUserById = (id, textNotification) => {
    const formData  = new FormData();
    formData.append('id', id);
    axios.post('https://localhost:8000/getUserById', formData)
    .then(res => {
        document.title = `${res.data.firstName} ${res.data.lastName} ${textNotification}`
    }).catch(err => console.error(err))
}