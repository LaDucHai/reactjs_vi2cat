import React from 'react';
import './Login.css';

import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { AddressAPI } from './component/AddressAPI/AddressAPI';


const Login = () => {

  localStorage.setItem('login', false)
  localStorage.setItem("userLogin", null)
  let history = useHistory();

  const inRegister = () => {
    history.replace("/register");
  }

  const inLogin = () => {
    let userLogin = document.getElementById("userId").value;
    let passLogin = document.getElementById("passId").value;
    axios({
      method: 'post',
      url: `${AddressAPI}login`,
      data: {
        userLogin: `${userLogin}`,
        passLogin: `${passLogin}`
      }
    }).then(res => {
        if(res.data.message==="Login success") {
          history.replace("/");
          localStorage.removeItem("userLogin", null)
          localStorage.setItem("userLogin", JSON.stringify(res.data.data))
          localStorage.setItem('login', true)
          window.location.reload(true)
          localStorage.setItem('chatting', JSON.stringify({'chatting': []}))
        } else {
          alert(res.data.message)
          localStorage.setItem("userLogin", 123456789)
        }
    })
  }

  return (
    <div className="login">
      <div className='tabinput'> 
        <div className="information">
          <input id="userId" type="text" placeholder="User"/>
        </div>
        <div className="information">
          <input id="passId" type="password" placeholder="Pass"/>
        </div>
      </div>
      <div className='tabinput'>
        <div className="inbutton">
          <Button type="submit" onClick={inLogin}><p>LOGIN</p></Button>
        </div>
        <div className="inbutton">
          <Button type="submit" onClick={inRegister}><p>REGISTER</p></Button>
        </div>
      </div>
    </div>
  )
}

export default Login;