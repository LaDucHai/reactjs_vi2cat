import React, { useState } from 'react';
import './CallVideoDialog.css';

import { Avatar } from '@material-ui/core';

import { getAcceptCallVideo, getCallVideo, getCancelCallVideo, sendAcceptCallVideo, sendCancelCallVideo } from '../../../../../module/RealTime';
import { AddressApp } from '../../../../AddressApp/AddressApp';
import { InforLogin, StateLogin } from '../../../../Constant/Constant';
import { getUser } from '../../../../User/User';


const CallVideoDialog = () => {

    const [ idSend, setIdSend ] = useState();
    const [ firstNameSend, setFirstNameSend ] = useState();
    const [ lastNameSend, setLastNameSend ] = useState();
    const [ avatarSend, setAvatarSend ] = useState();
    const [ idReceive, setIdReceive ] = useState();
    const [ firstNameReceive, setFirstNameReceive ] = useState();
    const [ lastNameReceive, setLastNameReceive ] = useState();
    const [ avatarReceive, setAvatarReceive ] = useState();

    let callVideo_active

    getCallVideo((idSend, idReceive) => {
        getUser(idSend, res => {
            setFirstNameSend(res.data.firstName);
            setLastNameSend(res.data.lastName);
            setAvatarSend(res.data.avatar);
        })
        setIdSend(idSend)

        getUser(idReceive, res => {
            setFirstNameReceive(res.data.firstName);
            setLastNameReceive(res.data.lastName);
            setAvatarReceive(res.data.avatar);
        })
        setIdReceive(idReceive)

        document.querySelector('.callVideoDialog').classList.add('active');
        callVideo_active = setTimeout(() => {
            document.querySelector('.callVideoDialog').classList.remove('active');
        }, 15000);
    })

    getAcceptCallVideo((callVideoRoom) => {
        document.querySelector('.callVideoDialog').classList.remove('active');
        window.open(`${AddressApp}CallVideo/callVideoRoom${callVideoRoom}`,'New Window' , 'width = 300, height = 300, top = 70, left = 500, resizable = 0, menubar = yes', true );
        clearTimeout(callVideo_active);
    })

    getCancelCallVideo(() => {
        document.querySelector('.callVideoDialog').classList.remove('active');
        clearTimeout(callVideo_active);
    })

    const AcceptCallVideo = () => {
        sendAcceptCallVideo(idSend, idReceive);
    }

    const CancelCallVideo = () => {
        sendCancelCallVideo(idSend, idReceive)
    }

    return (
        StateLogin===true ? 
        (
            <div className='callVideoDialog'>
            {InforLogin.id===idSend 
                ? (
                    <>
                        <div className='callVideoDialogInfor'>
                            <div>{`Calling to ${firstNameReceive} ${lastNameReceive}`}</div>
                            <Avatar src={avatarReceive}/>
                        </div>
                        <div className='callVideoDialogButton'>
                            <button className='cancel' onClick={() => CancelCallVideo()}>Cancel</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='callVideoDialogInfor'>
                            <Avatar src={avatarSend}/>
                            <div>{`${firstNameSend} ${lastNameSend} is calling for you`}</div>
                        </div>
                        <div className='callVideoDialogButton'>
                            <button className='accept' onClick={() => AcceptCallVideo()}>Accept</button>
                            <button className='cancel' onClick={() => CancelCallVideo()}>Cancel</button>
                        </div>
                    </>
                )
            }
            
        </div>
        ) : (
            <></>
        )
    )
}

export default CallVideoDialog;