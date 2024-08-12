import { useState } from "react";
import { useParams } from "react-router-dom";

const ShareButton = () => {
    const {roomId} =useParams();
    const [sharePop, setSharePop] = useState(false);

    return <>
        <div className="ml-2 relative z-10">
            <button
                onClick={() => setSharePop(!sharePop)}
                className={"bg-blue-900 hover:bg-blue-800 p-4 mr-2 text-white rounded-full hover:shadow-lg"}
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                </svg>
            </button>
            {sharePop 
            ?
            <div className="text-blue-900 w-42 bg-blue-100 border-2 text-xl border-solid border-blue-900 rounded-lg p-3 font-semibold flex flex-col absolute bottom-16 right-0">
                <span className="text-indigo-900 font-bold">Share Link:-</span>
                <div className="flex items-center">
                    <span className="w-40">Code: {roomId}</span>
                    <button 
                        onClick={() => navigator.clipboard.writeText("https://vi-call-amits-projects-2d351c5a.vercel.app/room/" + roomId)}
                        className="text-blue-800 hover:text-blue-500"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
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