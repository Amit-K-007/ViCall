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
        <div className="bg-indigo-50 min-h-screen p-6 pt-32 md:pt-6 w-full flex items-center flex-col md:flex-row justify-center md:justify-between">
            <div className="max-w-md w-full sm:p-8 flex flex-col items-start mb-20">
                <h1 className="text-4xl sm:text-5xl font-bold text-blue-900">Let's do a ViCall</h1>
                <p className="text-blue-800 font-semibold my-5 text-lg leading-1">
                Connect with friends, family, and colleagues effortlessly with ViCall. Enjoy high-quality video calls with just a click!  
                </p>
                <button
                className="bg-blue-900 hover:bg-blue-800 text-white font-semibold w-8/12 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                type="button"
                onClick={startCall}
                >Start a new video call</button>
            </div>
            <div className="flex items-center w-4/6 md:w-96 md:h-96 w-1/2mr-md lg:mr-32">
                <img src={videoCall}></img>
            </div>
        </div>
    </>
}

export default Hero;