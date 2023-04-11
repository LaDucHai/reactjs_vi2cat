import React, { useEffect } from 'react';
import './UserReplyComment.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';



const UserReplyComment = (props) => {

    useEffect(() => {
        
    }, [])
    

    const reply_fc = () => {
        let replyComment_id = document.getElementById(`replyComment_id:${props.userComment}`);
        replyComment_id.value = `${props.userReplyComment} `;
        replyComment_id.focus();
    }

    const like_fc = () => {

    }

    return (
        <div className="userReplyComment">
            <div className="userCommentTop">
                <div className="userCommentBG">
                    <div className="userCommentInfo">
                        <AccountCircleIcon /> 
                        <p>{props.userReplyComment}</p>
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
            
            <div className="commentInteractive">
                <p type="submit" onClick={reply_fc}>Reply</p>
                <p>{props.replyNumber}</p>
                <p type="submit" onClick={like_fc}>Like</p>
                <p>{props.replyLikeNumber}</p>
                <p>DisLike</p>
                <p>{props.replyDisLikeNumber}</p>
                <p>Time {props.replyTime}</p>
            </div>
        </div>
    )
}

export default UserReplyComment;
