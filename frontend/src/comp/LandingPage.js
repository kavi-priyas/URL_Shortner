import { useState } from "react";
import NewLink from "./NewLink"
import Toast from "./Toast";
import { useNavigate } from "react-router";

const LandingPage = () =>{
    const [newLinkPopup, setNewLinkPopup] = useState({ isOpen: true});
    const [toast, setToast] = useState({ isOpen: false, type:'', content: '' });
    const navigate=useNavigate()

    const handleOpenToast=(content,type)=>{
        setToast({
            isOpen: true,
            type: type,
            content: content,
          });
      
          // Close the popup after 2 seconds
        setTimeout(() => setToast({ isOpen: false, type: '', content: '' }), 3000);
    }

    const handleCloseNewLink=()=>{
        setNewLinkPopup({
            isOpen: false,
          });
    }

    return (<div className="page">
        <div className="page-top">
            <div className="landingpage-left">
                <p className="brand-title">Shawtly</p>
                <p className="caption">Your favorite URL shortener</p>
            </div>
            <div className="landingpage-right">
                <div className="navigate-link" onClick={()=>navigate('/signup')}>
                    Signup
                </div>
                <button className="submit" onClick={()=>navigate('/login')}>
                    Login
                </button>
            </div>
        </div>
        <NewLink  userCheck={false} isOpen={newLinkPopup.isOpen} bg={false} handleCloseNewLink={handleCloseNewLink} toastHandler={handleOpenToast}/>
        <Toast isOpen={toast.isOpen} type={toast.type} content={toast.content} />
    </div>)
}

export default LandingPage