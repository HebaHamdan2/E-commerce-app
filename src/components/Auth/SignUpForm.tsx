import { Link } from "react-router-dom";

const SignUpForm = () => {
    return (
        <div className="flex flex-col 2md:flex-row ">
       <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="signup" />   
       <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
        <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Create an account</h2>
        <p className="text-primaryText text-base font-normal pb-12">Enter your details below</p>
        <form className="flex flex-col gap-10 w-3/4">
            <input type="text" className="border-b border-primaryText p-3 focus:outline-none"  placeholder="Name"/>
            <input type="email" className="border-b border-primaryText p-3 focus:outline-none"  placeholder="Email"/>
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" placeholder="Password"/>
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" placeholder="Confirm Password"/>
            <button type="submit"className="px-30 py-4  bg-primary text-white rounded">Create Account</button>
        </form>
        <p className="mt-4 ">Already have account?<Link to={'/login'}>Log in</Link></p>
        </div>  
        </div>
    );
}

export default SignUpForm;
