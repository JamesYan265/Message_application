import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import Post from './Post';
import './Timeline.css';
import db from '../../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import FlipMove from 'react-flip-move';
import SearchBox from './SearchBox';



function  Timeline({searchfun, setSearchfun, sideclick}) {
  //把doc中的Data放進useState的posts中，posts是陣列
  const [posts, setPosts] = useState([]);
  
  //Check是否要TimeLine轉換形態
  let sideCheck = false;

  if(sideclick === "Search") {
    sideCheck = true;
  } else if(sideCheck === "Home") {
    sideCheck = false;
  }
  
  useEffect(()=> {
    //取得Firestore中的資料
    const postData = collection(db, "posts");
    const q = query(postData, orderBy("timestamp","desc"))

    // 普通讀取
    // getDocs(q).then((querySnapshots) => {
    //   setPosts(querySnapshots.docs.map((doc) => doc.data()));
    // });

    // 實時更新
    //querySnapshot 是變數名,名變成咩都得
    onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => doc.data()));
    })
    
    
  }, []);

  useEffect(()=> {
    setPosts(searchfun);
  },[searchfun])
 
  return (
    <div className='timeline'>
      {/* Header */}
      <div className="timeline_header">
        {sideCheck ? (<h2>Search</h2>) : (<h2>Home</h2>)}
      </div>
      {/* MessageBox */}
      {sideCheck ? (<SearchBox setSearchfun={setSearchfun} searchfun={searchfun}/>) :  (<MessageBox />)}
      {/* Post */}
      {/* {console.log(posts)} */}
      <FlipMove>
        {posts.map((post) => (
          <Post 
          key={post.id}
          no={post.id}
          displayName = {post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          avatar={post.avatar}
          image={post.image}
          response = {post.response}
          timestamp = {post.timestamp}
        />
        ))}
      </FlipMove>

    </div>
  )
}

export default Timeline
