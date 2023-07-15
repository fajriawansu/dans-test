/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from 'react';
import Loginpage from './components/Loginpage'
import toast, { Toaster } from 'react-hot-toast';
import Apiservice from './services/Apiservice';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
import Errorpage from './components/Errorpage';
import Jobdetail from './modules/job/Jobdetail';
import Joblist from './modules/job/Joblist';
import MyProvider from './utils/MyProvider';
import { ProtectedRoute } from './utils/ProtectedRoute';
import UserContext from './utils/user-context';

function App() {

  const [user, setUser] = useState(null);

  // const handleOnLoad = async () => {
  //   try {
  //     const resp = await Apiservice.UserService.userAuthentication();
  //     if(resp.status == 200){
  //       // console.log(resp.data)
  //       setUser(resp.data);
  //     }

  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // useEffect(() => {
  //   handleOnLoad();
  // }, [])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Toaster />
      <UserContext.Provider value={user}>
        <RouterProvider router={Router} />
      </UserContext.Provider>
    </div>
  )
}

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<Errorpage />}>
    <Route path="/login" element={<Loginpage />} />
      <Route path="/" element={<ProtectedRoute><Navigate to="/job" /></ProtectedRoute>} />
      <Route path="/job" element={<ProtectedRoute><Joblist /></ProtectedRoute>} />
      <Route path="/job/:jobId" element={<ProtectedRoute><Jobdetail /></ProtectedRoute>} />
    </Route>
  )
)

export default App
