import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import Library from '../library/index';
import Feed from '../feed/index';
import Favourite from '../favourite/index';
import Player from '../player/index';
import Trending from '../trending/index';
import Login from '../auth/login';
import './home.css';
import { setClientToken } from '../../spotify';

export default function Home() {

  const [token , setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if(!token && hash){
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem("token" , _token);
      setToken(_token);
      setClientToken(_token);
    }else{
      setToken(token);
      setClientToken(token);
    }
  } , []);

  
  return (
    !token ? (
    <Login /> 
   ) : (
    <Router>
        <div className='main-body'>
            <Sidebar />
            <Routes>
                <Route path='/' element={<Library />}></Route>
                <Route path='/feed' element={<Feed />}></Route>
                <Route path='/favourite' element={<Favourite />}></Route>
                <Route path='/player' element={<Player />}></Route>
                <Route path='/trending' element={<Trending />}></Route>
            </Routes>
        </div>
    </Router>
    )
  )
}
