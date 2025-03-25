import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
import { ResetFormData } from "../../types/authTypes";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    code: yup.string()
    .required("Code is required"),
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
  });

const ResetPasswordForm = () => {
    const {register,handleSubmit,formState:{errors}}=useForm<ResetFormData>({resolver:yupResolver(schema)});
    const onSubmit:SubmitHandler<ResetFormData>=(data)=>console.log(data)
    return (
        <div className="flex flex-col 2md:flex-row ">
       <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="signup" />   
       <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
        <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Reset Your Password</h2>
        <p className="text-primaryText text-base font-normal pb-12">Enter your details below</p>
        <form className="flex flex-col gap-10 w-3/4" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" className="border-b border-primaryText p-3 focus:outline-none" {...register("code")} placeholder="Reset Code"/>
        {errors.code&&<p className="text-sm font-medium text-red-700">{errors.code?.message}</p>}
            <input type="email" className="border-b border-primaryText p-3 focus:outline-none" {...register("email")} placeholder="Email"/>
            {errors.email&&<p className="text-sm font-medium text-red-700">{errors.email?.message}</p>}
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" {...register("password")} placeholder="Password"/>
            {errors.password&&<p className="text-sm font-medium text-red-700">{errors.password?.message}</p>}
            <input type="submit"className="px-30 py-4 cursor-pointer  bg-primary text-white rounded" value="Reset"/>
        </form>
        </div>  
        </div>
    );
}

export default ResetPasswordForm;
