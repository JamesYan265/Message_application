import React from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SidebarOptions from './SidebarOptions';
import { Button } from '@mui/material';
import './Sidebar.css';
import { auth } from '../../firebase';
import { Cancel, Logout, Message } from '@mui/icons-material';
import SideMessageBox from './SideMessageBox';
import { useEffect } from 'react';

function Sidebar({sideclick, setSideClick}) {

  //click sidebar Opection
  const SearchBtn = () => {
    setSideClick("Search");
  }
  const HomeBtn = () => {
    setSideClick("Home");
  }
  
  return (
    <div className='sidebar'>
      {/* Icon */}
      <QuestionAnswerIcon className='sidebar_icon'/>

      {/* SidebarOption */}
      <div onClick={HomeBtn}>
        <SidebarOptions text="Home" Icon={HomeIcon} active/>
      </div>
      <div onClick={SearchBtn}>
        <SidebarOptions text="Search" Icon={SearchIcon} />
      </div>
      <SidebarOptions text="Notification" Icon={NotificationsIcon}/>

      {/* Button */}
      <Button variant="outlined" className='sidebar_Message' onClick={PopOpen}>
        <div><Message className='Mbtn' /><p>Message</p></div>
      </Button>
      <Popupbox />
      <SignOutButton />
    </div>
  )
}

//SignOut
function SignOutButton() {
  return (
      <button onClick={() => auth.signOut()} className='signOutButton'>
          <Logout /><p>SignOut</p>
      </button>
      
  )
}

//pop up Message
function PopOpen() {
  const setPopup = document.getElementsByClassName('popup');
  setPopup[0].style.display = 'block';
}

function Popupbox() {

  function PopCancel() {
    const setPopup = document.getElementsByClassName('popup');
    setPopup[0].style.display = 'none';
  }

  return (
    <div className='popup'>
      <Cancel className='cancel' onClick={PopCancel}/>
      <div className='frontlay'>
        <SideMessageBox />
      </div>
      <div className='overlay'></div>
    </div>
  )
}

export default Sidebar
