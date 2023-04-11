import React, { useEffect, useState } from 'react';
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import MicIcon from '@material-ui/icons/Mic';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ImageIcon from '@material-ui/icons/Image';
import YouTubeIcon from '@material-ui/icons/YouTube';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import CallIcon from '@material-ui/icons/Call';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import DivExpandMore from './DivExpandMore';
import DivNotificationLogin from './DivNotificationLogin';
import { Avatar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './module/AvatarStyles.js'
import Badge from '@material-ui/core/Badge';
import Notifications from './component/Notifications/Notifications';
import axios from 'axios';
import { getNumberNotifications } from './module/RealTime';
import { InforLogin, StateLogin } from './component/Constant/Constant';
import { AddressApp } from './component/AddressApp/AddressApp';
import { AddressAPI } from './component/AddressAPI/AddressAPI';


var btnExpandMore = true;
function expandMoreButton () { 
    var expandMoreIcon = document.getElementById("expandMoreIcon"); 
    if (btnExpandMore===true) {
        expandMoreIcon.style.display="block"; 
        btnExpandMore = false;
    } else {
        expandMoreIcon.style.display="none";
        btnExpandMore = true;
    } 
};

var btnUserAccount = true;
function userAccount_fc () { 
    var tabNotificationLogin = document.getElementById("tabNotificationLogin"); 
    if (btnUserAccount===true) {
        tabNotificationLogin.style.display="block"; 
        btnUserAccount = false;
    } else {
        tabNotificationLogin.style.display="none";
        btnUserAccount = true;
    } 
}

const Header = (props) => {  

    const [ init, setInit ] = useState(true)
    const classes = useStyles()
    const [ numberNotifications, setNumberNotifications ] = useState(0)
    const [ notification, setNotification ] = useState(false)
    const [ dataNotifications, setDataNotifications ] = useState([]);

    let avatarUserLogin 
    if(localStorage.getItem('login')==='true') {
        avatarUserLogin = InforLogin.avatar;
    } else {
        avatarUserLogin = '';
    }

    useEffect(() => {
        setInit(false)
    }, [init])

    useEffect(() => {
        if(localStorage.getItem('login')==='true') {
            getAllNotifications();
        }
        getNumberNotifications((data) => {
            if(data) {
                setNumberNotifications(x => x + 1)
            }
        });
    },[])

    const getAllNotifications = () => {
        const formData = new FormData();
        formData.append('id', InforLogin.id)
        axios.post(`${AddressAPI}getAllNotifications`, formData)
        .then(res => {
            setNumberNotifications(res.data.newNotifications.length)
        }).catch(err => console.error(err));
    }

    let history = useHistory();
    function homeIcon() {
        history.replace("/homeApp")
        window.location.reload(true)
    }

    function personalPage_fc() {
        history.replace(`/user${InforLogin.id}`)
        window.location.reload(true)
    }

    const AVATAR = () => {
        return (
            localStorage.getItem('login')==='true'
            ? (
                <a href={`${AddressApp}user${InforLogin.id}`}>
                    <div 
                        className="avatarHeader" 
                        onClick={personalPage_fc}
                    >
                        <Avatar src={`${avatarUserLogin}`} className={classes.small}/>
                        <p>{InforLogin.firstName + " " + InforLogin.lastName}</p>
                    </div>
                </a>
            ) : (
                <button onClick={userAccount_fc}>Login</button>
            )
        )
    }

    const Notifications_fc = () => {
        let tab_notifications = document.querySelector('.notifications')
        let overlayHidden = document.getElementById('overlayHidden')
        if(notification===false) {
            tab_notifications.classList.add('active')
            overlayHidden.classList.add('active')
            setNotification(true)
            overlayHidden.onclick = function() {
                tab_notifications.classList.remove('active')
                overlayHidden.classList.remove('active')
                setNotification(false)
            }
        } else {
            tab_notifications.classList.remove('active')
            overlayHidden.classList.remove('active')
            setNotification(false)
        }
        document.title = 'vi2cat';

        const formData = new FormData();
        formData.append('id', InforLogin.id)
        axios.post(`${AddressAPI}showAllNotifications`, formData)
        .then(res => {
            setNumberNotifications(res.data.newNotifications.length);
            setDataNotifications(res.data.allNotifications);
        }).catch(err => console.error(err));
    }

    return (
        <div className="header"> 
            <div className="header__left">
        
            </div>
            <div className="options">
                <a href={`${AddressApp}homeApp`}>
                    <div className="option" type="submit"  onClick={homeIcon}>
                        <HomeIcon color={props.colorHomeApp}/>
                    </div>
                </a>
                <a href={`${AddressApp}homeApp`}>
                    <div className="option" color={props.colorImageApp}>
                        <ImageIcon/>
                    </div>
                </a>
                <a href={`${AddressApp}homeApp`}>
                    <div className="option" color={props.colorVideoApp}>
                        <YouTubeIcon/>
                    </div> 
                </a>  
                <div className="option">
                    <div>
                        <ExpandMoreIcon type="submit" onClick={expandMoreButton}/>
                        <div id="expandMoreIcon">
                            <DivExpandMore />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="search">
                <input placeholder="Search" type="text" />
                <div className="searchIcon">
                    <SearchIcon />
                    <MicIcon />
                </div>
            </div>
            <div className="options">
                <div className="option">
                    <VideoCallIcon />
                </div>
                <div className="option">
                    <CallIcon />
                </div>  
                <div className="option" onClick={(e) => StateLogin===true ? Notifications_fc(e) : alert('Vui long dang nhap')}>
                    <Badge badgeContent={numberNotifications} color="secondary">
                        <NotificationsActiveIcon />
                        <Notifications {...{dataNotifications}}/>
                    </Badge>
                </div> 
            </div>
            <div className="account">
                <AVATAR />
                <div id="tabNotificationLogin">
                    <DivNotificationLogin />
                </div> 
            </div>  
                
        </div>
        
    )
};

export default Header;
