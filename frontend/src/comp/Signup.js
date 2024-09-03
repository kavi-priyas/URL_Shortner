import axios from "axios"
import React, { useState } from "react";
import Toast from "./Toast";
import { useNavigate } from "react-router";

const Signup = () =>{
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [toast, setToast] = useState({ isOpen: false, type:'', content: '' });
    const navigate = useNavigate()

    const handleSubmit = async()=>{
        if(!username){
            handleOpenToast("Please enter your name","")
        }
        else if(!email){
            handleOpenToast("Please enter your email","")
        }
        else if(!password){
            handleOpenToast("Please set a password","")
        }
        else{
            try{
                const user = await axios.post("http://localhost:8000/u/newuser",{ username, email, password })
                console.log(user)
                localStorage.setItem('user',JSON.stringify(user.data.user));
                navigate('/dashboard')
            }
            catch(error) {
                handleOpenToast("There's an error trying to Signup")
                console.log({ error: error.message });
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

    return (<div className="page">
        <div className="popup">
            <div className="popup-top">
                <p className="title">Shawtly</p>
            </div>
            <div className="popup-inputs">
                <input
                    type="text"
                    className="input"
                    id="name"
                    placeholder="How you want to be called?"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

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
                    Signup
                </button>
            </div>
        </div>
        <div className="onboard-action">
            Akready have an account? <p className="navigate-link" onClick={()=>navigate('/login')}>Login</p>
        </div>
        <Toast isOpen={toast.isOpen} type={toast.type} content={toast.content} />
    </div>)
}

export default Signup