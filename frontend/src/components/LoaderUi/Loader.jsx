import { useEffect } from "react";
import "./Loader.css"
import createStars from "../../CreateStars";
import { useParams } from "react-router-dom";
const Loader = ()=>{

  const {Condition} = useParams()

useEffect(()=>{
  createStars();
},[])

  return(
    <>
    <div className="loader-div">
    <div class="loader-container">
        <svg class="website-construct" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle class="orbit" cx="100" cy="100" r="80"/>
            <circle class="orbit" cx="100" cy="100" r="60"/>
            <g class="orbit-animation">
                <circle class="planet pulse-animation" cx="100" cy="20" r="10"/>
                <circle class="satellite" cx="100" cy="40" r="5"/>
            </g>
            <g class="float-animation">
                <rect class="code-block glow-animation" x="70" y="90" width="60" height="10" rx="2"/>
                <rect class="code-block glow-animation" x="75" y="110" width="50" height="10" rx="2"/>
                <rect class="code-block glow-animation" x="80" y="130" width="40" height="10" rx="2"/>
            </g>
        </svg>
        <div class="loader-text">{Condition==="generating" ?'Constructing Your Futuristic Website...': 'Deploying Your Website... !'}</div> 
    </div>
  
    <div class="stars"></div>
</div>
    </>
  )
}

export default Loader;