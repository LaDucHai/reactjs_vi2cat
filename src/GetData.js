import React, { Component } from 'react';
import axios from 'axios';
import PostVideo from './PostVideo';



class GetData extends Component {   

    constructor(props){
        super(props);
        this.state = {
            data: {}
        };
        this.componentDidMount(this.props.api)
    }
    
    componentDidMount(a){
        axios({
            method: 'GET',
            url: a,
            data : null
        }).then(res => {
            this.setState({
                data: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }


    render(){
        let user = this.state.data;
        return (
            <div>
                <PostVideo {...user}/>
            </div>
        )
    }  
}

export default GetData;

