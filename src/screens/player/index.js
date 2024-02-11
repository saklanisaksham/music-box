import React, { useEffect, useState } from 'react'
import './player.css'
import { useLocation } from 'react-router-dom'
import apiClient from '../../spotify';
import SongCard from '../../components/songCard';
import Queue from '../../components/queue';
import AudioPlayer from '../../components/audioPlayer';
import Widgets from '../../components/widgets';

export default function Player() {

  const location = useLocation();
  const [tracks , setTracks] = useState([]);
  const [CurrentTrack , setCurrentTrack] = useState({});
  const [CurrentIndex , setCurrentIndex] = useState(0);

  useEffect(() =>{
    if(location.state){
      apiClient.get("playlists/" + location.state?.id +"/tracks")
      .then(res => {
        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0].track);
      });
    }
  } , [location.state])

  useEffect(() => {
    setCurrentTrack(tracks[CurrentIndex]?.track);
  }, [CurrentIndex, tracks]);

  return (
    <div className='screen-container flex'>
      <div className='left-player-body' >
        <AudioPlayer 
          CurrentTrack={CurrentTrack} 
          total={tracks}
          CurrentIndex={CurrentIndex}
          setCurrentIndex={setCurrentIndex}
         />
         <Widgets artistID={CurrentTrack?.album} />
      </div>
      <div className="right-player-body">
        <SongCard album={CurrentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  )
}
