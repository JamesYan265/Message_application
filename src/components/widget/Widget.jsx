import Search from '@mui/icons-material/Search'
import React from 'react'
import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import './Widget.css'


function Widget() {
  return (
    <div className='widget'>
      <div className="widget_input">
        <Search className='widget_searchIcon'/>
        <input type="text" placeholder='keyword Search'/>
      </div>

      <div className="widgetsContainer">
        <h2>What happen</h2>

        {/* live message modules */}
        <TwitterTimelineEmbed 
          sourceType='profile' 
          screenName='BBCBreaking'
          options={{height:400}}/>

        <br />
        
        <TwitterTimelineEmbed 
          sourceType='profile' 
          screenName='ChelseaFC'
          options={{height:400}}/>
      </div>
    </div>
  )
}



export default Widget
