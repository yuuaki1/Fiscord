import { redirect } from 'react-router-dom'
import { auth } from '../config/firebase'
import { db } from '../config/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import profile from '../assets/profile.png'
import microphone from '../assets/microphone.svg'
import videocam from '../assets/videocam.svg'
import settings from '../assets/settings.svg'
import { signOut } from 'firebase/auth'

export default function Profile() {
    const [user] = useAuthState(auth)
    if (!user){
        redirect('/login')
    }
    else{
        const userEmail = auth.currentUser.email
        const userNameGet = async (email) => {
            const userRef = doc(db, 'users', email)
            const userDoc = await getDoc(userRef)
            console.log(userEmail)
        }
    }
    
    return (
        <div className='flex flex-row overflow-hidden'>
            <div onClick={() => signOut(auth)}>
                <img className='rounded-full h-6 w-6' src = {profile} alt = 'profile' />
            </div>
            <div className='ml-3'>
                <h1 className='text-white font-semibold hover:font-bold'>{user?.displayName}</h1>
                <p className='text-gray-400 font-semibold hover:text-gray-200 text-[12px]'>{user?.uid.substring(0,6)}</p>
            </div>
            <img className='h-6 w-6 ml-6 invert-[60%] hover:invert-[80%]' src={microphone} alt='microphone' />
            <img className='h-6 w-6 ml-4 invert-[60%] hover:invert-[80%]' src={videocam} alt='videocam' />
            <img className='h-6 w-6 ml-4 invert-[60%] hover:invert-[80%]' src={settings} alt='settings' />
        </div>
    )
}