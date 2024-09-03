import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Toast from './Toast';

const Redirect = () => {
    const { shortUrl } = useParams();
    const [linkData, setLinkData] = useState(null);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({ isOpen: false, type:'', content: '' });
    
    useEffect(() => {
        // Fetch link data when the component mounts or when shortUrl changes
        handleRedirect();
    }, [shortUrl]);

    const handleOpenToast=(content,type)=>{
        setToast({
            isOpen: true,
            type: type,
            content: content,
          });
      
          // Close the popup after 2 seconds
        setTimeout(() => setToast({ isOpen: false, type: '', content: '' }), 3000);
    }
    
    const handleRedirect = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/l/getlink", { shortUrl });
            
            // Check if the data is received properly
            if (response.data) {
                setLinkData(response.data);
            } else {
                console.error('Link data is missing or undefined in the response.');
                setError('No link data available.');
            }
        } catch (error) {
            console.error('Error fetching link data:', error);
            setError('Failed to fetch link data.');
        } finally {
            setLoading(false);
        }
    };

    const handleNav = async(originalUrl) => {
        if(originalUrl){
            setLoading(true)
        }
        try{
            const response = await axios.post("http://localhost:8000/l/increment-viewer-count", { shortUrl });
        }
        catch(error){
            console.log(error.message)
        }
        finally{
            if (originalUrl.startsWith("http://") || originalUrl.startsWith("https://")) {
            window.location.href = originalUrl;
        } 
        else {
            window.location.href = "https://" + originalUrl;
        }
        }
    };

    const handlePasswordSubmit = async () => {
        if(!password){
            handleOpenToast("Please enter a password","")
        }
        else{
            try {
                // Compare the provided password with the stored hashed password
                console.log(linkData)
                const isMatch = await axios.post("http://localhost:8000/l/verify-password", {link:linkData._id, password});
                
                if (isMatch.data.isMatch) {
                    // If the password matches, navigate to the original URL
                    handleNav(linkData.originalUrl);
                } else {
                    handleOpenToast("Incorrect Password","")
                }
            } catch (error) {
                handleOpenToast("Unexpected error occured","")
            }
        }
    };

    return (
        <div className='page'>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <div className='popup-bg'>
                    {linkData && linkData.password ? (
                        <div className='popup'>
                            <div className='popup-top'>
                                <div>
                                    <p className='title'>Protected Link</p>
                                    <p className='caption'>This link is password protected. Enter password to continue</p>
                                </div>
                            </div>
                        <div className='popup-inputs'>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                className='input'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='popup-bottom'>
                            <button className='submit' onClick={handlePasswordSubmit}>
                                {loading ? "Loading" : "Continue"}
                            </button>
                        </div>
                    </div>) : (
                        // If no password protection is required, navigate directly
                        handleNav(linkData.originalUrl)
                    )}
                </div>
            )}
            <Toast isOpen={toast.isOpen} type={toast.type} content={toast.content} />
        </div>
    );
};

export default Redirect;
