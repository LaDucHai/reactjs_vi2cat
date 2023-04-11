import React from 'react';
import './MessageFeeling.css';

const MessageFeeling = ({messageFeeling, messageFeelingUser}) => {
    
    const ShowUser = () => {

    }

    const OffShowUser = () => {

    }

    return (
        <div className='messageFeeling' onMouseOver={ShowUser} onMouseOut={OffShowUser}>
            <div></div>
            {messageFeeling}
        </div>         
    )
}

export default MessageFeeling;