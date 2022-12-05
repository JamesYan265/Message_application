import { ChatBubbleOutline, FavoriteBorder, PublishOutlined, Repeat, VerifiedUser } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { format } from 'timeago.js';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import db from '../../firebase';
import './Post.css';
import Response from '../response/Response';
import FlipMove from 'react-flip-move';
import Comment from '../response/Comment';


const Post = forwardRef(
    ({displayName, username, verified, text, image, avatar, timestamp, no}, ref) => {

        const [time, setTime] = useState('');
        const [clicked, setClicked] = useState(false);
        const [responses, setResponses] = useState([]);
        const postId = no;

        useEffect(() => {
            if(timestamp) {
                setTime(timestamp);
            } else {
                setTime('loading');
            }
            
            //取得Firestore中的資料
            const responseData = collection(db, "responses");
            const q = query(responseData, orderBy("timestamp","desc"))
            // 實時更新
            //querySnapshot 是變數名,名變成咩都得
            onSnapshot(q, (querySnapshot) => {
                setResponses(querySnapshot.docs.map((doc) => doc.data()));
            });
        }, []);
        // console.log(responses);
        // console.log(no);
        let res = responses.filter(responses => responses.postId === no);
        let responseId = responses.responseId;

        function postPage() {
            if(clicked == false) {
                setClicked(true);
            } else {
                setClicked(false);
            }
        }

      return (
        <div>
            <div className="post" ref={ref} onClick={postPage}>
                <div className="post_avatar">
                    <Avatar src={avatar}/>
                </div>
                <div className="post_body">
                    <div className="post_header">
                        <div className="post_headerText">
                            <h3>
                                {displayName}
                                <span className="post_headerSpecial">
                                    <VerifiedUser className='post_badge'/>
                                    @{username}
                                    ．{format(time.seconds + '272')}
                                </span>
                            </h3>
                        </div>
                        <div className="post_headerDescription" style={{whiteSpace: 'pre-line', lineBreak: 'anywhere'}}>
                            <p>{text}</p>
                        </div>
                    </div>
                    <img src={image} alt="" className="src" />
                    <div className="post_footer">
                        <ChatBubbleOutline fontSize='small'/>
                        <Repeat fontSize='small' />
                        <FavoriteBorder fontSize='small' />
                        <PublishOutlined fontSize='small' />
                    </div>
                </div>
            </div>
            {clicked ? 
                (
                    <div className='responsebox'>
                        <Comment postId = {postId}/>
                        {res.map((responses) => (
                            <Response 
                            key = {responses.responseId}
                            displayName = {responses.displayName}
                            avatar = {responses.avatar}
                            content = {responses.content}
                            timestamp = {responses.timestamp}
                            />
                        ))}
                    </div>
                ) :
                (
                    <></>
                )
            }
            
        </div>
      )
    }
)



export default Post
