import React from 'react';
import './ChatContainer.css';
import SearchIcon from '@material-ui/icons/Search';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChatMembers from './Component/ChatMembers/ChatMembers';

const ChatContainer = ({usersOfChatContainer}) => {

    return (
        <div className='chatContainer'>
            <div className='chatContainer_top'>
                <div className='chatContainer_topLeft'>
                    <div>Chat</div>
                </div>
                <div className='chatContainer_topRight'>
                    <div>
                        <SearchIcon />
                    </div>
                    <div>
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
            <div className='chatContainer_bottom'>
                <ChatMembers usersOfChatContainer={usersOfChatContainer}/>
            </div>
        </div>
    )
}

export default ChatContainer;