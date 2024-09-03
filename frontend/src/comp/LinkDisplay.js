const LinkDisplay = ({shortUrl, toastHandler})=>{
    function copyToClipboard() {
        navigator.clipboard.writeText("http://localhost:3000/"+shortUrl)
            .then(() => {
                toastHandler("Copied to clipboard","")
            })
            .catch(err => {
                alert('Failed to copy text to clipboard.');
            });
    }

    return (<div className="link-display">
        <p className="link-url">{"http://localhost:3000/"+shortUrl}</p> 
        <button className="secondary-button" onClick={copyToClipboard}>
            Copy
        </button>
    </div>)
}

export default LinkDisplay