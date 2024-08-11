import { useCollection } from 'react-firebase-hooks/firestore'
import plus2 from '../assets/plus2.svg'
import { useState, useEffect } from 'react'
import { store } from '../store'
import { useRef } from 'react'
import gift from '../assets/gift.svg'
import emoji from '../assets/emoji.svg'
import  { db, auth } from '../config/firebase'
import { addDoc, collection, doc, orderBy } from 'firebase/firestore' 
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import Message from './message'
import  { query, onSnapshot } from 'firebase/firestore';
import profile from '../assets/profile.png'

export default function Chat () {
    const state = store.getState()
    const serverId = useSelector((state) => state.server.serverId)

    const inputRef = useRef('')
    const chatRef = useRef(null)
    const [user] = useAuthState(auth)
    // const serverRef = doc(db, 'servers', serverId)
    const messagesRef = collection(db, `servers/${serverId}/messages`) 
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesArray = snapshot.docs.map((doc) => doc.data());
        setMessages(messagesArray);
        setLoading(false);
    }, (error) => {
        setError(error);
        console.log(error);
    });

    return unsubscribe;
    }, [messagesRef]);


    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    const sendMessage = async (e) => {
        e.preventDefault()

        if (inputRef.current.value !== '') {
            addDoc(messagesRef, {
                message: inputRef.current.value,
                timestamp: new Date().getTime(),
                name: user?.displayName,
                photoURL : user?.photoURL ? user?.photoURL : 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar',
                email: user?.email 
            })
        inputRef.current.value = ''
        scrollToBottom()
        }
    }

    
    return (
        <div className="flex flex-col">
            <div className="shadow-sm shadow-gray-800 w-[1380px] h-12 flex flex-row justify-between">
                <div className="flex flex-row pt-3">
                    <img src="/src/assets/hash.svg" className = "ml-5 mt-[2px] h-5 w-4 invert-[60%] hover:invert-[80%]" alt="servername" />
                    <h1 className="text-white font-semibold ml-3">welcome</h1>
                </div>
                <div className="flex flex-row mr-12 mt-1">
                    <img src="/src/assets/people.svg" className="h-6 w-6 mr-4 mt-2 invert-[60%] hover:invert-[90%]" alt="members" />
                    <input placeholder="Search" className="bg-[#201c24] text-white text-[12px] font-semibold p-2 rounded-sm w-[250px] h-6 mt-2" />
                    <img src="/src/assets/inbox.svg" className="h-6 w-6 ml-4 mt-2 invert-[60%] hover:invert-[90%]" alt="inbox" />
                </div>
            </div>
            <div className="flex flex-grow flex-col overflow-y-scroll scrollbar-hide">
                {messages.map((message) => {
                   return (
                    <Message name={message.name} photoURL={profile} email={message.email} message={message.message} timestamp={message.timestamp} />
                )
                    
                })}
                <div ref={chatRef} className='pb-16'/>
            </div>
            <div className='flex items-center px-2.5 py-3 mx-5 mb-7 rounded-lg bg-[#403c44] text-gray-400 text-sm justify-between'>
                <div className='flex'>
                    <img src={plus2} className='h-6 w-6 mr-2 cursor-pointer invert-[60%] hover:invert-[90%]' alt='add' />
                    <form>
                        <input className='bg-[#403c44] text-white text-[12px] font-semibold p-2 rounded-sm !w-full h-6 !outline-none' ref={inputRef} placeholder= {`Message #welcome`} />
                        <button hidden type='submit' onClick={sendMessage}>Send</button>
                    </form>
                </div>
                <div className='flex items-center space-x-2'>
                    <img src={gift} className='h-6 w-6 mr-2 cursor-pointer invert-[60%] hover:invert-[90%]' alt='gift nitro' />
                    <img src={emoji} className='h-6 w-6 mr-2 cursor-pointer invert-[60%] hover:invert-[90%]' alt='emoji' />
                </div>
            </div>
        </div>
    )
}