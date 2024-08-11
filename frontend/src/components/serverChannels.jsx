import { db } from "../config/firebase"
import { getDoc, doc, collection } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { setServerInfo } from "./features/serverSlice"

export default function ServerChannels({serverId, serverName}) {
    const dispatch = useDispatch()
    const nav = useNavigate()
    const setServer = () => {
         dispatch(setServerInfo({
            serverId: serverId,
            serverName: serverName
         }))
    }

    // useEffect(() => {
    //     try{
    //         const serverList = async (id) => {
    //             const serverRef = doc(db, 'servers', id)
    //             const serverDoc = await getDoc(serverRef)
    //             setServerName(serverDoc.data())
                
    //         }
    //         serverList(id)
    //     }catch(e){
    //         console.log(e)
    //     }
    // })


    return (
        <NavLink onClick={setServer} to = {`/dashboard/${serverId}`} key={serverId} className="flex items-center justify-center w-14 h-14 bg-[#343838] mt-2 rounded-[50%] hover:bg-[#646cf8] hover:rounded-2xl active:bg-[#646cf8] active:rounded-2xl duration-200">
            <img src="src/assets/discord.svg" alt="Discord" className="w-8 h-8 invert" />
        </NavLink>
    )
}