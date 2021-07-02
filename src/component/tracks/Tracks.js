import React, {useContext} from 'react';
import { Context } from '../../Contexter';
import { Spinner } from '../layout/Spinner';
import  {Track} from './Track.js';
export const Tracks = () => {
    const info = useContext(Context);
    const { track_list, heading } = info.state;

    
    return (
        <>
        {
            (track_list === undefined || track_list.length === 0)? 
                <Spinner/>:
            <>
            <h3 className = 'text-center mb-4'>{heading}</h3>
            <div className = 'row'>
                {track_list.map(item => 
                    <Track key = {item.track.track_id}track = {item.track} />
                    )}
            </div>
            </>
        }
       </>
    )
}
