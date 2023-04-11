import React from 'react';
import './Notifications.css';
import Notification from './Notification';


const Notifications = (props) => {

    let notifications = props.dataNotifications.map((data, index) => {
        return (
            <div key={index}>
                <Notification {...data}/>
            </div>
        )
    })

    return (
        <div className='notifications'>
            {notifications}
        </div>
    )
}

export default Notifications;