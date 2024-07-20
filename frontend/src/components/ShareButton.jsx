import { useState } from "react";
import { useParams } from "react-router-dom";

const ShareButton = () => {
    const {roomId} =useParams();
    const [sharePop, setSharePop] = useState(false);

    return <>
        <div className="ml-2 relative">
            <button
            onClick={() => setSharePop(!sharePop)}
            className={"bg-blue-900 hover:bg-blue-800 p-3 mr-2 text-white rounded-full hover:shadow-lg"}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
            </button>
            {sharePop 
            ?
            <div className="text-blue-900 bg-blue-100 border-2 border-solid border-blue-900 rounded-lg p-2 font-semibold flex flex-col absolute bottom-12 left-7">
                <span className="text-indigo-900 font-bold">Share ViCall Link:-</span>
                <div className="flex items-center">
                    <span>  Code: {roomId}</span>
                    <button 
                    onClick={() => navigator.clipboard.writeText("http://localhost:5173/room/" + roomId)}
                    className="ml-2 text-blue-500 hover:shadow-md hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                        </svg>
                    </button>
                </div>
            </div>
            :
            <></>
            }
        </div>
    </>;
}

export default ShareButton;