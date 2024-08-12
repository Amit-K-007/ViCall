import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../providers/Authentication";
import { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";

const Navbar = () => {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const [isLoaded, setIsLoaded] = useState(false);
    const isMounted = useRef(false);

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }, []);

    useEffect(() => {
        console.log(isLoaded, isMounted, isAuthenticated);
        if(!localStorage.getItem('token')){
            setIsLoaded(true);
        }
        else if(isAuthenticated){
            setIsLoaded(true);
        }
        else if(isMounted.current){
            setIsLoaded(true);
        }
        isMounted.current = true;
    }, [isAuthenticated]);

    return <>
        <div className="flex justify-between items-center absolute bg-indigo-50 top-5 left-5 right-5 sm:left-14 sm:right-14">
            <div className="flex items-center">
                <img className="h-16 md:h-20 rounded-full border-solid border-blue-900 border-2" src={logo}></img>
                <span className="ml-4 font-bold text-blue-900 text-4xl">ViCall</span>
            </div>
            {
            isLoaded?
                (
                isAuthenticated?
                    <button 
                        className="ring-offset-2 text-lg font-semibold ring-blue-900 hover:shadow-lg hover:ring-blue-700 ring-2 px-5 py-2 rounded-full"
                        onClick={handleLogout}
                        >Log out
                    </button>
                :   
                    <button 
                        className="text-xl bg-blue-900 hover:bg-blue-800 hover:shadow-lg h-14 text-white font-semibold px-8 rounded-md focus:outline-none shadow-md focus:shadow-outline"
                        onClick={() => navigate('/auth/signin')}
                        >
                        <div className="sm:hidden">
                            Signin
                        </div>
                        <div className="hidden sm:block">
                            Signin /Signup
                        </div>
                    </button>
                )
            :
                
                <Spinner></Spinner>
            }
        </div>
    </>
}

export default Navbar;