import axios from "axios";
import { SignUpFormData } from "../types/authTypes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

 const useSignUp=()=> {
    let navigate = useNavigate();
    const signup = async (values: SignUpFormData): Promise<void> => {
      try {
        const response = await axios.post("https://apiecommerce-hblh.onrender.com/auth/signup", values);
        const { data } = response;
  
        if (data?.message === "success") {
          toast.success("Signup successful!");
          navigate("../login");
        } else {
          toast.error(data?.validationArray[0] || "Signup failed.");
        }
  
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An error occurred during signup.");
      }
    };
  
    return { signup };
};
export default useSignUp;

