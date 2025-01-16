import { useState } from 'react'
import './App.css'
import Provider from './ContextProvider.jsx'
import InputUI from './components/InputUi/InputUI.jsx'
import Preview from './components/PreviewUi/Preview.jsx'
import Login from './components/LoginUi/Login.jsx'
import Loader from './components/LoaderUi/Loader.jsx'
import 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import CopyUrl from './components/PreviewUi/WebUrl.jsx'
import Register from './components/LoginUi/Register.jsx'
function App() {
const Route = createBrowserRouter([
  {path:'/mainpage',element:<InputUI></InputUI>},
  {path:'/preview',element:<Preview/>},
  {path:'/',element:<Login/>},
  {path:'/register', element:<Register/>},
  {path:'/loader/:Condition' ,element:<Loader/>},
  {path:'/CopyUrl/:Url',element:<CopyUrl/>}
])
  return (
    <Provider>
      <Toaster position='top-center' reverseOrder={false}  />
    <RouterProvider router={Route}/>
    </Provider>     
  )
}

export default App
