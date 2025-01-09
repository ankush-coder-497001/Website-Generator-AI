import { Link, useNavigate } from "react-router-dom";
import { DownloadZipFile , GenerateWebsite } from "../../ApiHandler";
import "./Preview.css"
import CopyUrl from "./WebUrl";
import { useContext, useState } from "react";
import { Context } from "../../ContextProvider";
import SubDomain from "./SubDomain";
const Preview = ()=>{
  const {FileName,UserPrompt,LoginUser,setFileName,FileCode,setFileCode } = useContext(Context);
 const navigate = useNavigate()
 const [openNameForm,setopenNameForm] = useState(false);
    const HandleOnDownload = ()=>{
        DownloadZipFile(FileName).then((res)=>{
         console.log(res)
        }).catch((err)=>{
            console.error('Error downloading ZIP file:', err);
            alert('Failed to download ZIP file.');
        })
    }

    const HandleOnReGenerate = ()=>{
        //do somthing
        navigate('/loader/generating')
        const Uid = LoginUser._id;
        GenerateWebsite({propmt:UserPrompt,Uid})
        .then((data)=>{
          navigate('/preview')
          setFileName(data.Htmlfile);
          setFileCode(data.fileCode);
          console.log(data)
        })
        .catch((err)=>{
          navigate('/mainpage')
          toast.error(err)
        })
    }



  return(
    <>
    <div className="Preview-div">
    <div class="container-prev">
        <h1 className="prev-head">Your Website Preview <span className=" text-sm font-mono text-red-500 mx-2  "  >Your website might not display optimally here; please download it.</span>   </h1>
        <div >
            <div >
            {FileCode ? (
        <div
          dangerouslySetInnerHTML={{ __html: FileCode }} // Inject the HTML code
          style={{
            width: "100%",
            height: "500px",
            overflow: "auto",
          }}
        />
      ) : (
        <p>No content to preview.</p>
      )}
            </div>
        </div>
        
        <div class="buttons">
        <Link to={'/mainpage'} class="button" >
                HOME
            </Link>
            <button onClick={HandleOnReGenerate} class="button" >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2a10 10 0 0 1 10 10h-3l3 3 3-3h-3a10 10 0 1 0-3.42 7.42" />
</svg>

                ReGenerate
            </button>
            <button onClick={HandleOnDownload} class="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download your website
            </button>
            <button class="button" onClick={()=>setopenNameForm(true)} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                Deploy the website
            </button>
          
        </div>
    </div>
    <div class="credit">
        Created by Ankush Kumar Gupta
    </div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>
    {openNameForm && <SubDomain setopenNameForm = {setopenNameForm} /> }
</div>
    </>
  )
}

export default Preview;