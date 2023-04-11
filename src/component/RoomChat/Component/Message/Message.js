import React, { useState } from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';
import { StyledBadge } from '../../../../module/AvatarStyles';
import ReplyIcon from '@material-ui/icons/Reply';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ReactEmoji from 'react-emoji';
import ListFeeling from './ListFeeling/ListFeeling';
import MessageFeeling from '../MessageFeeling/MessageFeeling';


const Message = ({id, message, online, avatar}) => {

    const [ messageFeeling, setMessageFeeling ] = useState();
    const [ messageFeelingUser, setMessageFeelingUser ] = useState([]);

    const ShowUser = () => {
        document.querySelector(`#message1Avatar${id}${message.timestamp} button`).classList.add('active');
    }

    const OffShowUser = () => {
        setTimeout(() => {
            document.querySelector(`#message1Avatar${id}${message.timestamp} button`).classList.remove('active');
        }, 1000)
    }

    const ChooseFeeling = (idSendOrIdReceive, timestamp) => {       
        document.querySelectorAll('.listFeeling.active').forEach((even, index) => {
            document.querySelectorAll('.listFeeling.active')[index].classList.remove('active');
        })
        document.getElementById('overlayChatRoom').onclick = function() {
            document.querySelector('#overlayChatRoom').classList.remove('active');
            document.querySelector('.listFeeling.active').classList.remove('active');
        }
        document.querySelector('#overlayChatRoom').classList.add('active');
        document.querySelector(`#listFeelingChat${idSendOrIdReceive}${timestamp}`).classList.add('active');
    }

    return (
        message.idSend===JSON.parse(localStorage.getItem('userLogin')).id
        ? (
            <div className='message0' id={`message0${message.idSend}${message.timestamp}`}>
                <div className='messageIcon'>
                    <div>
                        <MoreHorizIcon />
                        <div className='messageIconText'>More</div>
                    </div>
                    <div>
                        <ReplyIcon />
                        <div className='messageIconText'>Reply</div>
                    </div>
                    <div>
                        <EmojiEmotionsIcon onClick={() => ChooseFeeling(message.idSend, message.timestamp)}/>
                        <div className='messageIconText'>Icons</div>
                        <div><ListFeeling id={message.idSend} timing={message.timestamp} setMessageFeeling={setMessageFeeling} setMessageFeelingUser={setMessageFeelingUser}/></div>
                    </div>
                </div>
                <div className='message0Content'>
                    {ReactEmoji.emojify(message.messageContent)}
                    <div className='message0ContentBottom'>
                        <div>
                            <MessageFeeling messageFeeling={messageFeeling} messageFeelingUser={messageFeelingUser}/>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className='message1'>
                <div className='message1Avatar' id={`message1Avatar${id}${message.timestamp}`}>
                    <a href={`https://localhost:4000/user${id}`} onMouseOver={ShowUser} onMouseOut={OffShowUser}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            variant={online}
                        >
                            <Avatar alt="Remy Sharp" src={avatar} />
                        </StyledBadge>
                    </a>
                    <button>Xem trang ca nhan {id}</button>
                </div>
                <div className='message1Content'>
                    {ReactEmoji.emojify(message.messageContent)}
                    <div className='message1ContentBottom'>
                        <div>
                            <MessageFeeling messageFeeling={messageFeeling} messageFeelingUser={messageFeelingUser}/>
                        </div>
                    </div>
                </div>
                <div className='messageIcon'>
                    <div>
                        <EmojiEmotionsIcon onClick={() => ChooseFeeling(message.idReceive, message.timestamp)} />
                        <div className='messageIconText'>Feeling</div>
                        <div><ListFeeling id={message.idReceive} timing={message.timestamp} setMessageFeeling={setMessageFeeling} setMessageFeelingUser={setMessageFeelingUser}/></div>
                    </div>
                    <div>
                        <ReplyIcon />
                        <div className='messageIconText'>Reply</div>
                    </div>
                    <div>
                        <MoreHorizIcon />
                        <div className='messageIconText'>More</div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Message;