import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../config/firebase"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import ServerChannels from "./serverChannels"
import { useCollection } from "react-firebase-hooks/firestore"

export default function Sidebar({handleClick}) {
    const [serverList, setServerList] = useState([])
    useEffect(() => {
        const getServerList = async () => {
            const serverRef = collection(db, 'servers')
            const serverDoc = await getDocs(serverRef)
            const filteredServers = serverDoc.docs.map(doc =>({id: doc.id, ...doc.data()}))
            setServerList(filteredServers)
        }

        getServerList()
    })
    
    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-20 h-screen px-3 py-3 bg-[#201C24]">
                <div id = 'server-list'>
                    <NavLink className="flex items-center justify-center w-14 h-14 bg-[#343838] mb-3 rounded-[50%] hover:bg-[#646cf8] hover:rounded-2xl active:bg-[#646cf8] active:rounded-2xl duration-200">
                        <img src="src/assets/discord.svg" alt="Discord" className="w-8 h-8 invert" />
                    </NavLink>
                </div>
                <hr className="mb-2"/>
                {serverList?.map((server) => {
                    return (
                        <ServerChannels serverId = {server.id} key = {server.id} serverName = {server.serverName} />
                        
                    )
                })}
                <hr  className=" mt-3"/>
                <button onClick = {handleClick} className="flex items-center justify-center w-14 h-14 bg-[#343838] my-3 rounded-[50%] hover:bg-[#20a85c] hover:rounded-2xl duration-300">
                    <img src="src/assets/plus.svg" alt="Add server" className="w-10 h-10 invert -hue-rotate-60" />
                </button>  
            </div>
            
        </div>
    )
}

