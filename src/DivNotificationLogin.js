import React from 'react';
import { Button } from '@material-ui/core';
import './DivNotificationLogin.css';
import { Link } from 'react-router-dom';


const DivNotificationLogin = () => {
    return (
        <div className="divNotificationLogin">
            <p>Do you want to Login ?</p>
            <Button type="submit">
                <Link to="/login">LOGIN</Link>
            </Button>
        </div>
    )
}  
export default DivNotificationLogin;




