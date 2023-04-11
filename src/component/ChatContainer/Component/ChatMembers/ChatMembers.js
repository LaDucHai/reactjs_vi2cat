import React from 'react';
import './ChatMembers.css';
import ChatMember from '../ChatMember/ChatMember';

const ChatMembers = ({usersOfChatContainer}) => {

    let chatMembers = usersOfChatContainer.map((data, index) => {
        return (
            <div key={index}>
                <ChatMember id={data}/>
            </div>
        )
    })

    return (
        localStorage.getItem('login')==='false'
        ? (
           <div>Vui long dang nhap</div>
        ) : (
            usersOfChatContainer.length===0
            ? (
                <div>Hay ket ban de nhan tin</div>
            ) : (
                <div className='chatMembers'>
                    {chatMembers}
                </div>
            )
        )
    )
}

export default ChatMembers;