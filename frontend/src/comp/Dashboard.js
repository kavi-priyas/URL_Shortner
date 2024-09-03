import React, { useEffect, useState } from "react";
import axios from "axios"
import LinkCard from "./LinkCard";
import NewLink from "./NewLink";
import Toast from "./Toast";
import { useNavigate } from "react-router";
import Tooltip from "./Tootltip";

const Dashboard = () =>{
    const [links,setlinks] = useState(null)
    const [toast, setToast] = useState({ isOpen: false, type:'', content: '' });
    const [newLinkPopup, setNewLinkPopup] = useState({ isOpen: false});
    const [user,setUser]=useState({})
    const [loaded,setLoaded]=useState(false)
    const [search,setSearch]=useState("")
    const [showLogout, setShowLogout]=useState(false)
    const [toolhover, setToolHover]=useState({
        pfp:false,
        logout:false,
        more:false,
        new:false
    })
    const [filteredLinks, setFilteredLinks] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    const handleOpenToast=(content,type)=>{
        setToast({
            isOpen: true,
            type: type,
            content: content,
          });
      
          // Close the popup after 2 seconds
        setTimeout(() => setToast({ isOpen: false, type: '', content: '' }), 3000);
    }

    const getLinks = async(userId)=>{
        try{
            await axios.post("http://localhost:8000/u/links",
            {
                userId
            }).then((data)=>{
                setlinks(data.data)
            })
        }
        catch(error){
            console.log(error.message, "Couldn't get link")
        }
    }

    const fetchUser = async()=>{
        try{
            const fetchUser=JSON.parse(localStorage.getItem('user'))
            await axios.post("http://localhost:8000/u/fetch-user",{ userId:fetchUser._id }).then((data)=>{
                setUser(data.data)
                getLinks(data.data._id)
            })
        }
        catch(error){
            console.log(error.message, "Couldn't fetch user")
        }
        finally{
            setLoaded(true)
        }
    }

    const handleOpenNewLink=()=>{
        setNewLinkPopup({
            isOpen: true,
        });
    }

    const handleCloseNewLink=()=>{
        setNewLinkPopup({
            isOpen: false,
          });
    }

    const logoutToggle=()=>{
        setShowLogout(!showLogout)
    }

    const Logout=()=>{
        try{
            localStorage.removeItem('user')
        }
        finally{
            navigate('/login')
        }
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

    const handleSearch = (val) => {
            if (val) {
                const flinks = links.filter((link) =>link.title.toLowerCase().includes(val.toLowerCase()))
                setFilteredLinks(flinks);
            } 
            else {
                setFilteredLinks(links); // Reset to all links if search is empty
            }

    };

    useEffect(() => {
        handleSearch(search);
    }, [search]);

    return (<div className="page"> 
        <div className="page-top">
            <div className="user-info">
                {loaded && <div className="pfp" onMouseEnter={()=>handleMouseEnter("pfp")} onMouseLeave={()=>handleMouseLeave("pfp")} >
                        <p className="pfp-initial">{user.username[0]}</p>
                        {/* <ProfileImage email={user.email}/> */}
                        {toolhover.pfp && <Tooltip content={user.username}/>}
                    </div>
                }
                {showLogout && <div className="icon" name="logout" onMouseEnter={()=>handleMouseEnter("logout")} onMouseLeave={()=>handleMouseLeave("logout")} onClick={Logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-out-up-right"><path d="M22 12A10 10 0 1 1 12 2"/><path d="M22 2 12 12"/><path d="M16 2h6v6"/></svg>
                    {toolhover.logout && <Tooltip content={"Logout"}/>}
                </div>}
                <div className="dummy" onMouseEnter={()=>handleMouseEnter("more")} onMouseLeave={()=>handleMouseLeave("more")} onClick={logoutToggle}>
                    <div name="chevron" className={`icon ${showLogout ? 'rotated-icon' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                    {toolhover.more && <Tooltip content={"More"}/>}
                </div>
            </div>
            <div className="page-right" >
                <div className="search">
                    <div className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <input 
                        type="text"
                        className="search-input"
                        value={search}
                        id="search"
                        placeholder="Search by link title"
                        onChange={(e) =>{
                            setSearch(e.target.value)
                            handleSearch(e.target.value); // Call handleSearch after setSearch updates the state
                        }}
                    />
                    {search &&
                        <div className="search-icon" onClick={()=>setSearch("")} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </div>
                    }
                </div>
                <div className="dummy" >
                    <button className={"button"} onClick={handleOpenNewLink} onMouseEnter={()=>handleMouseEnter("new")} onMouseLeave={()=>handleMouseLeave("new")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                    {toolhover.new && <Tooltip content={"New Link"}/>}
                </div>
            </div>
        </div>
        
        <NewLink userCheck={true} isOpen={newLinkPopup.isOpen} bg={true} handleCloseNewLink={handleCloseNewLink} toastHandler={handleOpenToast} />
        {links !== null && (
            <div className="my-links">
                {filteredLinks ? (
                filteredLinks.map((link, index) => (
                    <LinkCard key={index} toastHandler={handleOpenToast} link={link} />
                ))
                ) : (
                links.map((link, index) => (
                        <LinkCard key={index} toastHandler={handleOpenToast} link={link} />
                    ))
                )}
            </div>
        )}


        <Toast isOpen={toast.isOpen} type={toast.type} content={toast.content} />
    </div>)
}

export default Dashboard