import React, { useState, useEffect } from 'react';
import './UserComment.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import UserReplyComment from './UserReplyComment';


const UserComment = (props) => {   
    
    let arrImgComment = []
    arrImgComment = props.imageCommentPost

    const [ replyComment, setReplyComment ] = useState(false);
    const [ init, setInit ] = useState(false)

    useEffect(() => { 
        setInit(true)
    }, [init])

    const reply = () => {
        let contentReplyComment = document.querySelector(".contentReplyComment");
        let replyComment_btn = document.querySelector(".replyComment");
        replyComment_btn.value = `${props.userComment} `; 
        if (replyComment===false) {
            replyComment_btn.style.display="block";
            contentReplyComment.style.display="block";
            setReplyComment(true);
        } else {
            replyComment_btn.style.display="none";
            contentReplyComment.style.display="none";
            setReplyComment(false);
        }
        replyComment_btn.focus();
    }

    const imgComment_fc = () => {
        document.querySelectorAll(".allImgComment img").forEach((event, index) => {
            event.addEventListener('click', () => {
                document.querySelector(".allImgComment img.active").classList.remove('active')
                document.querySelectorAll(".allImgComment img")[index].classList.add('active')
                document.querySelectorAll(".imgComment")[(index-index%10)/10].src=props.imageCommentPost[index%10]
            })
        })
    }

    document.querySelectorAll(".allImgComment img").forEach((e,i) => {
        if(document.querySelectorAll(".allImgComment img")[i].src!=="") {
            document.querySelectorAll(".allImgComment img")[i].style.display="block"
        }
    })
    
    const pathImg_fc = (e) => {
        window.open(e.target.currentSrc)
    }

    return (
        <div className="userComment">
            <div className="userCommentTop">
                <div className="userCommentBG">
                    <div className="userCommentInfo">
                        <AccountCircleIcon />
                        <p>{props.userComment.firstName + " " + props.userComment.lastName}</p>
                        <div className="userCommentDefine">
                            <p>{props.define}</p>
                        </div>
                    </div>
                    <div className="contentCommentPerson">
                        <p>{props.contentComment}</p>
                    </div>
                </div>
                <div className="moreCommentOptions">
                    <MoreVertIcon />
                </div>
            </div>
               
            <div className="imgCommentContainer">
                <img 
                    className="imgComment" 
                    onClick={pathImg_fc}
                    src={arrImgComment[0]} 
                    alt=""
                />
                <div className="allImgComments" onClick={imgComment_fc}>
                    <div className="allImgComment">
                        <img className="active" src={arrImgComment[0]} alt=""/>
                        <img src={arrImgComment[1]} alt=""/>
                        <img src={arrImgComment[2]} alt=""/>
                        <img src={arrImgComment[3]} alt=""/>
                        <img src={arrImgComment[4]} alt=""/>
                    </div>
                    <div className="allImgComment">
                        <img src={arrImgComment[5]} alt=""/>
                        <img src={arrImgComment[6]} alt=""/>
                        <img src={arrImgComment[7]} alt=""/>
                        <img src={arrImgComment[8]} alt=""/>
                        <img src={arrImgComment[9]} alt=""/>
                    </div>
                </div>
            </div>
            
            <div className="commentInteractive">
                <p type="submit" onClick={reply}>Reply</p>
                <p>{props.numbersReplyComment}</p>
                <p>Like</p>
                <p>{props.numbersLikeComment}</p>
                <p>DisLike</p>
                <p>{props.numbersDisLikeComment}</p>
                <p>{`Time ${props.timeComment}`}</p>
            </div>
            <input className="replyComment" type="text" placeholder="Comment" />
            <div className="contentReplyComment">
                <UserReplyComment {...props}/>
                <p>More ...</p>
            </div>
        </div>
    )
}

export default UserComment;
