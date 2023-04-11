import React from 'react';
import './Input.css';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';


const Input = ({message, setMessage, sendMessage}) => {  

    const InputChange = (e) => {
        e.target.rows = (e.target.value.length-e.target.value.length%26)/26 + 1
        setMessage(e.target.value)
    }

    return (
        <div className='inputContainer'>
            <div className='inputComponent'>
                <AttachFileIcon />
            </div>
            <div className='inputComponent'>
                <textarea
                    rows='1'
                    value={message}
                    onChange={InputChange}
                    onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
                />
            </div>
            <div className='inputComponent'>
                <SendIcon color='primary' onClick={(e) => sendMessage(e)}/>
            </div>
        </div>
    )
}

export default Input;