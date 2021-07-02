import React, {useState} from 'react'
import { useContext, useEffect } from 'react';
import { Context } from '../../Contexter';
import axios from 'axios';
export const Search = () => {
    const {state,setState} = useContext(Context);
    const [trackTitle, setTitle] = useState("");
    const [input, setInput] = useState("");
    const onSubmit = (e) =>{
        e.preventDefault();
        if(input === ''){
            alert('please enter a title');
            return;
        }
        setTitle(input);
        setInput('');
    }

    useEffect(
        () =>{
        axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc
        &apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            console.log(res.data);
            let track_list = res.data.message.body.track_list;
            setState({ track_list: track_list, heading: "Search Results" });
        })
        .catch(err => console.log(err))}
    ,[trackTitle]);
    return (
        <div>
            <div className = 'card card-body mb-4 p-4'>
                <h1 className= 'display-4 text-center'>
                    <i>Search for a song</i>
                </h1>
                <p className='lead text-center'>
                    Get the lyrics for any song
                </p>
                <form onSubmit = {onSubmit}>
                    <div className='form-group'>
                        <input type='text' 
                        className='form-control form-control-lg' 
                        placeholder='Song title...'
                        name = 'track title'
                        value = {input} 
                        onChange={(e)=> setInput(e.target.value)}
                        >

                        </input>
                     </div>
                </form>
            </div>
        </div>
    )
}
