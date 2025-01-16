import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../ContextProvider";
import { LoginUser } from "../../ApiHandler";
import toast from "react-hot-toast";

 const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [picture, setProfilePic] = useState(null);



  
  const {setLoginUser} = useContext(Context);
  const navigate = useNavigate()


  //check is localstorage contains the user data

  useEffect(()=>{
      const data = JSON.parse(localStorage.getItem("BuildYourOwn"));
      if(data){
          setLoginUser(data)
          navigate('/mainpage');
      }
  },[])


  const handleRegister = (e) => {
    e.preventDefault();
    const data = { name, email, password }
    LoginUser(data).then((res)=>{
      localStorage.setItem("BuildYourOwn",JSON.stringify(res));
      setLoginUser(res);
      navigate('/mainpage');
      toast.success("Welcome !")
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create Your Account</h2>
        <form onSubmit={handleRegister}>
          <div className="profile-pic-container">
            <div className="profile-pic" onClick={() => document.getElementById('profile-pic-input').click()}>
              {picture ? (
                <img src={picture || "/placeholder.svg"} alt="Profile" />
              ) : (
                <span>+</span>
              )}
            </div>
            <input
              type="file"
              id="profile-pic-input"
              accept="image/*"
              onChange={handleProfilePicChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
            />
          </div>
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
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <div className="auth-link">
          <Link to="/">Already have an account? Login here</Link>
        </div>
      </div>
    </div>

    
  );
};

export default Register;