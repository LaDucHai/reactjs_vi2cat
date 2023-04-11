import React, { useEffect, useRef, useState } from 'react';
import './PersonalPage.css'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Header from "./Header.js";
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import InfoIcon from '@material-ui/icons/Info';
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly';
import { Avatar } from '@material-ui/core';
import { useStyles } from './module/AvatarStyles.js'
import PostHome from './PostHome.js';
import axios from 'axios';
import AddFriend from './component/AddFriend/AddFriend';
import { AddressAPI } from './component/AddressAPI/AddressAPI';
import { InforLogin } from './component/Constant/Constant';


let allDataGroup = [
    {
        'idGroup': '123123',
        'nameGroup': '0',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '1',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '2',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '3',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '4',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '5',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '6',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '7',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '8',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '9',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '10',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '11',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '12',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '13',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '14',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '15',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '16',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '17',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '18',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    },
    {
        'idGroup': '123123',
        'nameGroup': '19',
        'avatar': 'https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg'
    }
]

let arrIdHome = []

const PersonalPage = () => {

    const { id } = useParams();
    const classes = useStyles();
    const [ init, setInit ] = useState(true);
    const [ render, setRender ] = useState(0);
    const [ data_home, setData_home ] = useState([]);
    const [ counterHome, setCounterHome ] = useState(0);
    const [ arrDataGroup, setArrDataGroup ] = useState([]);
    const [ addFriend, setAddFriend ] = useState();
    const [ sentFriend, setSentFriend ] = useState();
    const [ invitatedFriend, setInvitatedFriend ] = useState();
    const [ componentAddFrient, setComponentAddFriend ] = useState(false)
    const [ follow, setFollow ] = useState();
    const [ chooseView, setChooseView ] = useState(0);
    const avatarRef = useRef(null);
    const [ avatarFile, setAvatarFile ] = useState([]);
    const myPersonalPage = () => {
        if(id===InforLogin.id) {
            return true
        } else {
            return false
        }
    }

    let idSend = InforLogin.id;
    let idReceive = id;
    let arrChooseView = [ 'personalpagehome', 'personalpagevideo', 'personalpagegroup' ]

    useEffect(() => {
        setInit(false)
        return () => {        
        }
    }, [init, render, counterHome])

    let history = useHistory();

    const logout_fc = () => {
        localStorage.setItem("userLogin", "");
        localStorage.setItem('login', false);
        history.replace('/homeApp');
        window.location.reload(true);
    }

    const myPersonalPage_fc = () => {
        if(myPersonalPage()) {
            document.querySelector('.right_personalPage_topRight_1').style.display = 'none';
            document.querySelector('.right_personalPage_topRight_2').style.display = 'flex';
        } else {
            document.querySelector('.right_personalPage_topRight_1').style.display = 'flex';
            document.querySelector('.right_personalPage_topRight_2').style.display = 'none';
        }
    }

    function colorAvatar() {
        if(id===InforLogin.id) {
            document.querySelector('.avatarHeader').style.backgroundColor = 'rgb(234, 234, 255)';
            document.querySelector('.avatarHeader p').style.color = 'blue';
        }
    }

    if(init===true) {
        for(let i=0; i<allDataGroup.length; i++) {
            if(i<10) {
                arrDataGroup.push(allDataGroup[i]);
            }
        }
        const formData = new FormData();
        formData.append('request', 1);
        formData.append('idLogin', id);
        axios.post(`${AddressAPI}personalpagehome`,formData)
        .then(res => {
            arrIdHome = res.data;
            getDataHome(arrIdHome);
        })
        .catch(err => console.log(err));
    } else {
        myPersonalPage_fc();
        colorAvatar();
        mouseOverOut_fc();
    }

    function getDataHome(arr) {
        let arrDataHome = []
        if(counterHome<arr.length) {
            const formData = new FormData();
            formData.append('request', 2);
            formData.append('idLogin', id);
            formData.append('idPostHome', arr[counterHome]);
            axios.post(`${AddressAPI}personalpagehome`,formData)
            .then(res => {
                arrDataHome.push(res.data);
                setData_home(data_home.concat(arrDataHome));
                setCounterHome(x => x + 1);
            })
            .catch(err => console.log(err));
        }      
    }

    const moreGroup_fc = () => {
        let arr = []
        for(let i=0; i<allDataGroup.length; i++) {
            arr.push(allDataGroup[i]);
        }
        setArrDataGroup(arr);
        setRender(x => x + 1);
        document.getElementById("lessGroup_personalPage").style.display = 'block';
        document.getElementById("moreGroup_personalPage").style.display = 'none';
    }

    const lessGroup_fc = () => {
        let arr = []
        for(let i=0; i<allDataGroup.length; i++) {
            if(i<10) {
                arr.push(allDataGroup[i]);
            }
        }
        setArrDataGroup(arr)
        setRender(x => x + 1)
        document.getElementById("lessGroup_personalPage").style.display = 'none';
        document.getElementById("moreGroup_personalPage").style.display = 'block';
    }

    let arrGroup = arrDataGroup.map((data, index) => {
        return (
            <div key={index}>
                <div className="left_component_personalPage">
                    <Avatar className={classes.small} src={data.avatar} alt="Remy Sharp"/>
                    <p>{data.nameGroup}</p>
                </div>
            </div>
        )
    })

    function mouseOverOut_fc() {
        let left_component_personalPage = document.querySelectorAll('.left_component_personalPage');
        let left_component_personalPage_p = document.querySelectorAll('.left_component_personalPage p');
        let mouseOverOut;

        left_component_personalPage.forEach((even, index) => {
            even.addEventListener('mouseover', (e) => {
                let X = e.pageX + 20;
                let Y = e.pageY + 15;
                let note_hover = document.querySelector('.note_hover');
                let note_hover_p = document.querySelector('.note_hover p');
                note_hover.style.margin = `${Y}px 0 0 ${X}px`;
                note_hover_p.innerHTML = left_component_personalPage_p[index].outerText;
                mouseOverOut = setTimeout(() => {
                    note_hover.style.display = "block";
                }, 1000)
            })
    })

    left_component_personalPage.forEach((even, index) => {
        even.addEventListener('mouseout', () => {
            let note_hover = document.querySelector('.note_hover');
            clearTimeout(mouseOverOut);
            note_hover.style.display = "none";
        })
    })
    }
    

    document.querySelectorAll('.component_right_personalPage_topLeft').forEach((even, index) => {
        even.addEventListener('click', () => {
            document.querySelector('.line.active').classList.remove('active');
            document.querySelectorAll('.line')[index].classList.add('active');
            document.querySelector('.right_personalPage_bottom_body.active').classList.remove('active');
            document.querySelectorAll('.right_personalPage_bottom_body')[index].classList.add('active');
            setChooseView(index)
        })
    })

    let home = data_home.map((data, index) => {
        return (
            <div key={index}>
                <PostHome {...data.data} />
            </div>
        )
    })

    window.addEventListener('scroll', () => {
        // const scrollable = document.documentElement.scrollHeight - window.innerHeight
        if(window.scrollY>=301) {
            document.querySelector('.right_personalPage_top').classList.add('active');
        } else {
            document.querySelector('.right_personalPage_top').classList.remove('active');
        }
    })

    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
        if(scrollable===0) {
            getDataHome(arrIdHome);
        }
    }

    const addFriend_fc = () => {
        if(componentAddFrient===false) {
            document.querySelector('.addFriend').style.display = 'flex';
            setComponentAddFriend(true)
        } else {
            document.querySelector('.addFriend').style.display = 'none';
            setComponentAddFriend(false)
        }
    }

    const getInvitatedFriend = () => {
        let right_personalPage_topRight_1_p = document.querySelectorAll('.right_personalPage_topRight_1 button');
        const formData = new FormData();
        formData.append('id', InforLogin.id);
        axios.post(`${AddressAPI}getInvitatedFriend`, formData)
        .then(res => {
            if(res.data.includes(id)) {
                right_personalPage_topRight_1_p[0].style.backgroundColor = '';
                right_personalPage_topRight_1_p[0].innerHTML = 'Invitated Friend';
                setInvitatedFriend(true)     
            } else {
                right_personalPage_topRight_1_p[0].style.backgroundColor = '';
                right_personalPage_topRight_1_p[0].innerHTML = 'Add Friend';
                setInvitatedFriend(false)
            }
        }).catch(err => console.error(err));
    }

    const getSentFriend = () => {
        let right_personalPage_topRight_1_p = document.querySelectorAll('.right_personalPage_topRight_1 button');
        const formData = new FormData();
        formData.append('id', InforLogin.id);
        axios.post(`${AddressAPI}getSentFriend`, formData)
        .then(res => {
            if(res.data.includes(id)) {
                right_personalPage_topRight_1_p[0].style.backgroundColor = '';
                right_personalPage_topRight_1_p[0].innerHTML = 'Sent Friend';
                setSentFriend(true);
            } else {
                getInvitatedFriend();
                setSentFriend(false);
            }
        }).catch(err => console.error(err));
    }

    const getFriend = () => {
        let right_personalPage_topRight_1_p = document.querySelectorAll('.right_personalPage_topRight_1 button');
        const formData = new FormData();
        formData.append('id', InforLogin.id);
        axios.post(`${AddressAPI}getMyFriend`, formData)
        .then(res => {
            if(res.data.includes(id)) {
                right_personalPage_topRight_1_p[0].style.color = 'white';
                right_personalPage_topRight_1_p[0].style.backgroundColor = 'blue';
                right_personalPage_topRight_1_p[0].innerHTML = 'Friend';
                setAddFriend(true);
            } else {
                getSentFriend();
                setAddFriend(false);
            }
        }).catch(err => console.error(err));
    }

    const follow_fc = () => {
        const formData = new FormData();
        formData.append('id1', InforLogin.id);
        formData.append('id2', id);
        formData.append('follow', follow);

        axios.post(`${AddressAPI}setMyFollow`, formData)
        .then(res => {
            console.log(res.data);
            getFollow();
        }).catch(err => console.error(err));

        axios.post(`${AddressAPI}setMyFollowed`, formData)
        .then(res => {
            console.log(res.data);
        }).catch(err => console.error(err));
    }

    const getFollow = () => {
        let right_personalPage_topRight_1_p = document.querySelectorAll('.right_personalPage_topRight_1 button');
        const formData = new FormData();
        formData.append('id', InforLogin.id);
        axios.post(`${AddressAPI}getMyFollow`, formData)
        .then(res => {
            if(res.data.includes(id)) {
                right_personalPage_topRight_1_p[1].style.color = 'white';
                right_personalPage_topRight_1_p[1].style.backgroundColor = 'red';
                right_personalPage_topRight_1_p[1].innerHTML = 'Followed';
                setFollow(true)
            } else {
                right_personalPage_topRight_1_p[1].style.backgroundColor = '';
                right_personalPage_topRight_1_p[1].innerHTML = 'Follow';
                setFollow(false);
            }
        }).catch(err => console.error(err));
    }

    if(init===false) {
        getFollow();
        getFriend();
    }

    const avatar_fc = () => {
        let overlay = document.getElementById('overlay');
        let avatarDialog = document.querySelector('.avatarDialog');
        overlay.classList.add('active');
        avatarDialog.classList.add('active');
        overlay.addEventListener('click', () => {
            overlay.classList.remove('active');
            avatarDialog.classList.remove('active');
        })
    }

    const avatarBtn_fc = () => {
        let preViewAvatar = document.querySelector('.avatarDialogBody img');
        let avatarBtn = document.querySelector('.avatarDialogBody button');
        let avatarDialog_X = document.querySelector('.avatarDialog_X');
        avatarRef.current.click();
        avatarRef.current.addEventListener('change', () => {
            let file = avatarRef.current.files[0];
            setAvatarFile(file)
            if(file) {
                let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
                if(!allowedExtensions.exec(file.name)){
                    console.log('file ko hop le');
                    avatarRef.current.value = '';
                    return false;
                } else {
                    const fileReader = new FileReader();
                    fileReader.addEventListener("load", function () {
                        preViewAvatar.setAttribute("src", this.result);
                    })
                    fileReader.readAsDataURL(file);
                    avatarBtn.style.display = 'none';
                    preViewAvatar.style.display = 'block';
                    avatarDialog_X.style.display = 'flex';
                }
            } 
        })
    }

    const avatar_X_btn = () => {
        let preViewAvatar = document.querySelector('.avatarDialogBody img');
        let avatarBtn = document.querySelector('.avatarDialogBody button');
        let avatarDialog_X = document.querySelector('.avatarDialog_X');
        avatarBtn.style.display = 'flex';
        preViewAvatar.style.display = 'none';
        avatarDialog_X.style.display = 'none';
        setAvatarFile();
    }

    const sendAvatarImg_fc = () => {
        const formDataImg = new FormData();
        formDataImg.append('file', avatarFile);
        formDataImg.append('idPost', InforLogin.id);
        axios.post(`${AddressAPI}upload`, formDataImg)
        .then(res => {
            let pathUrlImg = AddressAPI + res.data.path;
            const formData = new FormData();
            formData.append('idPost', InforLogin.id);
            formData.append('urlImg', pathUrlImg);
            axios.post(`${AddressAPI}sendAvatar`, formData)
            .then(res => {
                localStorage.setItem("userLogin", JSON.stringify(res.data));
                window.location.reload(true);
            })
            .catch(err => console.log(err));
        })
    }

    return (
        <div className="personalPage">
            <div className="note_hover">
                <p></p>
            </div>
            <div className='avatarDialog'>
                <div className='avatarDialogTop'>
                    <p>Choose image avatar</p>
                </div>
                <div className='avatarDialog_X'>
                    <button onClick={avatar_X_btn}>&times;</button>
                </div>
                <div className='avatarDialogBody'>
                    <img alt=""/>
                    <button onClick={avatarBtn_fc}>Choose Image</button>
                    <input hidden='hidden' type='file' ref={avatarRef}/>
                </div>
                <div className='avatarDialogBottom'>
                    <button onClick={sendAvatarImg_fc}>OK</button>
                </div>
            </div>
            <div className="header_personalPage">
                <Header />
            </div>
            <div className="body_personalPage">
                <div className="left_personalPage">
                    <div className="left_personalPage_box">
                        <div className="left_component_personalPage">
                            <HomeIcon color="disabled"/>
                            <p>Home</p>
                        </div>
                        <div className="left_component_personalPage">
                            <InfoIcon color="disabled"/>
                            <p>Information</p>
                        </div>
                        <div className="left_component_personalPage">
                            <MobileFriendlyIcon color="disabled"/>
                            <p>Friends</p>
                        </div>
                    </div>
                    <div className="left_personalPage_box">
                        <p>GROUP</p>
                        {arrGroup}
                        <div id="moreGroup_personalPage">
                            <div className="left_component_personalPage" onClick={moreGroup_fc}>
                                <ExpandMoreIcon />
                                <p>More</p>
                            </div>
                        </div>
                        <div id="lessGroup_personalPage">
                            <div className="left_component_personalPage" onClick={lessGroup_fc}>
                                <ExpandLessIcon />
                                <p>Less</p>
                            </div>
                        </div>
                    </div>
                    <div className="left_personalPage_box">
                        <div className="left_component_personalPage">
                            <SettingsIcon color="disabled"/>
                            <p>Setting</p>
                        </div>
                        <div className="left_component_personalPage">
                            <HelpIcon color="disabled"/>
                            <p>Help</p>
                        </div>
                        <div className="left_component_personalPage">
                            <FeedbackIcon color="disabled"/>
                            <p>FeedbackIcon</p>
                        </div>
                    </div>
                    <div className="left_personalPage_box">
                        <p>chinh sach rieng tu</p>
                    </div>
                </div>
                <div className="right_personalPage">
                    <img src="https://i.ytimg.com/vi/tJY0EiOJVBo/maxresdefault.jpg" alt=""/>
                    <div className="right_personalPage_top">
                        <div className="right_personalPage_topLeft">
                            <div className="right_personalPage_topLeft_1">
                                <div className="component_right_personalPage_topLeft">
                                    <p>Home</p>
                                    <div className="line active"></div>
                                </div>
                                <div className="component_right_personalPage_topLeft">
                                    <p>Video</p>
                                    <div className="line"></div>
                                </div>
                                <div className="component_right_personalPage_topLeft"> 
                                    <p>Group</p>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                        <div className="right_personalPage_topRight">
                            <div className="right_personalPage_topRight_1">
                                <button onClick={addFriend_fc}>Add Friend</button>
                                <button onClick={follow_fc}>Follow</button>
                                <AddFriend addFriend={addFriend} sentFriend={sentFriend} invitatedFriend={invitatedFriend} idSend={idSend} idReceive={idReceive}/>
                            </div>
                            <div className="right_personalPage_topRight_2">
                                <button onClick={avatar_fc}>Avatar</button>
                                <button>Image</button>
                            </div>
                        </div>
                    </div>
                    <div className="right_personalPage_bottom">
                        <div className="right_personalPage_bottom_body active">
                            {home}
                        </div>
                        <div className="right_personalPage_bottom_body">
                            <p>Video</p>
                        </div>
                        <div className="right_personalPage_bottom_body">
                            <p>Group</p>
                        </div>
                    </div>
                    <button onClick={logout_fc}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default PersonalPage;