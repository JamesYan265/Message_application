import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Timeline from './components/timeline/Timeline';
import Widget from './components/widget/Widget';
import Home from './Home';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, provider} from "./firebase";


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      {user ? (
        <>
        <Sidebar />
        <Timeline />
        <Widget />
        </>
      ) : (
        <Home />
      )}
    </div>
  );
}







export default App;
