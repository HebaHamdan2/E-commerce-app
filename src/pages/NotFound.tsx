import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="w-3/4 m-auto items-center flex flex-col mt-28">
         <h1 className="font-medium text-4xl 2md:text-9xl mb-10">404 Not Found</h1> 
         <p className=" mb-20 font-normal text-base">Your visited page not found. You may go home page.</p> 
         <Link to={'/'} className="bg-primary font-medium text-white text-base px-14 py-4">Back to home page</Link> 
        </div>
    );
}

export default NotFound;
