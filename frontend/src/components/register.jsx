import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [registerationToggle, setRegisterationToggle] = useState(false)

    const nav = useNavigate()

    const submitRegistration = async (e) => {
        e.preventDefault()

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(userCredential.user, {displayName: displayName}, {username: username}, {dateOfBirth: dateOfBirth}, {uid: userCredential.user.uid}, {merge: true})
            const user = userCredential.user
            await addDoc(collection(db, 'users'), {
                username: username,
                email: email,
                displayName: displayName,
                dateOfBirth: dateOfBirth.toLocaleString('en-IN'), 
                password: password,
                uid: user
            })
            
        
        }catch(e){
            console.error(e)
        }

        setRegisterationToggle(true)

        setUsername('')
        setPassword('')
        setEmail('')
        setDisplayName('')
        setDateOfBirth(null)
        
    }

    useEffect(() => {
        if(registerationToggle){
            setRegisterationToggle(false)
            return nav('/login')
        }
    
    }, [registerationToggle, nav])
    

    return (
        <div className="bg-[url('..\src\assets\background.png')] bg-cover bg-no-repeat flex flex-col items-center justify-between h-screen">
            <div className="flex flex-col items-center justify-center mt-[100px] bg-[#383c3c] p-[50px] rounded-md">
                <h1 className="text-3xl text-white h-1/2 font-semibold">Create an account</h1>
                <h2 className="text-xl text-gray-400 pb-[50px]">This is the beginning of your journey on Discord!</h2>
                <Form className="flex flex-col gap-2 items-center">
                    <div className="flex flex-col gap-1">
                        <label className=" text-sm text-gray-400 font-bold">
                            Email or Phone Number:
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" required type="text" name="username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className=" text-sm text-gray-400 font-bold">
                            Display Name:
                        </label>
                        <input onChange={(e) => setDisplayName(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" type="text" name="username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className=" text-sm text-gray-400 font-bold">
                            Username:
                        </label>
                        <input onChange={(e) => setUsername(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" required type="text" name="username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400 font-bold">
                            Password:
                        </label>
                        <input onChange={(e) => setPassword(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" required type="password" name="password" />
                        <label className="text-sm text-blue-400 font-bold">
                            <a>Forgot your password?</a>
                        </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className=" text-sm text-gray-400 font-bold">
                            Date of Birth:
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DesktopDatePicker value={dateOfBirth} onChange={(e) => setDateOfBirth(e)} sx={{ input: { color: 'white' } }} views={['month','day', 'year']} slotProps={{ field: { size: 'small', shouldRespectLeadingZeros: true } }} className='w-[420px] bg-[#201c24] text-white rounded-md mt-2'/>
                        </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <button onClick={submitRegistration} className="rounded-md mt-4 h-10 w-[420px] bg-[#646cf8] hover:bg-[#525af2] text-white font-bold" type="submit">Register</button>
                    <label className=" text-sm text-gray-400 font-bold hover:text-[#525af2]">
                        <a href='/login'>Already have an account?</a>
                    </label>
                </Form>
            </div>
        </div>
    )
}