import React, { useEffect, useState } from 'react';
import './ChatRoom.css';

import InforBar from '../InforBar/InforBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import OverlayChatRoom from '../OverlayChatRoom/OverlayChatRoom';

import { getOnline, sendMessage, sendOffLine, sendOnline, getMessage } from '../../../../module/RealTime';
import { getUser } from '../../../User/User';
import axios from 'axios';
import { AddressAPI } from '../../../AddressAPI/AddressAPI';
import { InforLogin } from '../../../Constant/Constant';



const ChatRoom = ({id}) => {

    const [ message, setMessage ] = useState()
    const [ messages, setMessages ] = useState([])
    const [ online, setOnline ] = useState();
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ avatar, setAvatar ] = useState();
    const [ chatRoom, setChatRoom ] = useState();

    useEffect(() => {
        OnlineFC(id);
        OfflineFC(id);
        getChatRooms(id);
    },[id])

    const OnlineFC = (id) => {
        sendOnline((idSendOnline) => {
            if(idSendOnline===id) {
                setOnline('dot')
            } else {
                setOnline('standard')
            }
        })
        getOnline(id, (idGetOnline) => {
            if(idGetOnline===id) {
                setOnline('dot')
            } else {
                setOnline('standard')
            }
        })
    }

    const OfflineFC = (id) => {
        sendOffLine((idSendOffline) => {
            if(idSendOffline===id) {
                setOnline('standard')
            } else {
                setOnline('dot')
            }
        })
    }

    getUser(id, (res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setAvatar(res.data.avatar);
    })

    const getChatRooms = (id) => {
        let formData = new FormData();
        formData.append('idSend', InforLogin.id);
        formData.append('idReceive', id);
        axios.post(`${AddressAPI}createChatRoomName`)
        .then(res => {
            formData.append('roomName', res.data);
            axios.post(`${AddressAPI}getChatRooms`, formData)
            .then(res => {
                setChatRoom(res.data.roomName);
                let formDataChatContent = new FormData();
                formDataChatContent.append('roomChat', res.data.roomName);
                axios.post(`${AddressAPI}getChatContent`, formDataChatContent)
                .then(res => {
                    setMessages(res.data)
                }).catch(err => console.error(err));
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    }

    const sendMessageFC = (e) => {
        e.preventDefault();
        sendMessage(InforLogin.id, id, message);
        setMessage('');
        sendChatContent(InforLogin.id, id, message, chatRoom);
    }

    const sendChatContent = (idSend, idReceive, chatContent, chatRoom) => {
        let formData = new FormData();
        formData.append('chatRoom', chatRoom);
        formData.append('idSend', idSend);
        formData.append('idReceive', idReceive);
        formData.append('chatContent', chatContent);
        axios.post(`${AddressAPI}sendChatContent`, formData)
        .then(res => {
            console.log(res.data);
        }).catch(err => console.error(err));
    }

    useEffect(() => {
        getMessage((idSend, idReceive, messageContent, timestamp) => {
            setMessages(prevMsg => [...prevMsg, {idSend, idReceive, messageContent, timestamp}])
        })
    },[])
    

    return (
        <div className='roomChat'>
            <InforBar id={id} online={online} firstName={firstName} lastName={lastName} avatar={avatar}/>
            <Messages id={id} messages={messages} online={online} setMessages={setMessages} avatar={avatar}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessageFC}/>
            <OverlayChatRoom />
        </div>
    )
}

export default ChatRoom;