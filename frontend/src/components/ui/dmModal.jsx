import { useState } from "react"
import { db, auth } from "../../config/firebase"
import { collection, addDoc } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

export default function DMModal ({open, handleClose}) {
    const [friendName, setFriendName] = useState('')
    const [user] = useAuthState(auth)
    
    if (!open) return null

    const AddFriend = async (e) => {
        if (friendName === ''){
            alert('Please enter valid name')
        }
        else{
            e.preventDefault()
        try{
          await addDoc(collection(doc(db, 'users', user.uid), 'friends'),{friendName : friendName})
          setFriendName('')
          handleClose()
        }catch(error){
            console.log(error)
        }
        }
      }

    return (
        <div className="fixed inset-0 bg-[#383c3c] h-[400px] w-[500px] mt-[250px] ml-[600px] shadow-2xl flex justify-center items-center rounded-lg">
            <div className="items-center justify-center">
                <div className="flex flex-col items-center justify-between p-4 text-center">
                    <h2 className=" text-3xl pt-6 pb-3 font-bold text-white">Create your own Server</h2>
                    <p className="text-md text-gray-300 p-2">Create your server, where the magic will happen! Keep in mind you can always change the name later.</p>
                </div>
                <form className="p-3 pb-5 pt-20 flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="serverName" className="text-sm pl-1 pb-2 text-gray-300 font-semibold">Server Name</label>
                    <input type = 'text' required placeholder="Enter your server name" onChange={(e) => setFriendName(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" />
                    <div></div>
                </form>
                <div className="flex items-center justify-between p-5 bg-[#29292e] rounded-lg">
                    <button className="bg-[#29292e] text-white py-2 px-6 rounded-sm center text-sm font-bold" onClick={() => handleClose()}>Back</button>
                    <button className="bg-[#646cf8] duration-200  hover:bg-[#4d52b5] text-white py-2 px-6 rounded-sm center text-sm font-bold" onClick={AddFriend}>Add</button>
                </div>
            </div>
        </div>
    )
}