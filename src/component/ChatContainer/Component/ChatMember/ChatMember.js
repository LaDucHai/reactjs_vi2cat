import React, { useEffect, useState } from 'react';
import './ChatMember.css';
import { StyledBadge } from '../../../../module/AvatarStyles';
import { Avatar } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import { getOnline, sendOffLine, sendOnline } from '../../../../module/RealTime';
import { AddressApp } from '../../../AddressApp/AddressApp';
import { getUser, getMyFriend, getMyFollow } from '../../../User/User';
import { storeRedux } from '../../../Chatting/Chatting';



const ChatMember = ({id}) => {

    const [ online, setOnline ] = useState();
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ avatar, setAvatar ] = useState();
    const [ newInbox, setNewInbox ] = useState();
    const [ friend, setFriend ] = useState();
    const [ follow, setFollow ] = useState();

    useEffect(() => {
        OnlineFC(id);
        OfflineFC(id);
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

    getMyFriend((res) => {
        if(res.data.includes(id)) {
            setFriend('Friend')
        }
    })

    getMyFollow((res) => {
        if(res.data.includes(id)) {
            setFollow('Follow')
        }
    })

    const JoinRoomChat = (e) => {
        e.preventDefault();
        let arrChatting = JSON.parse(localStorage.getItem('chatting')).chatting;
        if(!arrChatting.includes(id)) {
            arrChatting.push(id)
        }
        localStorage.setItem('chatting', JSON.stringify({'chatting': arrChatting}));
        storeRedux.dispatch({ type: 'chatting' })
    }

    return (
        <div className='chatMember' onClick={JoinRoomChat}>
            <a href={`${AddressApp}user${id}`} >
                <div>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant={online}
                    >
                        <Badge badgeContent={newInbox} color="secondary">
                            <Avatar alt="Remy Sharp" src={avatar} />   
                        </Badge>
                    </StyledBadge>
                    <p>{firstName + " " + lastName}</p>
                </div>
            </a>
            <div>
                <p style={{color: 'blue'}}>{friend}</p>
                <p style={{color: 'red'}}>{follow}</p>
            </div>
        </div>
    )
}

export default ChatMember;