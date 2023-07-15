/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate, useNavigate } from "react-router-dom";
import Apiservice from "../services/Apiservice";
import { useContext, useEffect, useState } from "react";
import UserContext from "./user-context";

export const ProtectedRoute = ({ children }) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const fetchUser = async () => {
    return await Apiservice.UserService.userAuthentication();
  }
  if(!user){
    try {
        fetchUser().then(resp => {
            console.log(resp)
            if(resp.status !== 200){
                navigate("/login")
            }
        });
        
  
      } catch (e) {
        console.log(e)
      }
    }
  return children;
};