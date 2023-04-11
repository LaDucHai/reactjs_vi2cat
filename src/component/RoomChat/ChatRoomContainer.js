import React, { useEffect, useState } from 'react';
import { storeRedux } from '../Chatting/Chatting';
import { StateLogin } from '../Constant/Constant';
import './ChatRoomContainer.css';

import ChatRoom from './Component/ChatRoom/ChatRoom';


const ChatRoomContainer = () => {

    const [ chatting, setChatting ] = useState(0);

    let ids = []

    storeRedux.subscribe(() => {
        if(storeRedux.getState().value==='chatting') {
            setChatting(x => x + 1);
        }
    })

    useEffect(() => {
        
    },[chatting])

    if(StateLogin===true) {
        if(JSON.parse(localStorage.getItem('chatting')).chatting.length>0) {
          ids = JSON.parse(localStorage.getItem('chatting')).chatting;
        }
    }

    let chatRoomContainer = ids.map((id, index) => {
        return (
            <div key={index}>
                <ChatRoom id={id}/>
            </div>
        )
    })

    return (
        StateLogin===true
        ? (
        <div className='chatRoomContainer'>
            {chatRoomContainer}
        </div>
        )
        :
        (<div></div>)
    )
}

export default ChatRoomContainer;