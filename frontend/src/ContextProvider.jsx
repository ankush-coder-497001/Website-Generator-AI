import {createContext, useState } from "react";
export const Context = createContext();
const Provider = ({children })=>{
  const [loader , setloader] = useState(false);
  const [LoginUser , setLoginUser] = useState({})
  const [FileName , setFileName] = useState()
  const [UserPrompt,setUserPrompt] = useState()
  const [FileCode,setFileCode] = useState()
  return(
    <Context.Provider
    
    value={{
      loader,
      setloader,
      LoginUser,
      setLoginUser,
      FileName,
      setFileName,
      UserPrompt,
      setUserPrompt,
      FileCode,
      setFileCode
    }}

    >
      {children}
    </Context.Provider>
  )
}

export default Provider;