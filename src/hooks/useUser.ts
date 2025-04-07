import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import { User, userResponse } from "../types/authTypes";
import { Review, ReviewsResponse } from "../types/productTypes";


const UseUser = () => {
    const auth = useContext(AuthContext);
    let[userInfo,setUserInfo]=useState<User>()
    let [reviews,setReviews]=useState<Review[]|null>()
    const getUserInfo = async (): Promise<void> => {
      try {
        const headers = {
            authorization: `Heba__${auth?.user.token}`,
          };
        const res = await axios.get<userResponse>(`https://apiecommerce-hblh.onrender.com/user`,{headers});
        setUserInfo(res.data.user);
      } catch (error) {
        toast.error("Error fetching product");
      }
    };
    const updateInfo = async (
        phone?: string,
        address?: string,
        gender?: string,
        userName?: string
      ) => {
        try {
          const data: { [key: string]: string } = {}; 
      
          if (gender) data.gender = gender;
          if (address) data.address = address;
          if (phone) data.phone = phone;
          if (userName) data.userName = userName;
      
          const headers = {
            authorization: `Heba__${auth?.user.token}`,
          };
      
          const res = await axios.patch<userResponse>(
            `https://apiecommerce-hblh.onrender.com/user/update`,
            data,
            { headers }
          );
      
          if (res.data.message === "User updated successfully") {
            toast.success(res.data.message);
            getUserInfo();
          }
        } catch (error) {
          toast.error("Error updating user info");
        }
      };
      const updatePassword = async (oldPassword:string,newPassword:string,cPassword:string) => {
        try {
          const data: { [key: string]: string } = {
            oldPassword,
            newPassword,
            cPassword
          }; 
      
          const headers = {
            authorization: `Heba__${auth?.user.token}`,
          };
      
          const res = await axios.patch<userResponse>(
            "https://apiecommerce-hblh.onrender.com/user/updatePassword",
            data,
            { headers }
          );
      
          if (res.data.message === "success") {
            toast.success(res.data.message);
            getUserInfo();
          }
        } catch (error:any) {
          toast.error(error.response.data.message);
        }
      };
      const getAllReviews=async():Promise<void>=>{
        
          const headers = {
              authorization: `Heba__${auth?.user.token}`,
            };
          const res = await axios.get<ReviewsResponse>(`https://apiecommerce-hblh.onrender.com/review/get`,{headers});
         if(res.data?.reviews){
          setReviews(res.data?.reviews);
         }else{
          setReviews(null)
          toast.error("No Reviews Found")
         }
         
        
      }

    return {userInfo,getUserInfo,updateInfo,updatePassword,getAllReviews,reviews}
}

export default UseUser;
