import { useContext, useRef } from "react";
import { DeployOnNetlify } from "../../ApiHandler";
import { Context } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SubDomain = ({setopenNameForm})=>{
const {FileName} = useContext(Context);
const Domainref = useRef()
const navigate = useNavigate()
const HandleOnDeploye = ()=>{
  navigate("/loader/deploying")
  const customSubDomain = Domainref.current.value;
  DeployOnNetlify({filename:FileName,customSubDomain}).then((res)=>{
    console.log(res);
    navigate(`/CopyUrl/${res}`)
  }).catch((err)=>{
    navigate("/preview")
    toast.error("error while Deployment")
    console.log(err)
  })
}
  return(
    <>

    <div class="popup-overlay active" id="linkPopup">
        <div class="popup-content">
            <div class="popup-header">Enter SubDomain For Your Website!</div>
            <div class="link-container">
                <input ref={Domainref} type="text" class="website-link" id="websiteLink" placeholder="eg:- My-Portfolio" readonly/>
                <button class="copy-button" onClick={HandleOnDeploye} >Deploy</button>
            </div>
            <button class="close-button" onClick={()=>setopenNameForm(false)} >Close</button>
        </div>
    </div>
    </>
  )
}

export default SubDomain;