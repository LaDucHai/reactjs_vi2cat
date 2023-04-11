import React, { useState, useEffect, useRef } from 'react';
import "./HomeApp.css";
import Header from "./Header.js";
import PostHome from './PostHome.js';
import axios from 'axios';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { AddressAPI } from './component/AddressAPI/AddressAPI';
import ChatContainer from './component/ChatContainer/ChatContainer';
import { InforLogin, StateLogin } from './component/Constant/Constant';


       
let dataPost = [];

const HomeApp = () => {

    const [ morePost, setMorePost ] = useState(0);
    const [ initHomeApp, setInitHomeApp ] = useState(0);
    const [ usersOfChatContainer, setUsersOfChatContainer ] = useState([]);
    
    const el = useRef();
    let arrImg = [];
    let arrVideo = [];

    const getUserChatContainer = () => {
        let formData = new FormData();
        if(StateLogin===true) {
            formData.append('id', InforLogin.id);
            axios.post(`${AddressAPI}chatContainer`, formData)
            .then(res => {
                setUsersOfChatContainer(res.data);
            }).catch(err => console.error(err));
        }
    }
    useEffect(() => {
        getUserChatContainer();
    },[])
    
    useEffect(() => {
        if(initHomeApp<1) {
            let homeapp = new FormData()
            homeapp.append('homeapp', true)
            if(localStorage.getItem('login')==='true') {
                homeapp.append('userLogin', InforLogin.id);
            }
            axios.post(`${AddressAPI}getdataposthome`, homeapp)
            .then(res => {
                dataPost.push(res.data[0], res.data[1], res.data[2])
                setInitHomeApp(x => x + 1)
            }).catch(err => {
                console.error(err);
            })
        }
        return () => {
            let homeapp = new FormData()
            homeapp.append('homeapp', true)
            if(localStorage.getItem('login')==='true') {
                homeapp.append('userLogin', InforLogin.id)
            }
            axios.post(`${AddressAPI}getdataposthome`, homeapp)
            .then(res => {
                dataPost.push(res.data[0], res.data[1], res.data[2]);
            }).catch(err => {
                console.error(err);
            })
        }
    }, [initHomeApp, morePost])

    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight
        if(scrollable===0) {
            setMorePost(x => x + 1)
        }
    }

    let allPost = dataPost.map((data, index) => {
        return (
            <div key={index}>
                <PostHome {...data.data} />
            </div>
        )
    })

    const inputPostHome_fc = () => {
        document.querySelector(".dialogPostHome").classList.add('active')
        document.getElementById('overlay').classList.add('active')
        document.getElementById('overlay').onclick = function() {
            document.querySelector(".dialogPostHome").classList.remove('active')
            document.getElementById("overlay").classList.remove('active')
            document.querySelector(".notificationDialogPostHome").classList.remove('active')
        }
        document.querySelector(".notificationDialogPostHome").classList.add('active')
        document.querySelector(".notificationDialogPostHome").addEventListener('click', () => {
            document.querySelector(".notificationDialogPostHome").classList.remove('active')
        })
    }
    
    const select_fc = () => {
        document.querySelector(".dialogPostHome_select").classList.add('active')
        document.querySelector(".dialogPostHome").classList.remove('active')
        document.getElementById("overlay").onclick = function() {
            document.querySelector(".dialogPostHome_select").classList.remove('active')
            document.getElementById("overlay").classList.remove('active')
        }
    }

    const dialogPostHome_back_fc = () => {
        document.querySelector(".dialogPostHome_select").classList.remove('active')
        document.querySelector(".dialogPostHome").classList.add('active')
    }

    const chooseFileImg_fc = () => {
        let inputFileDialogPostHome = document.getElementById("inputFileImgDialogPostHome")
        let previewImgDialogPostHome = document.querySelectorAll(".previewImgDialogPostHome img")
        inputFileDialogPostHome.click()
        inputFileDialogPostHome.addEventListener('change', () => {
            for(let i=0; i<inputFileDialogPostHome.files.length; i++) {
                if(!arrImg.includes(inputFileDialogPostHome.files[i])) {
                    arrImg.push(inputFileDialogPostHome.files[i])
                }
            }
            previewImgDialogPostHome.forEach((even, index) => {
                // const files = inputFileDialogPostHome.files[index]
                if(arrImg[index]) {
                    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
                    if(!allowedExtensions.exec(arrImg[index].name)){
                        console.log('file ko hop le')
                        inputFileDialogPostHome.value = '';
                        return false;
                    } else {
                        const fileReader = new FileReader();
                        fileReader.addEventListener("load", function () {
                            document.querySelectorAll(".previewImgDialogPostHome")[index].style.display="block"
                            previewImgDialogPostHome[index].setAttribute("src", this.result)
                        })
                        fileReader.readAsDataURL(arrImg[index])
                    }
                } 
            })
        })
    }

    let previewImgDialogPostHome_btn = document.querySelectorAll(".previewImgDialogPostHome button")
    previewImgDialogPostHome_btn.forEach((even, index) => { 
        even.addEventListener('click', () => {
            for(let i=0; i<10; i++) {
                document.querySelectorAll(".previewImgDialogPostHome")[i].style.display="none"
                document.querySelectorAll(".previewImgDialogPostHome img")[i].setAttribute("src", null)
            }
            arrImg.splice(index, 1)
            for(let i=0; i<arrImg.length; i++) {
                const fileReader = new FileReader();
                fileReader.addEventListener("load", function () {
                    document.querySelectorAll(".previewImgDialogPostHome")[i].style.display="block"
                    document.querySelectorAll(".previewImgDialogPostHome img")[i].setAttribute("src", this.result) 
                })
                fileReader.readAsDataURL(arrImg[i])
            }
        })
    })

    const chooseFileVideo_fc = () => {
        let inputFileDialogPostHome = document.getElementById("inputFileVideoDialogPostHome")
        let previewVideoDialogPostHome = document.querySelectorAll(".previewVideoDialogPostHome video")
        inputFileDialogPostHome.click()
        inputFileDialogPostHome.addEventListener('change', () => {
            for(let i=0; i<inputFileDialogPostHome.files.length; i++) {
                if(!arrVideo.includes(inputFileDialogPostHome.files[i])) {
                    arrVideo.push(inputFileDialogPostHome.files[i])
                }
            }
            previewVideoDialogPostHome.forEach((even, index) => {
                // const files = inputFileDialogPostHome.files[index]
                if(arrVideo[index]) {
                    let allowedExtensions = /(\.mp4|\.webm)$/i
                    if(!allowedExtensions.exec(arrVideo[index].name)){
                        console.log('file khong hop le')
                        inputFileDialogPostHome.value = '';
                        return false;
                    } else {
                        const fileReader = new FileReader();
                        fileReader.addEventListener("load", function () {
                            document.querySelectorAll(".previewVideoDialogPostHome")[index].style.display="block"
                            previewVideoDialogPostHome[index].setAttribute("src", this.result)
                        })
                        fileReader.readAsDataURL(arrVideo[index])
                    }
                } 
            })
        })
    }

    let previewVideoDialogPostHome_btn = document.querySelectorAll(".previewVideoDialogPostHome button")
    previewVideoDialogPostHome_btn.forEach((even, index) => { 
        even.addEventListener('click', () => {
            for(let i=0; i<10; i++) {
                document.querySelectorAll(".previewVideoDialogPostHome")[i].style.display="none"
                document.querySelectorAll(".previewVideoDialogPostHome video")[i].setAttribute("src", null)
            }
            arrVideo.splice(index, 1)
            for(let i=0; i<arrVideo.length; i++) {
                const fileReader = new FileReader();
                fileReader.addEventListener("load", function () {
                    document.querySelectorAll(".previewVideoDialogPostHome")[i].style.display="block"
                    document.querySelectorAll(".previewVideoDialogPostHome video")[i].setAttribute("src", this.result) 
                })
                fileReader.readAsDataURL(arrVideo[i])
            }
        })
    })

    const upload_file_postHome = (file,arr) => {
        if(file.length>0) { 
            for(let i=0; i<file.length; i++) {
                const formData = new FormData()
                formData.append('file', file[i])
                formData.append('idPost', InforLogin.id)
                axios.post(`${AddressAPI}upload`, formData)
                .then(res => {
                    arr.push({
                        'name': res.data.name,
                        'path': AddressAPI + res.data.path
                    })
                    if(file.length===arr.length) {
                        const formDt = new FormData()
                        formDt.append('dialogposthome', true)
                        formDt.append('dataImgVideo', JSON.stringify({'arrDataImgVideo': arr}))
                        formDt.append('datatext', document.querySelector(".dialogPostHomeBottom textarea").value)
                        formDt.append('idPost', InforLogin.id)
                        axios.post(`${AddressAPI}posthome`, formDt)
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                        document.querySelector(".dialogPostHomeBottom textarea").value='';
                    }
                })
                .catch(err => console.log(err));
            }
        } else {
            const formDt = new FormData()
            formDt.append('dialogposthome', true)
            formDt.append('dataImgVideo', JSON.stringify({'arrDataImgVideo': arr}))
            formDt.append('datatext', document.querySelector(".dialogPostHomeBottom textarea").value)
            formDt.append('idPost', InforLogin.id)
            axios.post(`${AddressAPI}posthome`, formDt)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
            document.querySelector(".dialogPostHomeBottom textarea").value=''
        }
    }

    const postHomeBtn_fc = () => {
        let counterVideo = 0
        let counterImg = 0
        let counter = 0
        let arrAll = []
        let arr = [] 
        let previewVideoDialogPostHome = document.querySelectorAll(".previewVideoDialogPostHome video")
        for(let i=0; i<arrVideo.length; i++) {
            arrAll.push(arrVideo[i])
            if((previewVideoDialogPostHome[i].duration-600.000)<0) {
                if((i===counterVideo) && (i===(arrVideo.length-1))) {
                    for(let index=0; index<arrVideo.length; index++) {
                        const fileReader = new FileReader();
                        fileReader.addEventListener("load", function () {
                            document.querySelectorAll(".previewVideoDialogPostHome")[index].style.display="none";
                            document.querySelectorAll(".previewVideoDialogPostHome video")[index].setAttribute("src", null);
                        })
                        fileReader.readAsDataURL(arrVideo[index])
                    }
                    arrVideo = []
                }
                counterVideo = counterVideo + 1
            } else {
                console.log('video no longer than 10 minutes')
                counter = counter + 1
            }
        }
        for(let i=0; i<arrImg.length; i++) {
            if((i===counterImg) && (i===(arrImg.length-1))) {
                for(let index=0; index<arrImg.length; index++) {
                    arrAll.push(arrImg[i])
                    const fileReader = new FileReader();
                    fileReader.addEventListener("load", function () {
                        document.querySelectorAll(".previewImgDialogPostHome")[index].style.display="none"
                        document.querySelectorAll(".previewImgDialogPostHome img")[index].setAttribute("src", null) 
                    })
                    fileReader.readAsDataURL(arrImg[index])
                }
                arrImg = []
            }
            counterImg = counterImg + 1
        }
        if(counter===0) {
            upload_file_postHome(arrAll, arr)
            document.querySelector('.dialogPostHome').classList.remove('active')
            document.getElementById('overlay').classList.remove('active')
            document.querySelector('.notificationDialogPostHome').classList.remove('active')
        }
    }

    // const chatOnScroll_fc = (e) => {
    //     let bottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 3;
    //     if(bottom){
    //         console.log(bottom)
    //     }
    // }

    return (
        <div className="homeApp"> 
            <div>
                <div className="headerHomeApp">
                    <Header {...{"colorHomeApp": "primary"}}/>
                </div>
                <div className="bodyHomeApp">
                    <div className="bodyLeftHomeApp">
                    </div>
                    <div className="bodyCenterHomeApp" >
                        <input 
                            className="inputPostHome" 
                            onClick={inputPostHome_fc}
                            placeholder="Bạn nghĩ gì hôm nay ?"
                        />
                        <div className="dialogPostHome">
                            <div className="dialogPostHomeTop"> 
                                <p>Ai có thể xem (KHÔNG XEM) bài viết này của bạn ?</p>
                                <button onClick={select_fc}>Select</button>
                            </div>
                            <div className="dialogPostHomeBottom"> 
                                <textarea 
                                    v-model="message" 
                                    placeholder="..." 
                                />
                                <div className="previewImgDialogPostHomes">
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                    <div className="previewImgDialogPostHome" >
                                        <button>&times;</button>
                                        <img alt=""/>
                                    </div>
                                </div>
                                <div className="previewVideoDialogPostHomes">
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                    <div className="previewVideoDialogPostHome">
                                        <button>&times;</button>
                                        <video preload="auto" controls/>
                                    </div>
                                </div>
                                <input 
                                    id="inputFileImgDialogPostHome"
                                    type="file" 
                                    hidden="hidden" 
                                    multiple
                                    ref={el}
                                />
                                <input 
                                    id="inputFileVideoDialogPostHome"
                                    type="file" 
                                    hidden="hidden" 
                                    multiple
                                    ref={el}
                                />
                                <div className="iconDialogPostHome">
                                    <PhotoLibraryIcon 
                                        fontSize="large" 
                                        style={{ color: "green" }}
                                        onClick={chooseFileImg_fc}
                                    />
                                    <VideoLibraryIcon 
                                        fontSize="large" 
                                        style={{ color: "red" }}
                                        onClick={chooseFileVideo_fc}
                                    />
                                </div>
                            </div>
                            <button onClick={postHomeBtn_fc}>POST</button>
                        </div>
                        <div className="dialogPostHome_select">
                            <div className="dialogPostHome_iconBack" onClick={dialogPostHome_back_fc}>
                                <ArrowBackIcon/>
                            </div>
                        </div>
                        <div className="notificationDialogPostHome">
                            <button>&times;</button>
                            <p>Độ dài video không được quá 10 phút</p>
                            <p>Số ảnh tối đa trong 1 lần: 10</p>
                            <p>Số video tối đa trong 1 lần: 10</p>
                        </div>
                        {allPost}
                    </div>
                    <div className="bodyRightHomeApp">
                        <ChatContainer usersOfChatContainer={usersOfChatContainer}/>
                    </div>
                </div>
            </div>
        </div>   
    )
}

export default HomeApp;