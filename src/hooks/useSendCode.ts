import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SendCodeFormData } from "../types/authTypes";

const UseSendCode = () => {
    const navigate=useNavigate()
    const sendCode=async(values:SendCodeFormData): Promise<void>=>{
        try{
            const response = await axios.patch("https://apiecommerce-hblh.onrender.com/auth/sendcode", values);
            const { data } = response;
      
            if (data?.message === "success") {
              toast.success("Send Code successful Check Your Email Please");
              navigate("../reset");
            } else {
              toast.error(data?.validationError[0] || "Send Code failed.");
           
            }
    
        }catch(error:any){
             toast.error(   error.response?.data?.validationError?.[0]?.message ||
                error.response?.data?.message || "An error occurred during Send Code.");
            
        }
       }
       
        return {sendCode}
}

export default UseSendCode;
