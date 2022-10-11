import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Timeline from './components/timeline/Timeline';
import Widget from './components/widget/Widget';
import Home from './Home';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase";
import { useState, useEffect } from 'react';

function App() {
  const [user] = useAuthState(auth);
  const [searchfun, setSearchfun] = useState([]);
  const [sideclick, setSideClick] = useState("");

  return (
    <div className="app">
      {user ? (
        <>
        <Sidebar sideclick={sideclick} setSideClick={setSideClick}/>
        <Timeline sideclick={sideclick} searchfun={searchfun} setSearchfun={setSearchfun}/>
        <Widget searchfun={searchfun} setSearchfun={setSearchfun}/>
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}







export default App;
