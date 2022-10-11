import './SearchBox.css'
import Search from '@mui/icons-material/Search'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import db from '../../firebase';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';

function SearchBox({setSearchfun}) {
    
    const [Odata, setOdata] = useState([]);
    const ref = useRef();
  
    useEffect(()=> {
      //取得Firestore中的資料
      const postData = collection(db, "posts");
      const q = query(postData, orderBy("timestamp","desc"))
  
      // 實時更新
      //querySnapshot 是變數名,名變成咩都得
      onSnapshot(q, (querySnapshot) => {
        setOdata(querySnapshot.docs.map((doc) => doc.data()));
      });

      
    },[]);
  
    const handleSearch = () => {
      setSearchfun(
        Odata.filter((user) => 
           user.text.includes(ref.current.value))
      )
    }

  return (
    <div className='SearchBox'>
        <div className="Search_input">
            <Search className='Search_searchIcon'/>
            <input type="text" placeholder='keyword Search' ref={ref} onChange={() => handleSearch()}/>
        </div>
        <div className='line'></div>
    </div>
  )
}

export default SearchBox
