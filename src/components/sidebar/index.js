import React, { useEffect, useState } from 'react';
import './sidebar.css';
import SidebarButton from './SidebarButton';
import { MdFavorite } from "react-icons/md";
import { FaGripfire , FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from '../../spotify'

export default function Sidebar() {
  const [image , setImage] = useState(
    "https://imgs.search.brave.com/jLTwrBSRPcoyhBJs1uPbMl500isS1N2O0JlI3BLUQoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc"
    );
  useEffect(() => {
    apiClient.get("me").then(response => {
      setImage(response.data.images[0].url); 
    });
  } , [])
  return (
    <div className='sidebar-container'>
      <img src={image} 
      className='profile-img' 
      alt='profile'
      />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favourite" to="/favourite" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  )
}
