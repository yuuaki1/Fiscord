import {auth, db} from '../../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { collection, doc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import FriendProfile from './FriendProfile'

export default function FriendList () {
    const [user] = useAuthState(auth)
    const userRef = doc(db, 'users', user.uid)
    const friendsRef = collection(userRef, 'friends')

    const [friends] = useCollection(friendsRef)
    return (
        <div className='flex-grow overflow-y-scroll scrollbar-hide'>
            <div className="shadow-sm shadow-gray-800 w-[1380px] h-12 flex flex-row justify-between">
                <div className="flex flex-row pt-3">
                    <img src="/src/assets/person.svg" className = "ml-5 mt-[2px] h-5 w-4 invert-[60%] hover:invert-[80%]" alt="servername" />
                    <h1 className="text-white font-semibold ml-3">Friends</h1>
                </div>
                <div className="flex flex-row mr-12 mt-1">
                    <img src="/src/assets/people.svg" className="h-6 w-6 mr-4 mt-2 invert-[60%] hover:invert-[90%]" alt="members" />
                    <input placeholder="Search" className="bg-[#201c24] text-white text-[12px] font-semibold p-2 rounded-sm w-[250px] h-6 mt-2" />
                    <img src="/src/assets/inbox.svg" className="h-6 w-6 ml-4 mt-2 invert-[60%] hover:invert-[90%]" alt="inbox" />
                </div>
            </div>
            <div>
            {friends && friends.docs.map((doc) => {
                const {friendName} = doc.data()
                return (<FriendProfile key = {doc.id} friendName={friendName} />)
            })}
            </div>
        </div>
    )
}