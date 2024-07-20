import { useNavigate } from "react-router-dom";

const Invalid = () => {
    const navigate = useNavigate();
    return <>
        <div className="bg-indigo-50 text-5xl text-blue-900 font-extrabold min-h-screen flex flex-col items-center justify-center">
            <span>Sorry, This Page is not Available</span>
            <button onClick={() => navigate('/')} className="text-2xl mt-10 bg-blue-900 hover:bg-blue-800 text-white font-semibold w-4/12 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Back to Homepage</button>
        </div>
    </>;
}

export default Invalid;