import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import {useNavigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    useEffect(() => {  
        console.log("Test")      
        if (localStorage.getItem("token")) {
          navigate("/login");
        }
      });
    
 return children

};

export default ProtectedRoute;
