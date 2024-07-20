import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

    return <div className="absolute right-14 top-10">
        <button onClick={() => navigate('/')} className="flex items-center ring-offset-2 font-semibold ring-blue-900 hover:shadow-lg hover:ring-blue-700 ring-2 px-5 py-2 rounded-full text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-2">
            <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
            Back to Homepage
        </button>
    </div>;
}

export default BackButton;