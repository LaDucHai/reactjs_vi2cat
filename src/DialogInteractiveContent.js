import React from 'react';
import './DialogInteractiveContent.css';
import { Avatar } from '@material-ui/core';

function DialogInteractiveContent(props) {
    return (
        <div className="dialogInteractiveContent">
            <div className="dialogInteractiveContent-body-left">
                <Avatar src={props.avatar} alt=""/>
                <p>{props.userInteractive}</p>
            </div> 
            <div className="dialogInteractiveContent-body-right">
                <button>Add Friend</button>
            </div> 
        </div>
    )
}

export default DialogInteractiveContent;
