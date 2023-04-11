import React from 'react';
import './InforBar.css'
import { Avatar } from '@material-ui/core';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CallIcon from '@material-ui/icons/Call';
import { StyledBadge } from '../../../../module/AvatarStyles';
import { storeRedux } from '../../../Chatting/Chatting';
import { InforLogin } from '../../../Constant/Constant';
import { sendCallVideo } from '../../../../module/RealTime';
import { AddressApp } from '../../../AddressApp/AddressApp';




const InforBar = ({id, online, firstName, lastName, avatar}) => {

    const turnOffChatting = () => {
        let arrChatting = JSON.parse(localStorage.getItem('chatting')).chatting;
        if(arrChatting.includes(id)) {
            arrChatting.splice(arrChatting.indexOf(id), 1)
        }
        localStorage.setItem('chatting', JSON.stringify({'chatting': arrChatting}));
        storeRedux.dispatch({ type: 'chatting' });
    }

    const CallVideo = () => {
        sendCallVideo(InforLogin.id, id);
        // window.open(`${AddressApp}CallVideo/callVideoRoom23451235`,'New Window' , 'width = 300, height = 300, top = 70, left = 500, resizable = 0, menubar = yes', true );
    }
    
    return (
        <div className='inforBarContainer'>
            <div className='inforBar'>
                <a href={`${AddressApp}user${id}`}>
                    <div>
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
                        <p>{firstName + " " + lastName}</p>
                    </div>
                </a>
            </div>
            <div className='inforBar'>
                <div className='inforBarComponent' onClick={CallVideo}>
                    <VideoCallIcon />
                </div>
                <div className='inforBarComponent'>
                    <CallIcon />
                </div>
                <div className='inforBarComponent'>
                    <button onClick={turnOffChatting}>&times;</button>
                </div>
            </div>
        </div>
    )
}

export default InforBar;