import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup"
import { LoginFormData } from "../../types/authTypes";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup
  .object({
  email: yup.string().required("Email is required").email("Please enter a valid email"),
  password: yup.string().required("Password is required"),
  });
const LoginForm = () => {
 
      const {
            register,
            handleSubmit,
            formState: { errors },
          } = useForm<LoginFormData>({
            resolver: yupResolver(schema),
          })
          const onSubmit: SubmitHandler<LoginFormData> = (data) => console.log(data)
    
    return (
        <div className="flex flex-col 2md:flex-row ">
        <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="signup" />   
        <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
         <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Log in to Exclusive</h2>
         <p className="text-primaryText text-base font-normal pb-12">Enter your details below</p>
         <form className="flex flex-col gap-10 w-3/4" onSubmit={handleSubmit(onSubmit)}>
             <input type="email" className="border-b border-primaryText p-3 focus:outline-none" {...register("email")} placeholder="Email"/>
             {errors.email&&<p className="text-sm font-medium text-red-700">{errors.email?.message}</p>}
             <input type="password" className="border-b border-primaryText p-3 focus:outline-none" {...register("password")} placeholder="Password"/>
             {errors.password&&<p className="text-sm font-medium text-red-700">{errors.password?.message}</p>}
             <div className="flex flex-row justify-between items-center">
             <input type="submit"className="px-14  py-3 cursor-pointer bg-primary text-white rounded " value="Log In" />
             <Link className="text-primary" to={'/sendcode'}>Forget Password?</Link>
             </div>
         </form>
         </div>  
         </div>
    );
}

export default LoginForm;
