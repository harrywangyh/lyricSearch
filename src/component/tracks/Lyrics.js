import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { Spinner } from '../layout/Spinner';
import {Link} from 'react-router-dom';

import Moment from 'react-moment';

export const Lyrics = (props) => {
    const [track,setTrack] = useState({});
    const [lyrics,setLyrics] = useState({});

    useEffect(
     ()=>{
        axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            setLyrics(res.data.message.body.lyrics); 
            
        }) 
        .catch(err => console.log(err));

        axios.get(`http://api.musixmatch.com/ws/1.1/track.get?track_id=${
                props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => { 
            setTrack(res.data.message.body.track);
            console.log(track)
        })
        .catch(err => console.log(err));

    },[props.match.params.id])

    return (
        (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) ?
        <div>
            <Spinner/>
        </div>:
        <div>
        <Link to='/' className='btn btn-dark btn-sm mb-4'>Go Back</Link>
        <div className='card'>
            <h5 className = 'card-header'>
                {track.track_name} by <span className='text-secondary'>{track.artist_name}</span>
            </h5>
            <div className = 'card-body'>
                <p className= 'card-text'>
                    {lyrics.lyrics_body}
                </p>
            </div>
            <ul className='list-group mt-3'>
                <li className='list-group-item'>
                    <strong>Album ID</strong>: {track.album_id}
                </li>
                <li className='list-group-item'>
                    <strong>Genre</strong>: {
                        (track.primary_genres.music_genre_list[0]===undefined)?
                        <p>not available</p>
                        :
                        (track.primary_genres.music_genre_list[1]=== undefined)?
                        track.primary_genres.music_genre_list[0].music_genre.music_genre_name:
                        track.primary_genres.music_genre_list[1].music_genre.music_genre_name
                    }
                </li>
                <li className='list-group-item'>
                    <strong>Explicit</strong>: {track.explicit ? 'Yes':'No'}
                </li>
                <li className='list-group-item'>
                    <strong>Release Date</strong>: {track.updated_time}
                </li>
            </ul>
        </div>
    </div>
    )
}
