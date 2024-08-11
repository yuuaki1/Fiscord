import { useDispatch } from "react-redux";
import { setchannelInfo } from "./features/channelSlice";
import { NavLink } from "react-router-dom";

export default function Channels({channelId, channelName}) {
    const dispatch = useDispatch()
    const setChannel = () => {
        dispatch(setchannelInfo({
            channelId: channelId,
            channelName: channelName
        }))
    }

    return(
            <NavLink to = {`/dashboard/${serverId}/${channelId}`} key={channelId} className="flex items-center justify-center w-14 h-14 bg-[#343838] mt-2 rounded-[50%] hover:bg-[#646cf8] hover:rounded-2xl active:bg-[#646cf8] active:rounded-2xl duration-200">
                <img src="src/assets/discord.svg" alt="Discord" className="w-8 h-8 invert" />
            </NavLink>
        )
    }
