import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {

    let history = useHistory()

    const inRegister = () => {
        let userRegister = document.getElementById("userRegisterId").value
        let passRegister = document.getElementById("passRegisterId").value
        let firstName = document.getElementById("firstName").value
        let lastName = document.getElementById("lastName").value
        if((userRegister!=="") && (passRegister!=="") && (firstName!=="") && (lastName!=="")) {
            axios({
                method: 'post',
                url: 'https://localhost:8000/register',
                data: {
                    userRegister: userRegister,
                    passRegister: passRegister,
                    firstName: firstName,
                    lastName: lastName
                }
            }).then(res => {
                  alert(res.data)
                  userRegister = document.getElementById("userRegisterId").value = ""
                  passRegister = document.getElementById("passRegisterId").value = ""
                  document.getElementById("firstName").value = ""
                  document.getElementById("lastName").value = ""
            })
        } else {
            alert('vui long nhap day du')
        }
    }

    const inLogin = () => {
        history.replace('/login')
    }

    return (
        <div className="register">
            <div className='tabinput'> 
                <div className="information">
                    <input id="userRegisterId" type="text" placeholder="User"/>
                </div>
                <div className="information">
                    <input id="passRegisterId" type="password" placeholder="Pass"/>
                </div>
            </div>
            <div className='tabinput'> 
                <input id="firstName" type="text" placeholder="First Name"/>
                <input id="lastName" type="text" placeholder="Last Name"/>
            </div>
            <div className='tabinput'>
                <div className="inbutton">
                    <Button type="submit" onClick={inRegister}><p>REGISTER</p></Button>
                </div>
                <div className="inbutton">
                    <Button type="submit" onClick={inLogin}><p>LOGIN</p></Button>
                </div>
            </div>
        </div>
    )
}

export default Register;
