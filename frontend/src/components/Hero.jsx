import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyModal from './MyModal';
import { useAuth } from '../providers/Authentication';
import videoCall from '../assets/video-call.png';

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const { isAuthenticated } = useAuth();

    const startCall =useCallback(() => {
        if(!isAuthenticated){
            toast.error("Do Sign In to Start a Call",{
                position: "bottom-right"
            });
        }
        else{
            setShowModal(true);
        }
    }, [isAuthenticated]);

    const closeModal = () => setShowModal(false);

    return <>
        {showModal && <MyModal closeModal={closeModal}/>}
        <div className="bg-indigo-50 min-h-screen p-6 pt-44 md:pt-20 w-full flex items-center flex-col md:flex-row justify-center md:justify-between">
            <div className="max-w-lg w-full sm:p-8 flex flex-col items-center sm:items-start mb-20">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900">Let's do a ViCall</h1>
                <p className="text-blue-800 font-semibold my-5 text-xl leading-1 text-center sm:text-left">
                Connect with friends, family, and colleagues effortlessly with ViCall. Enjoy high-quality video calls with just a click!  
                </p>
                <button
                className="bg-blue-900 hover:bg-blue-800 text-white text-2xl font-semibold w-9/12 py-4 rounded-md focus:outline-none focus:shadow-outline"
                type="button"
                onClick={startCall}
                >Start a new video call</button>
            </div>
            <div className="flex justify-end lg:mr-20 items-center w-3/4 ">
                <img src={videoCall}></img>
            </div>
        </div>
    </>
}

export default Hero;