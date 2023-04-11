import React, { useState, useEffect, useRef } from 'react';
import './PostHome.css';
import UserComment from './UserComment.js';
import { Avatar } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import DialogInteractive from './DialogInteractive.js';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AttachmentIcon from '@material-ui/icons/Attachment';
import axios from 'axios';


let allPost = []

const PostHome = (props) => {
    
    const [ showComment, setShowComment ] = useState(false);
    const [ moreComment, setMoreComment ] = useState(0);
    const [ likeColorPost, setLikeColorPost ] = useState(() => {
        if(localStorage.getItem('login')==='true') {
            if (props.allUserLike.includes(JSON.parse(localStorage.getItem("userLogin")).id.toString())) {
                return "primary"
            } else {
                return 
            }
        } else {
            return
        }
    })
    const [ likesNumberPost, setLikesNumberPost ] = useState(props.likesNumberPost)
    const [ disLikeColorPost, setDisLikeColorPost ] = useState(() => {
        if(localStorage.getItem('login')==='true') {
            if (props.allUserDisLike.includes(JSON.parse(localStorage.getItem("userLogin")).id.toString())) {
                return "secondary"
            } else {
                return 
            }
        } else {
            return
        }
    })
    const [ disLikesNumberPost, setDisLikesNumberPost ] = useState(props.disLikesNumberPost)
    const commentsNumberPost = props.commentsNumberPost
    const [ file, setFile ] = useState([])
    const [ data, getFile ] = useState({ name: "", path: "" })
    const [ progress, setProgess ] = useState(0)
    const el = useRef()
    const [ commentPost, setCommentPost ] = useState([])
    const [ init, setInit ] = useState(false)
    
    useEffect(() => {
        setInit(true)
    }, [init, moreComment ])

    useEffect(() => {
        if(!allPost.includes(props.idPost)) {
            allPost.push(props.idPost)
        }
    }, [props.idPost])
    
    function getComment(i, arr, statusGetComment) {
        let formData = new FormData()
        formData.append('numberCommentPost', i)
        formData.append('idUserPost', props.userInformationPost.id)
        formData.append('idPost', props.idPost)
        axios.post('https://localhost:8000/getcomment', formData)
        .then(res => {
            if(res.data.getComment===true){
                arr.push(res.data.data)
                if(statusGetComment===true) {
                    setCommentPost(arr.concat(commentPost))
                } else {
                    setCommentPost(commentPost.concat(arr))
                }
                setMoreComment(x => x + 1)
            }
        }).catch(err => console.error(err))
    }

    const moreComment_fc = (e) => {
        let arr = []
        let bottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 3;
        if(bottom){
            getComment(moreComment, arr, false)
            setMoreComment(x => x + 1)
        }
    }

    let allComment = commentPost.map((data, index) => {
        return (
            <div key={index}>
                <UserComment {...data}/>
            </div>
        )
    })

    const inputEnterPress = (e) => {
        if(e.charCode===13) {
            if(localStorage.getItem("login")==='true') {
                upload_file_comment()   
                let preview_img = document.querySelectorAll(".preview_img_commentPost")
                let preview_img_btn = document.querySelectorAll(".preview_img_btn") 
                preview_img.forEach((e,i) => {
                    preview_img[i].style.display="none"
                    preview_img_btn[i].style.display="none"
                })
            } else {
                alert('Vui long dang nhap')
            }
        }
    }

    function sendComment(arrImg) {
        if(arrImg.length===file.length) {
            for(let i=0; i<allPost.length; i++) {
                let inputCommentPost = document.querySelectorAll(".inputCommentPost input")[i].value
                if(allPost[i]===props.idPost) {
                    if((inputCommentPost!=="") || (arrImg.length!==0)) {
                        const formDataText = new FormData()
                        formDataText.append("idUserPost", props.userInformationPost.id)
                        formDataText.append("idPost", props.idPost)
                        formDataText.append("contentComment", inputCommentPost)
                        formDataText.append("imageComment", JSON.stringify({"arrImg": arrImg}))
                        formDataText.append("idUserComment", JSON.parse(localStorage.getItem("userLogin")).id)
                        axios.post('https://localhost:8000/postcomment', formDataText)
                        .then(res => {
                            console.log(res.data)
                            let arr = []
                            for(let i=0; i<moreComment; i++) {
                                getComment(i, arr, true)
                            }
                            showEnterComment()
                        }).catch(err => {
                            console.error(err)
                        })
                    } 
                    document.querySelectorAll(".inputCommentPost input")[i].value = "" 
                }
            }   
        } 
    }

    const upload_file_comment = () => {
        let arrImg = []
        if(file.length>0) {
            //show progessBar
            // document.querySelector(".progessBar").style.display="block" 
            for(let i=0; i<=file.length; i++) {
                const formDataImg = new FormData()
                formDataImg.append('file', file[i])
                axios.post('https://localhost:8000/upload', formDataImg, {
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(
                        ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                        setProgess(progress)
                }
                }).then(res => {
                    getFile({ name: res.data.name,
                        path: 'https://localhost:8000' + res.data.path
                    })
                    arrImg.push('https://localhost:8000' + res.data.path)
                    sendComment(arrImg)
                })
                .catch(err => console.log(err))
            }
        } else {
            sendComment(arrImg)
        }
    }

    const handleChange_fileInputComment = (e) => {
        setProgess(0)
        const file_hc = e.target.files
        // console.log(file_hc)
        setFile(file_hc)
    }

    const showEnterComment = () => {
        let showComment_id = document.getElementById(`contentComment_id:${props.userInformationPost.id}`)
        if(showComment===false) {
            showComment_id.style.display="block";
            setShowComment(true)
            if(moreComment<3) {
                let arr = [] 
                for(let i=0; i<3; i++) {
                    getComment(i, arr, true)
                }
            }
        }  
    }

    const commentShow = () => {
        let showComment_id = document.getElementById(`contentComment_id:${props.userInformationPost.id}`)
        if(showComment===false) {
            showComment_id.style.display="block";
            setShowComment(true)
        } else {
            showComment_id.style.display="none";
            setShowComment(false)
        }
        if(moreComment<3) {
            let arr = [] 
            for(let i=0; i<3; i++) {
                getComment(i, arr)
            }
        }
    }

    const moreOptionsPost = () => {
        console.log('moreOptionsPost')
    }

    let history = useHistory();
    const callPersonalPage = () => {
        history.replace(`/user${props.userInformationPost.id}`) 
        window.location.reload(true)
    }

    const like_fc = () => {
        let formData = new FormData()
        if(localStorage.getItem("login")==='true') {
            if(likeColorPost==="primary") {
                setLikeColorPost()  
                setLikesNumberPost(x => x - 1) 
                formData.append('like', false) 
            } else {
                setLikeColorPost("primary")
                setLikesNumberPost(x => x + 1) 
                formData.append('like', true) 
            }
            formData.append('idUserLike', JSON.parse(localStorage.getItem("userLogin")).id)
            formData.append('idPost', props.idPost)
            formData.append('idUserPost', props.userInformationPost.id)
            axios.post('https://localhost:8000/postlike', formData)
        } else {
            alert("Vui long dang nhap")
        }
    }

    function showHover_usersLike(){
        console.log("showHover_usersLike");
    }
    function non_showHover_usersLike(){
        console.log("non_showHover_usersLike");
    }

    const disLike_fc = () => {
        let formData = new FormData()
        if(localStorage.getItem("login")==='true') {
            if(disLikeColorPost==="secondary") {
                setDisLikeColorPost()
                setDisLikesNumberPost(x => x - 1)
                formData.append('disLike', false)
            } else {
                setDisLikeColorPost("secondary")
                setDisLikesNumberPost(x => x + 1)
                formData.append('disLike', true)
            }
            formData.append('idUserDisLike', JSON.parse(localStorage.getItem("userLogin")).id)
            formData.append('idPost', props.idPost)
            formData.append('idUserPost', props.userInformationPost.id)
            axios.post('https://localhost:8000/postdislike', formData)
        } else {
            alert("Vui long dang nhap")
        }
    }
    
    function showHover_usersDisLike(){
        console.log("showHover_usersDisLike");
    }
    function non_showHover_usersDisLike(){
        console.log("non_showHover_usersDisLike");
    }
   
    const commentFile_fc = () => {
        for(let i=0; i<allPost.length; i++) {
            if(allPost[i]===props.idPost) {
                let defaultFile = document.querySelectorAll(".file_inputCommentPost")
                let preview_img = document.querySelectorAll(".preview_img_commentPost")
                let preview_img_btn = document.querySelectorAll(".preview_img_btn")
                defaultFile[i].click()
                preview_img.forEach((e, index) => {
                    if(index<10) {
                        defaultFile[i].addEventListener('change', () => {
                            const files = defaultFile[i].files[index]
                            if(files) {
                                const fileReader = new FileReader();
                                fileReader.addEventListener("load", function () {
                                    preview_img_btn[index+10*i].style.display="block"
                                    preview_img[index+10*i].style.display="block"
                                    preview_img[index+10*i].setAttribute("src", this.result)
                                })
                                fileReader.readAsDataURL(files)
                            } 
                        })
                    }
                    preview_img_btn[index].addEventListener('click', () => {
                        preview_img[index].setAttribute("src", null)
                        preview_img_btn[index].style.display="none"
                        preview_img[index].style.display="none"
                    })
                })
            }
        }
    }

    function pathImgPost_fc(e) {
        window.open(e.target.currentSrc)
    }

    const allImage_fc = (e) => {
        let idContentImg = document.getElementById(`idContentImg${props.userInformationPost.id}${props.idPost}`)
        let idContentVideo = document.getElementById(`idContentVideo${props.userInformationPost.id}${props.idPost}`)
        let contentVideo = document.querySelector(`#idContentVideo${props.userInformationPost.id}${props.idPost} video`)
        idContentVideo.style.display = "none"
        idContentImg.style.display = "block"
        idContentImg.src = e.target.currentSrc
        contentVideo.src = ""
    }

    const allVideo_fc = (e) => {
        let idContentImg = document.getElementById(`idContentImg${props.userInformationPost.id}${props.idPost}`)
        let idContentVideo = document.getElementById(`idContentVideo${props.userInformationPost.id}${props.idPost}`)
        let contentVideo = document.querySelector(`#idContentVideo${props.userInformationPost.id}${props.idPost} video`)
        idContentImg.style.display = "none"
        idContentVideo.style.display = "block"
        contentVideo.src = e.target.currentSrc
    }

    if(init===true) {
        if(props.imagePost.length===0) {
            document.getElementById(`idContentImg${props.userInformationPost.id}${props.idPost}`).style.display='none'
        }
        if(props.videoPost.length===0) {
            document.getElementById(`idContentVideo${props.userInformationPost.id}${props.idPost}`).style.display='none'
        }
    }

    return (
        <div className="postHome">
            <div className="postTop">
                <div className="userPost">
                    <div className="userPostName">
                        <Avatar 
                            src={props.userInformationPost.avatar} 
                            alt="" 
                            onClick={callPersonalPage} 
                        />
                    </div>
                    <div className="userPostName">
                        <p>{props.userInformationPost.firstName + " " + props.userInformationPost.lastName}</p>
                    </div>
                    <div className="userPostDefine">
                        <p>{props.userInformationPost.defineUserPost}</p>
                    </div>
                    <div className="timePost">
                        <p>{props.timePost}</p>
                    </div>
                </div>
                <div className="morePostOptions">
                    <MoreVertIcon onClick={moreOptionsPost}/>
                </div>
            </div>

            <div className="contentText">
                <p>{props.contentPost}</p>
            </div>

            <div className="contentImgVideo">
                <img 
                    id={`idContentImg${props.userInformationPost.id}${props.idPost}`}
                    src={props.imagePost[0]} 
                    onClick={pathImgPost_fc}
                    width="100%" 
                    alt=""
                />
                <ReactPlayer 
                    className="reactPlayer" 
                    id={`idContentVideo${props.userInformationPost.id}${props.idPost}`}
                    controls
                    url={props.videoPost[0]}
                />
            </div>
            <div className="allImgVideoPost">
                <div className="allImage" onClick={allImage_fc}>
                    <img 
                        src={props.imagePost[0]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[1]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[2]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[3]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[4]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[5]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[6]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[7]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[8]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                    <img 
                        src={props.imagePost[9]} 
                        width="50px"
                        height="50px"
                        alt=""
                    />
                </div>
                <div className="allVideo" onClick={allVideo_fc}>
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[0]}
                    />
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[1]}
                    />
                    <ReactPlayer 
                        className="reactPlayers" 
                        width="50px"
                        height="80px"
                        url={props.videoPost[2]}
                    />
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[3]}
                    />
                    <ReactPlayer 
                        className="reactPlayers" 
                        width="50px"
                        height="80px"
                        url={props.videoPost[4]}
                    />
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[5]}
                    />
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[6]}
                    />
                    <ReactPlayer 
                        className="reactPlayers" 
                        width="50px"
                        height="80px"
                        url={props.videoPost[7]}
                    />
                    <ReactPlayer  
                        className="reactPlayers"
                        width="50px"
                        height="80px"
                        url={props.videoPost[8]}
                    />
                    <ReactPlayer 
                        className="reactPlayers" 
                        width="50px"
                        height="80px"
                        url={props.videoPost[9]}
                    />
                </div>
            </div>

            <div className="interactive">
                <DialogInteractive a={props.userInformationPost.userLogin}/>
                <div className="interactiveBtn">
                    <ThumbUpOutlinedIcon 
                        color={likeColorPost} 
                        onClick={like_fc} 
                    />
                    <p 
                        onMouseOver={showHover_usersLike} 
                        onMouseOut={non_showHover_usersLike}
                    >
                        {likesNumberPost}
                    </p>
                </div>
                <div className="interactiveBtn">
                    <ThumbDownOutlinedIcon 
                        color={disLikeColorPost} 
                        onClick={disLike_fc}
                    />
                    <p 
                        onMouseOver={showHover_usersDisLike} 
                        onMouseOut={non_showHover_usersDisLike}
                    >
                        {disLikesNumberPost}
                    </p>
                </div>
                <div className="interactiveBtn">
                    <ShareOutlinedIcon />
                    <p>{props.sharesNumberPost}</p>
                </div>
            </div>

            <div className="comment">
                <div className="inputCommentPost">
                    <input 
                        onKeyPress={inputEnterPress} 
                        type="text" 
                        placeholder="Comment ....." 
                    />
                    <SentimentVerySatisfiedIcon />
                    <AttachmentIcon onClick={commentFile_fc}/>
                </div>
                <p>{commentsNumberPost}</p>
                <ExpandMoreIcon type="submit" onClick={commentShow}/>
            </div>
            <div className="containers_preview_img_commentPost">
                <input type="file" className="file_inputCommentPost" hidden="hidden" multiple ref={el} onChange={handleChange_fileInputComment}/>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
                <div className="container_preview_img_commentPost">
                    <img src="" alt="" className="preview_img_commentPost"/>
                    <button className="preview_img_btn">&times;</button>
                </div>
            </div>
            <div className="previewImg">
                {data.path && <img src={data.path} alt={data.name}/>}
            </div>
            <div className="progessBar" style={{ width: progress }}>
                {progress}
            </div>
            <div 
                className="contentComment"
                onScroll={moreComment_fc} 
                id={`contentComment_id:${props.userInformationPost.id}`} 
            >
                {allComment}
            </div>
        </div>
    )
}

export default PostHome;