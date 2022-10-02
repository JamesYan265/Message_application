import { Button } from '@mui/material'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, provider} from "../../firebase";
import db from '../../firebase';
import { uuidv4 } from '@firebase/util';
import { forwardRef } from 'react';
import './Comment.css';

function AlertComment() {
  return(
    <>
      <div className='Alert_Comment'>*You must write something**</div>
    </>
  )
}

const Comment = forwardRef(
    ({postId}, ref) => {
    const [user] = useAuthState(auth);
    const [comment, setComment] = useState("");
    const [icon, setIcon] = useState("");

    useEffect(() => {
        if(user) {
          setIcon(auth.currentUser.photoURL);
        } else {
          setIcon("http://shincode.info/wp-content/uploads/2021/12/icon.png");
        }
    
    });

    const sendMessage = async(e) => {
        e.preventDefault();
        let warning = document.getElementsByClassName('Alert_Comment')[0];
        if(comment == "") {
            warning.style.display = "block";
        } else {
            await addDoc(collection(db, "responses"), {
                avatar: icon,
                content : comment,
                displayName : "visitor",
                postId : postId,
                responseId : uuidv4(),
                timestamp : serverTimestamp(),
            });
            warning.style.display = "none"
            setComment("");
        }
    }
  return (
    <div className='commentBox' ref={ref}>
      <form>
        <input type="text" className='response_input' onChange={(e) => setComment(e.target.value)} value={comment}/>
        <Button className='MessageBox_MessageButton' type="submit" onClick={sendMessage}>Send</Button>
      </form>
      <AlertComment />
    </div>
  )
}
)

export default Comment
