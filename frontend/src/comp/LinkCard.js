import { useNavigate } from "react-router"
import Share from "./Share";
import Tooltip from "./Tootltip";
import { useState } from "react";

const LinkCard = ({link, toastHandler }) =>{
    const navigate = useNavigate()
    const [toolhover, setToolHover]=useState({
        copy:false
    })

    function copyToClipboard() {
        navigator.clipboard.writeText("http://localhost:3001/"+link.shortUrl)
            .then(() => {
                toastHandler("Copied to clipboard","")
            })
            .catch(err => {
                alert('Failed to copy text to clipboard.');
            });
    }

    const handleMouseEnter = (element) => {
        setToolHover(prevState => ({
            ...prevState, // Copy the previous state
            [element]: true, // Update the specific element
        }));
    };
    
      // Function to handle mouse leave event
    const handleMouseLeave = (element) => {
        setToolHover(prevState => ({
            ...prevState, // Copy the previous state
            [element]: false, // Update the specific element
        }));
    };

    return (<div className="link-card">
        <div className="card-info">
            <div className="card-info-left">
                <p className="title" >{link.title ? link.title : "Untitled"}</p>
                <p className="views">{link.viewerCount + " views"} </p>
            </div>
            {link.password && <div className="dummy" onMouseEnter={()=>handleMouseEnter("protected")} onMouseLeave={()=>handleMouseLeave("protected")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    {toolhover.protected && <Tooltip content={"Password protected"}/>}
                </div>}
            
        </div>
        <div className="card-actions">
            <div className="icon" onClick={copyToClipboard} onMouseEnter={()=>handleMouseEnter("copy")} onMouseLeave={()=>handleMouseLeave("copy")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                {toolhover.copy && <Tooltip content={"Copy URL"}/>}
            </div>
            {/* <Share message={"http://localhost:3001/"+link.shortUrl} /> */}
            <div className="icon" onClick={()=>navigate('/'+link.shortUrl)} onMouseEnter={()=>handleMouseEnter("open")} onMouseLeave={()=>handleMouseLeave("open")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>            
                {toolhover.open && <Tooltip content={"Visit page"}/>}
            </div>
        </div>
    </div>)
}
export default LinkCard