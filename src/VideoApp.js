import React, { useState, useEffect } from 'react';
import "./VideoApp.css";
import GetData from './GetData.js';
import Header from "./Header";
import Comment from './Comment';
import ListVideo from './ListVideo';


let sttVideo = ['users', 'abc', 'users', 'abc', 'users', 'abc', 'users', 'abc', 'users', 'abc', 'users', 'abc'];
let data = [{'api': `http://localhost:1000/${sttVideo[0]}`}, {'api': `http://localhost:1000/${sttVideo[1]}`}];
function VideoApp() {  

    const [ counter, setCounter ] = useState(0); 

    useEffect(() => {
        return () => {
            if (counter > 2) {
                data.push({'api': `http://localhost:1000/${sttVideo[counter]}`});
            }      
        };
    }, [counter]);

    function loadData(e){
        let bottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20;
        if((counter < 12) && bottom){
            setCounter(x => x + 1);
        }
        
    }
    
    let getPostAPI = data.map((api, index) => {
        return (
            <div key={index}>
                <GetData api={api.api}></GetData>
            </div>
        )
    })
    
    return (
        <div>
            <Header />
            <div className="tabLeft">
                <div className="comment">
                    <Comment />
                </div>
                <div className="listVideo">
                    <ListVideo />
                </div>
            </div>
            <div className="tabRight">right</div>
            <div onScroll={loadData} className="videoApp">
                <p></p>
                <div className="postVideo">
                    {getPostAPI}
                </div>
                <p></p>
            </div>  
        </div>
        
    )           
}

export default VideoApp;
