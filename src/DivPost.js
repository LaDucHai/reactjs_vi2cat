import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './DivPost.css';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import AttachmentIcon from '@material-ui/icons/Attachment';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';


function DivPost() {

    const [ choose_img, setChoose_img ] = useState(true);
    useEffect(() => {
        if(choose_img===true) {
            const preview_img = document.getElementById("preview_img");
            const defaultFile = document.getElementById("default-file");
            const customBtn = document.getElementById("custom-btn");
            customBtn.addEventListener("click", function () {
                defaultFile.click();
            });

            defaultFile.addEventListener("change", function () {
                const files = defaultFile.files[0]; 
                if (files) {
                    preview_img.style.display="block";
                        
                    const fileReader = new FileReader();
                
                    fileReader.addEventListener("load", function () {
                    
                    preview_img.setAttribute("src", this.result);
                    // console.log(this.result);
                    });
                fileReader.readAsDataURL(files);
                }
            });
        }
        return () => {
            setChoose_img(false)
        }
    }, [choose_img])
    
  
    const post = () => {
        console.log('POST');
    }

    return (
        <div className="divPost">
            <div className="divPostLeft">
                <Avatar src="http://xemanhdep.com/wp-content/uploads/2013/03/anh-nguoi-dep.jpg" alt=""/>
                <div className="textStatus">
                    <input id="statusId" type="text" placeholder="What are you doing ?"/>
                </div>
                
                <div className="textStatus">
                    <p>fdfsd</p>
                    <img src="" id="preview_img" alt=""/>
                </div>
                
                <div className="optionsStatus">
                    <div className="optionStatus">
                        <LiveTvIcon fontSize="large" color="secondary"/>
                    </div>
                    <div className="optionStatus">
                        <input type="file" id="default-file" hidden="hidden" />
                        <button id="custom-btn" type="button" ><PhotoLibraryIcon fontSize="large" style={{ color: "green" }} /></button>
                    </div>
                    <div className="optionStatus">
                        <AttachmentIcon fontSize="large" color="action"/>
                    </div>
                </div>
                <div className="btnPost">
                    <Button type="submit" onClick={post}>POST</Button>
                </div>
            </div>
            <div className="divPostRight">
                <p>af</p>
            </div>
            
            
        </div>
    )
}

export default DivPost;
