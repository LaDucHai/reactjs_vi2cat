import React from 'react';
import './AddFriend.css';
import axios from 'axios';

import { sendNotifications } from '../../module/RealTime';

const AddFriend = ({ addFriend, sentFriend, invitatedFriend, idSend, idReceive }) => {
    
    const SendAddFriend = (idSend, idReceive) => {
        const formData = new FormData(); 
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        axios.post('https://localhost:8000/sendAddFriend', formData)
        .then(res => {
            console.log(res.data)
            sendNotifications(idSend, idReceive, res.data)
            window.location.reload(true)
        }).catch(err => console.error(err))
    }

    const UnSendAddFriend = (idSend, idReceive) => {
        const formData = new FormData(); 
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        axios.post('https://localhost:8000/unSendAddFriend', formData)
        .then(res => {
            console.log(res.data)
            sendNotifications(idSend, idReceive, res.data)
            window.location.reload(true)
        }).catch(err => console.error(err))
    }

    const UnFriend = (idSend, idReceive) => {
        const formData = new FormData(); 
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        axios.post('https://localhost:8000/unFriend', formData)
        .then(res => {
            console.log(res.data)
            sendNotifications(idSend, idReceive, res.data)
            window.location.reload(true)
        }).catch(err => console.error(err))
    }

    const AgreeAddFriend = (idSend, idReceive) => {
        const formData = new FormData(); 
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        axios.post('https://localhost:8000/agreeAddFriend', formData)
        .then(res => {
            console.log(res.data)
            sendNotifications(idSend, idReceive, res.data)
            window.location.reload(true)
        }).catch(err => console.error(err))
    }

    const UnAgreeAddFriend = (idSend, idReceive) => {
        const formData = new FormData(); 
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        axios.post('https://localhost:8000/unAgreeAddFriend', formData)
        .then(res => {
            console.log(res.data)
            sendNotifications(idSend, idReceive, res.data)
            window.location.reload(true)
        }).catch(err => console.error(err))
    }

    return (
        addFriend 
        ? (
            <div className='addFriend'> 
                <button onClick={() => UnFriend(idSend, idReceive)}>UnFriend</button>
            </div>
        ) : (
            sentFriend 
            ? (
                <div className='addFriend'> 
                    <button onClick={() => UnSendAddFriend(idSend, idReceive)}>UnSentFriend</button>
                </div>
            ) : (
                invitatedFriend 
                ? (
                    <div className='addFriend'> 
                        <button onClick={() => AgreeAddFriend(idSend, idReceive)}>AddFriend</button>
                        <button onClick={() => UnAgreeAddFriend(idSend, idReceive)}>Cancel</button>
                    </div>
                ) : (
                    <div className='addFriend'>
                        <button onClick={() => SendAddFriend(idSend, idReceive)}>Send AddFriend</button>
                    </div>
                )
            )
        )
        
    )
}

export default AddFriend;