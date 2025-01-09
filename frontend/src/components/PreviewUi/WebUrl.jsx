import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const CopyUrl = ()=>{
  const {Url} = useParams();
  console.log(Url)

  const HandleOnCopy = ()=>{
    navigator.clipboard.writeText(Url)
    toast.success("copied to clipboard")
  }
  return(
    <>

    <div class="popup-overlay active" id="linkPopup">
        <div class="popup-content">
            <div class="popup-header">Your Website is Live!</div>
            <div class="link-container">
                <input type="text" class="website-link" id="websiteLink" value={Url} readonly/>
                <button class="copy-button" onClick={HandleOnCopy} >Copy</button>
            </div>
            <Link class="close-button" to={'/preview'} >Close</Link>
        </div>
    </div>

    
    </>
  )
}

export default CopyUrl;