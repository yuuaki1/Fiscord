import { NavLink, Outlet } from "react-router-dom"
import Profile from "./profile"
import { useState } from "react"
import DMModal from "./ui/dmModal"

export default function Dashboard() {
    const [username, setUsername] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const [showFriendModal, setShowFriendModal] = useState(false)

    const HandleOpen = () => {
        setShowFriendModal(true)
    }

    const HandleClose = () => {
        setShowFriendModal(false)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter'){
            HandleOpen()
        }
    }
    return (
        <div className="flex flex-row">
            <div className="h-screen bg-[#302c34]">
                <div className=" p-2 pb-3 flex items-center justify-center shadow-slate-700 shadow-sm border-b-[1px] border-gray-800">
                    <input placeholder="Find or start a conversation" className="bg-[#201c24] text-white text-[12px] font-semibold p-2 rounded-sm w-[250px] h-6 mt-2" />
                </div>
                <div className="px-3 pb-1 pt-1 flex flex-col bg-[#302c34] items-start">
                    <NavLink to={`/dashboard/friends`} className="flex flex-row px-2 ml-1 pb-3 text-[#838e96] hover:bg-[#383c4c] hover:text-[#dbd9d1] group pr-[130px] pt-[15px] rounded-md">
                        <img src="/src/assets/person.svg" className="w-5 h-6 invert-[60%] group-hover:invert-[80%] mx-2"/>
                        <button className="font-semibold ml-2">Friends</button>
                    </NavLink>
                    <NavLink to={`/dashboard/nitro`} className="ml-1 px-2 pb-3 flex flex-row text-[#838e96] hover:bg-[#383c4c] hover:text-[#dbd9d1] group pr-[145px] pt-[15px] rounded-md">
                        <img src="/src/assets/discord-nitro.svg" className="w-6 h-6 invert-[60%] group-hover:invert-[80%] mx-2"/>
                        <button className="font-semibold ml-2">Nitro</button>
                    </NavLink>
                </div>
                <div className="text-[#838e96] hover:text-[#dbd9d1] font-bold text-[12px] ml-[30px] mt-[5px]">DIRECT MESSAGES<button className="ml-16" onKeyDown={handleKey}><img className="h-6 w-6 invert-[60%] hover:invert-[90%]" src="/src/assets/plus.svg" /></button></div>
                <div className="mt-[680px]">
                    <div className='pl-[30px] bg-[#292c2c] py-5'>
                        <Profile />
                    </div>
                </div>
            </div>
            <DMModal open={showFriendModal} handleClose={HandleClose} /> 
            <Outlet />
        </div>
    )
}