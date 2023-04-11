import React, { useEffect, useState } from 'react';
import './CallVideo.css';

import { useParams } from 'react-router';
import Peer from 'simple-peer';
import { getSignalOfStreamVideo, sendSignalOfStreamVideo } from '../../../../module/RealTime';



const CallVideo = () => {

    const { callVideoRoom } = useParams();
    const [ init, setInit ] = useState(false);

    let smallVideoGrid
    let myVideo
    let largeVideoGrid
    let remoteVideo

    useEffect(() => {
        setInit(true);
    },[init])

    if(init) {
        smallVideoGrid = document.querySelector('.smallFrameCallVideo');
        myVideo = document.getElementById('myVideoCallVideo');

        largeVideoGrid = document.querySelector('.largeFrameCallVideo');
        remoteVideo = document.getElementById('remoteVideoCallVideo');

        myVideo.muted = true;
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            addMyVideoStream(myVideo, stream);
            gotMedia(stream);
        }).catch(err => console.error(err));
    }

    const addMyVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        smallVideoGrid.append(video);
    }

    const addRemoteVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
            video.play();
        })
        largeVideoGrid.append(video);
    }

    function gotMedia (stream) {
        let peer1 = new Peer({ initiator: true, stream: stream })
        let peer2 = new Peer();

        peer1.on('signal', signal => {
            sendSignalOfStreamVideo(callVideoRoom, signal)
        })

        peer2.on('signal', signal => {
            sendSignalOfStreamVideo(callVideoRoom, signal)
        })

        getSignalOfStreamVideo((signal) => {
            peer1.signal(signal);
            peer2.signal(signal);

            peer2.on('stream', remoteStream => {
                addRemoteVideoStream(remoteVideo, remoteStream);
            })
        })
    }
    
    return (
        <div className='callVideo'>
            <div className='largeFrameCallVideo'>
                <video id='remoteVideoCallVideo' controls/>
            </div>
            <div className='smallFrameCallVideo'>
                <video id="myVideoCallVideo" controls/>
            </div>
        </div>
    )
}

export default CallVideo;