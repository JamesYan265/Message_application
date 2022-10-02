import { Avatar, Button } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react'
import './SideMessageBox.css';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import db, { auth } from '../../firebase'
import storage from '../../firebase_upload';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject  } from 'firebase/storage';
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from 'uuid';

function Alerts() {
  return(
    <>
      <div className='Alert_S'>*You must write something*</div>
    </>
  )
}

function SideMessageBox() {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [messageImage, setMessageImage] = useState("");

  const [cancelUpload, setCancelUpload] = useState({});
  const [displayImage, setDisplayImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");

  //login Check
  useEffect(() => {
    if(user) {
      setIcon(auth.currentUser.photoURL);
    } else {
      setIcon("http://shincode.info/wp-content/uploads/2021/12/icon.png");
    }

  });

  const OnFileUploadToFirebase = (e) =>  {
    // console.log(e.target.files[0].name);
    // console.log(file.name);
    const file = e.target.files[0];
    setCancelUpload(file);

    //preview Image
    let preview = new FileReader();
    preview.readAsDataURL(file);
    preview.onload = (display) => {
      setDisplayImage(display.target.result);
    }

    //Update Image
    if (file.name) {
      console.log("Image is alive");
      //upload image
      const storageRef = ref(storage, "image/" + file.name);
      const uploadImage = uploadBytesResumable(storageRef, file);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
        }, (err) => {
          console.log(err);
        },
        ()=>{
          setLoading(false);
          getDownloadURL(ref(storage,'image/' + file.name)).then((url) => {
            setMessageImage(url);
            //因為loading完前,Firestore的資料已被輸入完成,So 不能成功上傳Image 2:58AM 
          });
        }
      );

    } else {
      console.log("image don't alive");
    }
  
  };

  const CancelUpdating = (e) => { 
    setDisplayImage("");
    if(cancelUpload.name) {
        const desertRef = ref(storage, 'image/' + cancelUpload.name);
        deleteObject(desertRef).then(() => {
          console.log("File Delete Suucess");
        }).catch((error) => {
          console.log(error);
        });
      }
    }

  //send Messsage to firestore database
  const sendMessage = async(e) => {
    e.preventDefault();
    let warning = document.getElementsByClassName('Alert_S')[0];
    //upload data
    if(message == "" && messageImage == "") {
      warning.style.display = 'block';
    } else {
      await addDoc(collection(db, "posts"), {
        id : uuidv4(),
        displayName : "Visitor",
        username: "client",
        verified: true,
        text: message,
        avatar: icon,
        image: messageImage,
        timestamp: serverTimestamp(),
      });
      warning.style.display = 'none'
      setMessage("");
      setMessageImage("");
      setDisplayImage("");
    }
  };


  return (
    <div className='messageBox_S'>
      <form>
        <div className="MessageBox_input_S">
          <Avatar alt="GoogleIcon" src={icon}/>
          <textarea placeholder='Share your life or work' type="text" onChange={(e) => setMessage(e.target.value)} value={message} className="text" rows="5" wrap='100' maxLength='100'></textarea>
        </div>

        <Alerts />
        
        
        {displayImage == "" ? (
          <>
            <label className='ImageUpload_label_S'>
                <input className='messageBox_imageInput_S' type="file" onChange={OnFileUploadToFirebase} accept=".png, .jpg, .jpeg, .gif"></input><ImageIcon ></ImageIcon>
                Upload Image
            </label>
          </>
        ) : (
          <>
            <img src={displayImage} alt="" className="displayBox_S" />
            <label className='ImageUpload_label_S'>
              <input className='messageBox_imageInput_S' type="button" onClick={CancelUpdating}></input><DeleteIcon></DeleteIcon>
              Cancel Updating
            </label>
          </>
        )}
        
        

        <Button className='MessageBox_MessageButton_S' type="submit" onClick={sendMessage}>Send</Button>
      </form>
    </div>
  )
}

export default SideMessageBox
