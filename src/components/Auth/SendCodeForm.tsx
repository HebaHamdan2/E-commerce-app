import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { SendCodeFormData } from "../../types/authTypes";
const schema=yup.object({
      email: yup.string().required("Email is required").email("Please enter a valid email"),
    
})
const SendCodeForm = () => {
    const {register,handleSubmit,formState:{errors}}=useForm<SendCodeFormData>({resolver:yupResolver(schema)});
    const onSubmit:SubmitHandler<SendCodeFormData>=(data)=>console.log(data)
    return (
        <div className="flex flex-col 2md:flex-row ">
       <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="sendcode" />   
       <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
        <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Send Reset Code</h2>
        <p className="text-primaryText text-base font-normal pb-12">Enter your Email below</p>
        <form className="flex flex-col gap-10 w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <input type="email" className="border-b border-primaryText p-3 focus:outline-none" {...register("email")} placeholder="Email"/>
            {errors.email&&<p className="text-sm font-medium text-red-700">{errors.email?.message}</p>}
          <input type="submit"className="px-30 py-4  bg-primary text-white rounded cursor-pointer" value="Send"/>
        </form>
        </div>  
        </div>
    );
}

export default SendCodeForm;
