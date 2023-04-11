import React from 'react';
import "./PostVideo.css";
import { Avatar, Button } from '@material-ui/core';
import ReactPlayer from 'react-player';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import ListVideo from "./ListVideo";
// import CommentContent from "./CommentContent.js";



function IndividualPage(){
    alert("IndividualPage");
}


function DisLikes() {
    console.log("dislikes");
}

const Likes = () => {
    console.log("likes");
}

const PostVideo = (props) => {

    const post = props;
    return (
        <div className="postVideo">
            <div className="profile">
                <p>{post.define}</p>
                <p>{post.userPost}</p>
                <Avatar url={post.avatarPost}>
                    <Button type="submit" onClick={IndividualPage} />
                </Avatar>
            </div>
            <div className="postTop">
                <div className="postIcon"> 
                    <Button type="submit" onClick={Likes}>
                        <ThumbUpOutlinedIcon color={post.likeColor}/>
                    </Button>
                    <p>{post.likes}</p>
                </div>
                <div className="postIcon"> 
                    <Button type="submit" onClick={DisLikes}>
                        <ThumbDownOutlinedIcon color={post.disLikeColor} />
                    </Button>
                    <p>{post.disLikes}</p>
                </div>
                <div className="postIcon">
                    <Button type="submit" onClick={DisLikes}>
                        <ShareOutlinedIcon />
                    </Button>
                    <p>{post.shares}</p>
                </div>
                <div className="postIcon">
                    <MoreHorizOutlinedIcon />
                </div>
            </div>
            <div>
                <ReactPlayer width="100%" height="320px" controls url={post.urlVideo} />
            </div>
            <h3>{post.textPost}</h3>
            <p>{post.time}</p>
            <div className="postBottom">
                <div className="commentPost">
                    <Avatar src={post.avatarComment}/>
                    <input placeholder="Comment" />
                    <InsertEmoticonIcon />
                    <ExpandMoreOutlinedIcon/>
                </div>
                {/* <div className="listVideo">
                    <p>{post.listVideo}</p>
                    <ExpandMoreOutlinedIcon/>
                </div> */}
            </div>
            {/* <div className="bottomContent">
                <div className="rightContent">
                    <CommentContent />
                </div>
                <div className="leftContent">
                    <ListVideo />
                </div>
            </div> */}
        </div>
    )
}

export default PostVideo;

