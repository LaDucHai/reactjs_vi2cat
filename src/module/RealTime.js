import { io } from 'socket.io-client';

const ENDPOINT = "https://localhost:8000";
const socket = io(ENDPOINT)

export const Online = (id) => {
    socket.emit('clientServer-online', id, err => {
        if(err) console.error(err)
    });
}

// Notifications
export const sendNotifications = ( idSend, idReceive, contentNotification ) => {
    socket.emit('clientServer-Notifications', {idSend, idReceive, contentNotification}, err => {
        if(err) console.error(err)
    })
}
export const getNotifications = (callBack) => {
    socket.on('serverClient-Notifications', ({idSend, idReceive, contentNotification})=> {                                        
        callBack( idSend, idReceive, contentNotification );
    })
}
export const getNumberNotifications = (callBack) => {
    socket.on('serverClient-numberNotifications', data => {
        callBack(data);
    })
}

// Send Online
export const sendOnline = (callBack) => {
    socket.on('serverClient-sendOnline', idSendOnline => {
        callBack(idSendOnline);
    })
}
export const getOnline = (id, callBack) => {
    socket.emit('clientServer-getOnline', id)
    socket.on('serverClient-getOnline', idGetOnline => {
        callBack(idGetOnline);
    })
}

// Chatting
export const sendMessage = (idSend, idReceive, messageContent) => {
    socket.emit('clientServer-sendMessage', {idSend, idReceive, messageContent})
}
export const getMessage = (callBack) => {
    socket.on('serverClient-sendMessage', ({idSend, idReceive, messageContent, timestamp}) => {
        callBack(idSend, idReceive, messageContent, timestamp);
    })
}

// Call Video
export const sendCallVideo = (idSend, idReceive) => {
    socket.emit('clientServer-sendCallVideo', ({idSend, idReceive}))
}
export const getCallVideo = (callBack) => {
    socket.on('serverClient-getCallVideo', ({idSend, idReceive}) => {
        callBack(idSend, idReceive);
    })
}
export const sendAcceptCallVideo = (idSend, idReceive) => {
    socket.emit('clientServer-sendAcceptCallVideo', ({idSend, idReceive}))
}
export const getAcceptCallVideo = (callBack) => {
    socket.on('serverClient-getAcceptCallVideo', callVideoRoom => {
        callBack(callVideoRoom);
    })
}
export const sendCancelCallVideo = (idSend, idReceive) => {
    socket.emit('clientServer-sendCancelCallVideo', ({idSend, idReceive}))
}
export const getCancelCallVideo = (callBack) => {
    socket.on('serverClient-getCancelCallVideo', () => {
        callBack();
    })
}
export const sendSignalOfStreamVideo = (callVideoRoom, signal) => {
    socket.emit('clientServer-sendSignalOfStreamVideo', ({callVideoRoom, signal}));
}
export const getSignalOfStreamVideo = (callBack) => {
    socket.on('serverClient-getSignalOfStreamVideo', signal => {
        callBack(signal);
    })
}

// Offline
export const Offline = (id) => {
    socket.emit('clientServer-offline', id, err => {
        if(err) console.error(err)
    });
}
export const sendOffLine = (callBack) => {
    socket.on('serverClient-sendOffline', idSendOffline => {
        callBack(idSendOffline)
    })
}