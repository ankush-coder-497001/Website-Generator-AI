import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { LoginUser } from '../../ApiHandler';
import { Context } from '../../ContextProvider';
import toast from 'react-hot-toast'

 const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const {setLoginUser} = useContext(Context);
    const navigate = useNavigate()


    useEffect(()=>{
      const data = JSON.parse(localStorage.getItem("BuildYourOwn"));
      if(data){
          setLoginUser(data)
          navigate('/mainpage');
      }
  },[])



  const handleLogin = (e) => {
    e.preventDefault();
    LoginUser({email,password}).then((res)=>{
     setLoginUser(res);
     toast.success("Logged In !")
     navigate("/mainpage");
     localStorage.setItem("BuildYourOwn",JSON.stringify(res));
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <div className="auth-link">
          <Link to="/register">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login