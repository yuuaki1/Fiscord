import Sidebar from "./components/sidebar";
import { useEffect, useState } from "react";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom"; 
import { Outlet } from "react-router-dom";
import ServerModal from "./components/ServerModal";

export default function App() {
  const [user] = useAuthState(auth)
  const [loggedIn, setLoggedIn] = useState(false)
  const [showServerModal, setShowServerModal] = useState(false)

  const nav = useNavigate()

  const HandleOpen = () => {
    setShowServerModal(true)
  }

  const HandleClose = () => {
    setShowServerModal(false)
  }

  useEffect(() => {
    if(!user && loggedIn == false){
      nav('/login')
      setLoggedIn(true)
    }
  }, [user, nav, loggedIn])

  return(
    <div className="flex flex-row">
      <div>
      <h1><Sidebar handleClick={HandleOpen}/></h1>
      <ServerModal open={showServerModal} handleClose={HandleClose} />
      </div>
      <div><Outlet /></div>
    </div>
  )
}