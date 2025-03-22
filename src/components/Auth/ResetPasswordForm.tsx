const ResetPasswordForm = () => {
    return (
        <div className="flex flex-col 2md:flex-row ">
       <img src="../../../src/assets/dl.beatsnoop 1.svg" alt="signup" />   
       <div className="w-full 2md:w-[95%] p-8 flex flex-col items-start justify-center">
        <h2 className="font-Inter font-medium text-3xl pb-6 text-primaryText">Reset Your Password</h2>
        <p className="text-primaryText text-base font-normal pb-12">Enter your details below</p>
        <form className="flex flex-col gap-10 w-3/4">
        <input type="text" className="border-b border-primaryText p-3 focus:outline-none" placeholder="Reset Code"/>
            <input type="email" className="border-b border-primaryText p-3 focus:outline-none"  placeholder="Email"/>
            <input type="password" className="border-b border-primaryText p-3 focus:outline-none" placeholder="Password"/>
            <button type="submit"className="px-30 py-4  bg-primary text-white rounded">Reset</button>
        </form>
        </div>  
        </div>
    );
}

export default ResetPasswordForm;
