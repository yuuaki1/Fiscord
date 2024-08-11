import moment from 'moment';
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import profile from '../assets/profile.png'
import { useSelector } from 'react-redux';
import { store } from '../store';
import { selectServerId } from './features/serverSlice';
import { doc, deleteDoc } from 'firebase/firestore';

export default function Message ({id, name, photoURL = {profile}, email, message, timestamp}) {
    const [user] = useAuthState(auth)
    const state = store.getState()
    const serverId = useSelector((state) => state.server.serverId)
    let messagesRef = null
    if (serverId) {
        const serverRef = doc(db, 'servers', serverId)
        messagesRef = doc(serverRef, 'messages', id)
    }

    
    
    const timeStamp = new Date(timestamp).toLocaleString('en-IN')
    return (
        <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#333333] group">
            <img src={photoURL} className="h-10 w-10 rounded-full cursor-pointer" alt="profile" />
            <div className="flex flex-col pl-4">
                <h4 className="flex items-center space-x-2 font-medium">
                    <span className="hover:underline text-white text-sm cursor-pointer">
                        {name}
                    </span>
                    <span className='text-xs text-[#72767d]'>{timeStamp}</span>
                </h4>
                <h4 className='text-white'>{message}</h4>
            </div>
            {user.email == email && (
                <div className='h-7 w-7 hover:bg-[#ed4245] p-1 ml-auto' onClick={() => deleteDoc(messagesRef)}>
                <img className='h-5 hidden group-hover:inline' src='/src/assets/trash.svg' />
                </div>
            )}
        </div>
    )
}