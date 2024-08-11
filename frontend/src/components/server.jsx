import { store } from '../store';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Profile from './profile';
import Chat from './chat';
import { useSelector } from 'react-redux';

export default function Server() {
    // const [serverId, setServerId] = useState('')
    // const [serverName, setServerName] = useState('')
    const state = store.getState()
    const selectServerName = (state) => state.server.serverName
    const serverName = useSelector(selectServerName)
    
    return (
        <div className='flex flex-row'>
        <div className='flex flex-col h-screen bg-[#302c34]'>
            <div className='py-4 items-center px-[100px] justify-center shadow-sm shadow-gray-600'>
                <h1 className=" text-white font-semibold">{serverName}</h1>
            </div>
            <div className="text-[#838e96] hover:text-[#dbd9d1] font-bold text-[11px] ml-[10px] mt-[10px]">CHANNELS</div>
            <div className="px-3 flex flex-col bg-[#302c34] items-start">
                    <NavLink className="flex flex-row pb-1 px-2 ml-1 text-[#838e96] hover:bg-[#383c4c] hover:text-[#dbd9d1] group pr-[130px] mt-[15px] pt-[5px] rounded-md">
                        <img src="/src/assets/hash.svg" className="w-5 h-5 invert-[60%] group-hover:invert-[80%] mx-2 pt-1"/>
                        <button className="font-semibold ml-2">welcome</button>
                    </NavLink>
            </div>
            <div className="mt-[745px]">
                <div className='pl-[30px] bg-[#292c2c] py-3'>
                    <Profile />
                </div>
            </div>
        </div>
        <Chat />
        </div>
    )
}