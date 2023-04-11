export const StateLogin = JSON.parse(localStorage.getItem('login'));
export const InforLogin = setInforLogin();
export const ChattingUsers = JSON.parse(localStorage.getItem('chatting'));

function setInforLogin() {
    if(StateLogin===true) {
        return JSON.parse(localStorage.getItem('userLogin'));
    }
}