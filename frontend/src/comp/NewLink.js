import React, { useState } from "react";
import axios from "axios"
import Toast from "./Toast";
import LinkDisplay from "./LinkDisplay";
import Tooltip from "./Tootltip";

const NewLink = ({userCheck, isOpen, bg, handleCloseNewLink, toastHandler}) =>{

    const [link, setlink] = useState("")
    const [title, setTitle] = useState("")
    const [password, setpassword] = useState("")
    const [shortUrl,setShortUrl] = useState(null)
    const [closeHover, setCloseHover]=useState(false)

    const handleSubmit = async()=>{
        if(!link){
            toastHandler("Please enter a link","")
        }
        else if(!title && bg){
            toastHandler("Please give a title","")
        }
        else{
            try{
                const user=JSON.parse(localStorage.getItem('user'))
                const shortUrl = await axios.post("http://localhost:8000/l/newlink",
                {
                    title: title ? title: null,
                    originalUrl: link,
                    userId: userCheck ? user._id : null,
                    password: password ? password : null
                })
                setShortUrl(shortUrl.data.shortUrl)
            }
            catch(error){
                console.log(error.message)
            }
        }
    }

    const handleMouseEnter = (element) => {
        setCloseHover(true);
    };
    
      // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setCloseHover(false);
    };

    if (!isOpen) {
        return null;
    }

    return (<div className={bg?"popup-bg":""}>
    <div className="popup">
            <div className="popup-top">
                <div>
                    <p className="title">Shorten a link</p>
                    {!bg && <p className="caption">Login to secure your link with password & much more</p>}
                </div>
                <div className="dummy" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleCloseNewLink}>
                    {bg && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>}
                    {closeHover && <Tooltip content={"Close"}/>}
                </div>
            </div>
            <inputs className="popup-inputs">
                <input
                    type="text"
                    className="input"
                    id="link"
                    placeholder="Paste your link"
                    value={link}
                    onChange={(e) => setlink(e.target.value)}
                />
                {userCheck && 
                    <>
                        <input
                            type="title"
                            className="input"
                            id="title"
                            placeholder="Give a title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            type="password"
                            className="input"
                            id="password"
                            placeholder="Set password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </>
                }
            </inputs>
            <div className="popup-bottom">
                <button 
                    onClick={handleSubmit}
                    id="submit"
                    className="submit" 
                    type="submit"
                >
                    Shorten
                </button>
            </div>
            {shortUrl && <LinkDisplay shortUrl={shortUrl} toastHandler={toastHandler}/>}
        </div>
    </div>)
}

export default NewLink