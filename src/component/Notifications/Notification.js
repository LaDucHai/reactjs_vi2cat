import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import './Notification.css';
import { StyledBadge, useStyles } from '../..//module/AvatarStyles';
import { AddressAPI } from '../AddressAPI/AddressAPI';
import axios from 'axios';


const Notification = (props) => {

    const classes = useStyles();

    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();
    const [ contentNotification, setContentNotification ] = useState()
    const [ backgroundColorNotification, setBackgroundColorNotification ] = useState()
    const [ avatar, setAvatar ] = useState();

    useEffect(() => {
        initFc(props);
        getUser(props);
        designContent(props);
    },[props])

    const initFc = (props) => {
        if(props.seen===false) {
            setBackgroundColorNotification('#E0F2F7')
        } else {
            setBackgroundColorNotification('#FFFFFF');
        }
    }

    const designContent = (props) => {
        switch(props.content) {
            case 'unAgreeAddFriend':
                setContentNotification('khong dong y ket ban voi ban');
                break;
            case 'agreeAddFriend':
                setContentNotification('dong y ket ban voi ban');
                break;
            case 'sendAddFriend':
                setContentNotification('gui loi moi ket ban cho ban');
                break;
            case 'unSendAddFriend':
                setContentNotification('huy gui loi moi ket ban cho ban');
                break;
            case 'unFriend':
                setContentNotification('huy ket ban voi ban');
                break;
            default:
                break;
        };
    }

    const onMouseOver_fc = () => {
        setBackgroundColorNotification('rgb(233, 233, 233)')
    }

    const onMouseOut_fc = () => {
        initFc(props);
    }

    const getUser = (props) => {
        const formData = new FormData();
        formData.append('id', props.interactiveObject);
        axios.post(`${AddressAPI}getUserById`, formData)
        .then(res => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setAvatar(res.data.avatar)
        }).catch(err => console.error(err));
    }

    const onClick_fc = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', JSON.parse(localStorage.getItem('userLogin')).id)
        formData.append('notification', JSON.stringify(props));
        axios.post(`${AddressAPI}seeNotifications`, formData)
        .then(res => {
            console.log(res.data)
        }).catch(err => console.error(err));
    }

    return (
        <div className='notification' style={{backgroundColor: backgroundColorNotification}} onClick={(e) => onClick_fc(e)} onMouseOver={onMouseOver_fc} onMouseOut={onMouseOut_fc}>
            <a href={`https://localhost:4000/user`}>
                <div className='avatarNotification'>
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant={props.online}
                    >
                        <Avatar alt="Remy Sharp" src={avatar} className={classes.notification} /> 
                    </StyledBadge>
                </div>
                <div>
                    <div className='contentNotification'>{firstName + ' ' + lastName + " " + contentNotification}</div>
                    <div className='timingNotification'>{props.time}</div>
                </div>
            </a>
        </div>
    )
}

export default Notification;