import axios from "axios"
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Toast from "./Toast";

const Login = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [toast, setToast] = useState({ isOpen: false, type:'', content: '' });

    const handleSubmit = async()=>{
        if(!email){
            handleOpenToast("Please enter your email","")
        }
        else if(!password){
            handleOpenToast("Please enter your password","")
        }
        else{
            try{
                const user = await axios.post("http://localhost:8000/u/login",{ email, password })
                localStorage.setItem('user',JSON.stringify(user.data.user));
                navigate('/dashboard')
            }
            catch(error){
                console.log({ error: error.message });
                handleOpenToast("Invalid email or password","")
            }
        }
    }

    const handleOpenToast=(content,type)=>{
        setToast({
            isOpen: true,
            type: type,
            content: content,
          });
      
          // Close the popup after 2 seconds
        setTimeout(() => setToast({ isOpen: false, type: '', content: '' }), 3000);
    }

    return (
        <div className="page">
            <div className="popup">
                <div className="popup-top">
                    <p className="title">Shawtly</p>
                </div>
                <div className="popup-inputs">
                    <input
                        type="email"
                        className="input"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="input"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="popup-bottom">
                    <button 
                        onClick={handleSubmit}
                        id="submit"
                        className="submit" 
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="onboard-action">
                Don't have an account? <p className="navigate-link" onClick={()=>navigate('/signup')}>Sign Up</p>
            </div>
            <Toast isOpen={toast.isOpen} type={toast.type} content={toast.content} />
        </div>)
}

export default Login