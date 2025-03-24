import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup"
import { SignUpFormData } from "../../types/authTypes";
const schema = yup
  .object({
    userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
  cPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Confirm password must match the password"),
});

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SignUpFormData>({
        resolver: yupResolver(schema),
      })
      const onSubmit: SubmitHandler<SignUpFormData> = (data) => console.log(data)
    return (
        <div className="flex flex-col 2md:flex-row ">
       <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="signup" />   
       <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
        <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Create an account</h2>
        <p className="text-primaryText text-base font-normal pb-12">Enter your details below</p>
        <form className="flex flex-col gap-10 w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="border-b border-primaryText p-3 focus:outline-none"  {...register("userName")} placeholder="Name"/>
           {errors.userName &&<p className="text-sm font-medium text-red-700">{errors.userName?.message}</p>} 
            <input type="email" className="border-b border-primaryText p-3 focus:outline-none"  {...register("email")} placeholder="Email"/>
            {errors.email&&<p className="text-sm font-medium text-red-700">{errors.email?.message}</p>}
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" {...register("password")} placeholder="Password"/>
            {errors.password&&<p className="text-sm font-medium text-red-700">{errors.password?.message}</p>}
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" {...register("cPassword")} placeholder="Confirm Password"/>
            {errors.cPassword&&<p className="text-sm font-medium text-red-700">{errors.cPassword?.message}</p>}
            <input type="submit"className="px-30 py-4  bg-primary text-white rounded cursor-pointer" value="Create Account"/>
        </form>
        <p className="mt-4  ">Already have account?<Link to={'/login'} className="text-primary hover:underline"> Log in</Link></p>
        </div>  
        </div>
    );
}

export default SignUpForm;
