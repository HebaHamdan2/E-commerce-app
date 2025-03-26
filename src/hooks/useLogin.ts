import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoginFormData } from '../types/authTypes';

const UseLogin = () => {
    let navigate = useNavigate();
    let  auth  = useContext(AuthContext);
   const login=async(values:LoginFormData): Promise<void>=>{
    try{
        const response = await axios.post("https://apiecommerce-hblh.onrender.com/auth/signin", values);
        const { data } = response;
  
        if (data?.message === "success") {
            localStorage.setItem("user", JSON.stringify(response.data))
            auth?.setUser(response.data)
          toast.success("Login successful!");
          navigate("../");
        } else {
          toast.error(data?.validationError[0] || "Login failed.");
       
        }

    }catch(error:any){
        toast.error(
            error.response?.data?.validationError?.[0]?.message ||
            error.response?.data?.message ||
            "An error occurred during login."
          );
        
    }
   }
   
    return {login}
}

export default UseLogin;
