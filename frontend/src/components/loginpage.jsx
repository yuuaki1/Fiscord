import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth } from "../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginToggle, setLoginToggle] = useState(false)

    const nav = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e) {
            console.error(e)
        }
        setLoginToggle(true)
    
    }

    useEffect(() => {
        if(loginToggle){
            setLoginToggle(false)
            return nav('/dashboard')
        }
    }, [loginToggle, nav])
    return (
        <div className="bg-[url('..\src\assets\background.png')] bg-cover bg-no-repeat flex flex-col items-center justify-between h-screen">
            <div className="flex flex-col items-center justify-center mt-[200px] bg-[#383c3c] p-[100px] rounded-md">
                <h1 className="text-3xl text-white h-1/2 font-semibold">Welcome back!</h1>
                <h2 className="text-xl text-gray-400 pb-[50px]">We're so excited to see you again!</h2>
                <form className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label className=" text-sm text-gray-400 font-bold">
                            Email or Phone Number:
                        </label>
                        <input onChange={(e) => setEmail(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" required type="text" name="username" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400 font-bold">
                            Password:
                        </label>
                        <input onChange = {(e) => setPassword(e.target.value)} className="bg-[#201C24] text-white p-2 rounded-md w-[420px] h-10 mt-2" required type="password" name="password" />
                        <label className="text-sm text-blue-400 font-bold">
                            <a>Forgot your password?</a>
                        </label>
                    </div>
                    <button onClick={handleLogin} className="rounded-md mt-4 h-10 w-[420px] bg-[#646cf8] hover:bg-[#525af2] text-white font-bold" type="submit">Login</button>
                    <label className=" text-sm text-gray-400 font-bold hover:text-[#525af2]">
                        <a href='/register'>Don't have an account?</a>
                    </label>
                </form>
            </div>
        </div>
    )
}