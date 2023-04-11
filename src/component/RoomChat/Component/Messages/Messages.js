import React, { useEffect, useRef, useState } from 'react';
import Message from '../Message/Message';

import './Messages.css';

const Messages = ({id, messages, online, avatar}) => {

  const [ counterMessages, setCounterMessages ] = useState(0);
  const messageEl = useRef();

  useEffect(() => {
    if(messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  const getOlderMessages = () => {
    setCounterMessages(x => x + 1);
  }

  useEffect(() => {
    
  },[counterMessages])

  return (
    <div className='messagesContainer' ref={messageEl} onScroll={getOlderMessages}>
      {messages.map((data, index) => 
        <div key={index}>
          <Message id={id} message={data} online={online} avatar={avatar}/>
          <div>{counterMessages}</div>
        </div>
      )}
    </div>
  )
}

export default Messages;