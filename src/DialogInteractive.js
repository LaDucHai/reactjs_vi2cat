import React, { useState, useEffect } from 'react';
import './DialogInteractive.css';
import DialogInteractiveContent from './DialogInteractiveContent';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';


let userInteractiveArray = []

let data_userInteractiveArray = [
    {
        "userInteracitive": {
            "avatar": "https://tse3.mm.bing.net/th?id=OIP.Z0GQgx5myXHmoDpkcVAdKgHaEK&pid=Api&P=0&w=329&h=186",
            "userInteractive": "Ronaldo"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    },
    {
        "userInteracitive": {
            "avatar": "https://tse2.mm.bing.net/th?id=OIP.hQ91zlcqd4Inyi2AWByRMAHaE8&pid=Api&P=0&w=248&h=166",
            "userInteractive": "Messi"
        }
    }
]

const DialogInteractive = ({a}) => {

    const [ init, setInit ] = useState(true)
    const [ moreUserInteractive, setMoreUserInteractive ] = useState(0)

    useEffect(() => {
        for (let i=0; i<data_userInteractiveArray.length; i++) {
            if(userInteractiveArray.includes(data_userInteractiveArray[i])) {
                // We don't do nothing, here
            } else {
                userInteractiveArray.push(data_userInteractiveArray[i])
            }
        }
        setInit(false)
    }, [init,moreUserInteractive])

    const dialogInteractive_body_scroll = (e) => {
        let bottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 3;
        if(bottom){
            setMoreUserInteractive(x => x + 1)
        }
    }

    let allUserInteractive = userInteractiveArray.map((data, index) => {
        return (
            <div key={index}>
                <DialogInteractiveContent {...data.userInteracitive}/>
            </div>
        )
    })

    document.querySelectorAll(".interactiveBtn p").forEach((event, index) => {
        event.onclick = function() {
            if(document.querySelectorAll(".dialogInteractive p")[index]===null) return
            document.querySelectorAll(".dialogInteractive")[(index-index%3)/3].classList.add('active')
            document.getElementById("overlay").classList.add('active')
            document.querySelectorAll(".dialogInteractive_icon")[index].classList.add('active')
            document.querySelectorAll(".dialogInteractive-body")[index].classList.add('active')
            document.getElementById("overlay").onclick = function() {
                document.querySelectorAll(".dialogInteractive")[(index-index%3)/3].classList.remove('active')
                document.getElementById("overlay").classList.remove('active')
                document.querySelector(".dialogInteractive_icon.active").classList.remove('active')
                document.querySelector(".dialogInteractive-body.active").classList.remove('active')
            }
            document.querySelectorAll(".dialogInteractive-close")[(index-index%3)/3].onclick = function() {
                document.querySelectorAll(".dialogInteractive")[(index-index%3)/3].classList.remove('active')
                document.getElementById("overlay").classList.remove('active')
                document.querySelector(".dialogInteractive_icon.active").classList.remove('active')
                document.querySelector(".dialogInteractive-body.active").classList.remove('active')
            }
        }
    })

    document.querySelectorAll(".dialogInteractive_icon").forEach((event, index) => {
        event.addEventListener('click', () => {
            document.querySelector(".dialogInteractive_icon.active").classList.remove('active')
            document.querySelector(".dialogInteractive-body.active").classList.remove('active')
            event.classList.add('active')
            document.querySelectorAll(".dialogInteractive-body")[index].classList.add('active') 
        })
    })

    return (
        <div className="dialogInteractive">
            <div className="dialogInteractive-header">
                <div className="dialogInteractive-title">ALL</div>
                <div className="dialogInteractive_icons">
                    <ThumbUpOutlinedIcon className="dialogInteractive_icon" color="primary"/>
                    <ThumbDownOutlinedIcon className="dialogInteractive_icon" color="secondary"/>
                    <ShareOutlinedIcon className="dialogInteractive_icon" color="action"/>
                </div>
                <button className="dialogInteractive-close">&times;</button>
            </div>
            <div className="dialogInteractive-body" onScroll={dialogInteractive_body_scroll}>
                {allUserInteractive}
                <p>0000{a}</p>
            </div>
            <div className="dialogInteractive-body" onScroll={dialogInteractive_body_scroll}>
                {allUserInteractive}
                <p>1111{a}</p>
            </div>
            <div className="dialogInteractive-body" onScroll={dialogInteractive_body_scroll}>
                {allUserInteractive}
                <p>2222{a}</p>
            </div>
        </div>
    )
}

export default DialogInteractive;
