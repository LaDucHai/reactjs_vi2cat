import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import HomeApp from "./HomeApp";
import Login from './Login';
import VideoApp from "./VideoApp";
import Register from './Register';
import DivPost from './DivPost';
import PersonalPage from './PersonalPage';
import { Offline, Online } from './module/RealTime';
import AppMain from './AppMain'
import Overlay from './component/OverLay/Overlay';
import OverlayHidden from './component/OverLay/OverlayHidden';
import { Title } from './component/Title/Title';
import ChatRoomContainer from './component/RoomChat/ChatRoomContainer';
import CallVideoDialog from './component/RoomChat/Component/CallVideo/CallVideoDialog/CallVideoDialog';
import CallVideo from './component/RoomChat/Component/CallVideo/CallVideo';
import { InforLogin, StateLogin } from './component/Constant/Constant';

function App() {

  useEffect(() => {
    if(StateLogin===true) {
      Online(InforLogin.id);
      Offline(InforLogin.id);
      Title();
    }
  },[])

  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/" exact component={AppMain}/>
        <Route path="/post" exact component={DivPost}/>
        <Route path="/videoApp" exact component={VideoApp}/>
        <Route path="/homeApp" exact component={HomeApp}/>
        <Route path="/user:id" exact component={PersonalPage} />
        <Route path="/CallVideo/callVideoRoom:callVideoRoom" exact component={CallVideo} />
      </Switch>
      <ChatRoomContainer />
      <CallVideoDialog />
      <Overlay />
      <OverlayHidden />
    </>
  )
}

export default App;




