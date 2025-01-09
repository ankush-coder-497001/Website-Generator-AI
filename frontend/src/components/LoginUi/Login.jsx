import { useContext, useEffect } from "react";
import "./Login.css"
import  CreateStars from '../../CreateStars'
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'
import { LoginUser } from "../../ApiHandler";
import { Context } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
const Login = ()=>{

    const {setLoginUser} = useContext(Context);
    const navigate = useNavigate()

    useEffect(()=>{
    CreateStars();
    },[])

    //check is localstorage contains the user data

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("BuildYourOwn"));
        if(data){
            setLoginUser(data)
            navigate('/mainpage');
        }
    },[])

    const HanldeOnLogin = (res)=>{
        const DecodedData = jwtDecode(res.credential)
        LoginUser({
            email:DecodedData.email,
            name:DecodedData.name,
            picture:DecodedData.picture,
            password:DecodedData.sub
        }).then((res)=>{
            setLoginUser(res);
            localStorage.setItem("BuildYourOwn",JSON.stringify(res));
            navigate('/mainpage');
            toast.success("Logged In")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const HandleOnError = (err)=>{
     toast.error("Somthing Went Wrong!")
    }

  return(
    <>
    <div className="login-div">
    <div class="container">
        <h1 className="h1-login">Welcome Back</h1>
        <div class="login-container">
            <button class="google-btn" >
              
                <GoogleOAuthProvider clientId="739612264747-m7j6atlf4sc58rg8v4ahu11fm69jv0ub.apps.googleusercontent.com" >
                <GoogleLogin onSuccess={HanldeOnLogin} onError={HandleOnError} />
                </GoogleOAuthProvider>
            </button>
        </div>
    </div>
    <div class="credit">
        Created by Ankush Kumar Gupta
    </div>
    <div class="star"></div>
    <div class="star"></div>
    <div class="star"></div>

    <div class="stars"></div>
 
</div>
    </>
  )
}

export default Login;