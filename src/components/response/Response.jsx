import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { forwardRef } from 'react'
import './Response.css'
import { format } from 'timeago.js';
import { useEffect } from 'react';

const Response = forwardRef(
  ({displayName, avatar, content, timestamp},ref) => {
    const [time, setTime] = useState('');
    
    useEffect(() => {
      if(timestamp) {
        setTime(timestamp);
      } else {
        setTime('loading');
      } 
    })

    return (
      <div className='response' ref={ref}>
          <div className='response_avatar'>
              <Avatar src={avatar}/>
          </div>
          <div className='response_text'>
              {content}
          </div>
          <div className='response_time'>
            {format(time.seconds + '272')}
          </div>
      </div>
    )
  }
)

export default Response