import React from 'react';
import './ListFeeling.css';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { InforLogin } from '../../../../Constant/Constant';

const ListFeeling = ({id, timing, setMessageFeeling, setMessageFeelingUser}) => {

    const SetMessageFeelingFC = (param) => {
        switch(param) {
            case 0:
                setMessageFeeling(<ThumbUpAltIcon style={{fontSize: 15, color: 'blue'}}/>);
                break;
            case 1:
                setMessageFeeling(<EmojiEmotionsIcon style={{fontSize: 15, color: 'yellow'}}/>);
                break;
            case 2:
                setMessageFeeling(<MoodBadIcon style={{fontSize: 15, color: 'yellow'}}/>);
                break;
            case 3:
                setMessageFeeling(<FavoriteIcon style={{fontSize: 15, color: 'red'}}/>);
                break;
            case 4:
                setMessageFeeling(<SentimentDissatisfiedIcon style={{fontSize: 15, color: 'yellow'}}/>);
                break;
            case 5:
                setMessageFeeling(<ThumbDownIcon style={{fontSize: 15, color: 'red'}}/>);
                break;
            default:
                break;
        }

        document.querySelector('.listFeeling.active').classList.remove('active');
        document.querySelector('#overlayChatRoom').classList.remove('active');
        setMessageFeelingUser(prevUser => [...prevUser, InforLogin.id])
    }

    return (
        <div className='listFeeling' id={`listFeelingChat${id}${timing}`}>
            <div>
                <ThumbUpAltIcon onClick={() => SetMessageFeelingFC(0)} style={{color: 'blue'}}/>
            </div>
            <div>
                <EmojiEmotionsIcon onClick={() => SetMessageFeelingFC(1)} style={{color: 'yellow'}}/>
            </div>
            <div>
                <MoodBadIcon onClick={() => SetMessageFeelingFC(2)} style={{color: 'yellow'}}/>
            </div>
            <div>
                <FavoriteIcon onClick={() => SetMessageFeelingFC(3)} style={{color: 'red'}}/>
            </div>
            <div>
                <SentimentDissatisfiedIcon onClick={() => SetMessageFeelingFC(4)} style={{color: 'yellow'}}/>
            </div>
            <div>
                <ThumbDownIcon onClick={() => SetMessageFeelingFC(5)} style={{color: 'red'}}/>
            </div>
        </div>
    )
}

export default ListFeeling;