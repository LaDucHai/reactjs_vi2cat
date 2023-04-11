import { io } from 'socket.io-client'

const ENDPOINT = "https://localhost:8000";
const socket = io(ENDPOINT)

export const Online = () => {
    socket.emit('clientServer-online', 'online')
    socket.on('serverClient-online', data => {
        console.log(data)
    })
}