import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ResetFormData } from '../types/authTypes';

const UseReset = () => {
    let navigate = useNavigate();
    const resetPassword=async(values:ResetFormData):Promise<void>=>{
     try{
         const response = await axios.patch("https://apiecommerce-hblh.onrender.com/auth/forgetPasseword", values);
         const { data } = response;
   
         if (data?.message === "success") {
           toast.success("Reset Your Password Done");
           navigate("../");
         } else {
           toast.error(data?.validationError[0] || "Reset Password failed.");
        
         }
 
     }catch(error:any){
          toast.error(error.response.data.message||error.response.data?.validationError[0]?.message || error.response.data.message
             || "An error occurred during Reset Your Password.");
         
     }
    }
    
     return {resetPassword}
}

export default UseReset;
