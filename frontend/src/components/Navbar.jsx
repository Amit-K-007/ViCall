import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
    const navigate = useNavigate();

    return <>
        <div className="flex justify-between items-center absolute bg-indigo-50 top-5 left-5 right-5 sm:left-10 sm:right-10">
            <div className="flex items-center">
                <img className="h-14 rounded-full border-solid border-blue-900 border-2" src={logo}></img>
                <span className="ml-4 font-bold text-blue-900 text-2xl">ViCall</span>
            </div>
            <button className="bg-blue-900 hover:bg-blue-800 h-10 text-white font-semibold px-4 rounded-md focus:outline-none shadow-md focus:shadow-outline"
            onClick={() => navigate('/auth/signin')}
            >
            Signin / Signup
            </button>
        </div>
    </>
}

export default Navbar;