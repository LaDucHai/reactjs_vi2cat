import React from 'react';
import './style.css';
import CallIcon from '@material-ui/icons/Call';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { Avatar } from '@material-ui/core';
import { useStyles } from '../../module/AvatarStyles.js';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ReplyIcon from '@material-ui/icons/Reply';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const RoomChat = () => {

    const classes = useStyles()

    return (
        <div className='roomChat'>
            <div className='roomChat_top'>
                <div className='roomChat_topLeft'>
                    <Avatar />
                    <p>laduchai</p>
                </div>
                <div className='roomChat_topRight'>
                    <div className='roomChatComponent'>
                        <VideoCallIcon />
                    </div>
                    <div className='roomChatComponent'>
                        <CallIcon />
                    </div>
                    <div className='roomChatComponent'>
                        <button>&times;</button>
                    </div>
                </div>
            </div>
            <div className='roomChat_body'>
                <div>
                    <div className='myChat'>
                        <div className='myChatComponent'>
                            <MoreHorizIcon style={{ color: 'white' }} fontSize='small'/>
                        </div>
                        <div className='myChatComponent'>
                            <ReplyIcon style={{ color: 'white' }} fontSize='small'/>
                        </div>
                        <div className='myChatComponent'>
                            <EmojiEmotionsIcon style={{ color: 'white' }} fontSize='small'/>
                        </div>
                        <div className='myChatComponent_text'> 
                            <p>myChat</p>
                        </div>
                    </div>
                    <div className='myFriendChat'>
                        <div className='myFriendChat_left'>
                            <div className='myFriendChat_avatar'>
                                <Avatar />
                            </div>
                        </div>
                        <div className='myFriendChat_center'>
                            <div className='myFriendChatComponent_text'> 
                                <p>myFriendChatsdgf asdfasfasdfgsedfsa sdfasfasf asfasf asfdfsdfdsf</p>
                            </div>
                        </div>
                        <div className='myFriendChat_right'>
                            <div className='myFriendChatComponent'>
                                <EmojiEmotionsIcon style={{ color: 'white' }} fontSize='small'/>
                            </div>
                            <div className='myFriendChatComponent'>
                                <ReplyIcon style={{ color: 'white' }} fontSize='small'/>
                            </div>
                            <div className='myFriendChatComponent'>
                                <MoreHorizIcon style={{ color: 'white' }} fontSize='small'/>
                            </div>
                            <p className='myFriendChat_right_iconFeeling'>Feeling</p>
                            <p className='myFriendChat_right_iconReply'>Reply</p>
                            <p className='myFriendChat_right_iconMore active'>Moreasdfasfasfasfgasfg</p>
                        </div>
                    </div>
                    <p>asdefsdsdg</p>
                    <p>asdefsdsdg</p>
                    <p>asdefsdsdg</p>
                    <p>asdefsdsdg</p>
                    <p>asdefsdsdg</p>
                    <p>asdefsdsdg</p>
                </div>
                
            </div>   
            <div className='roomChat_bottom'>
                <div className='roomChat_inputFile'>
                    <AttachFileIcon />
                </div>
                <div className='roomChat_inputChat'>
                    <textarea />
                </div>
                <div>
                    <SendIcon color='primary'/>
                </div>
            </div>
        </div>
    )
}

export default RoomChat;