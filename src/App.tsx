import { useState } from 'react'
import './App.css'
import {isMobile, isTablet} from 'react-device-detect';
import HomeContainer from "./pages/HomeContainer";
import {ICONS} from "./globals/Icons-svg";
import "@fontsource/poppins";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Notifications} from "react-push-notification";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqLnrO9O4tsCDXeflOIH1qjpSOUHUGIbo",
    authDomain: "test-dear-hapy.firebaseapp.com",
    projectId: "test-dear-hapy",
    storageBucket: "test-dear-hapy.appspot.com",
    messagingSenderId: "403882503457",
    appId: "1:403882503457:web:5d49efbaee5ba8a58fe260"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [count, setCount] = useState(0) ;
    const renderContent = () => {
        if (isMobile && !isTablet) {
            return <>
                    <Notifications position={"top-right"} />
                    <HomeContainer isMobile={true}/>
                    </>
        } else {
            return <>
                    <Notifications position={"top-right"} />
                    <HomeContainer isMobile={false}/>
                    </>
        }
    } ;

  return (
    renderContent()
  )
}

export default App
