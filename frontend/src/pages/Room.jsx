import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { RTCConnection } from "../rtc/RTCconnection";
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../providers/Authentication";
import boyImg from "../assets/boy.png";
import ShareButton from "../components/ShareButton";
import DraggableStream from "../components/DraggableStream";

const Room = () => {
    const socket = useSocket();
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const [videoBtnColor, setVideoBtnColor] = useState("bg-blue-900 hover:bg-blue-800");
    const [audioBtnColor, setAudioBtnColor] = useState("bg-blue-900 hover:bg-blue-800");
    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const navigate = useNavigate();
    const {roomId} = useParams();

    const checkToken = useCallback(async  () => {
        const token = localStorage.getItem("token");
        if(token){
            const response = await fetch("https://vicall-backend.onrender.com/auth",{
                headers: {
                    "authorization": token
                }
            });
            if(response.ok){
                setIsAuthenticated(true);
            } else {
                navigate(`/auth/signin/${roomId}`);
            }
        }
        else{
            navigate(`/auth/signin/${roomId}`)
        }
    }, []);

    useEffect(() => {
        if(socket){
            if(isAuthenticated){
                socket.emit('user-joined', {room: roomId});
            }
            else{
                navigate('/invalid_request');
            }
        }
        else{
            checkToken();
        }
    }, [socket, navigate, checkToken]);

    const handleNewUserJoined = useCallback(async ({socketId}) => {
        const peer = new RTCConnection({socket, socketId});
        setPeer(peer);
        peer.addTracks({localStream});
        peer.peer.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };
    }, [localStream]);
    
    const handleNegoOffer = useCallback(async ({caller, sdp}) => {
        const peer = new RTCConnection({socket, socketId: caller});
        setPeer(peer);
        peer.peer.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };
        await peer.handleOffer({caller, sdp, localStream});
    }, [localStream]);

    const handleNegoDone = useCallback(async ({sdp}) => {
        await peer.handleAnswer({sdp});
    }, [localStream, peer]);

    const handleIceCandidate = useCallback(({candidate}) => {
        if(peer){
            const cand = new RTCIceCandidate(candidate);
            peer.handleIceRequest({cand});
        }
    }, [peer]);
    
    const hangUpCall = useCallback(() => {
        if(peer){
            peer.hangUpCall();
        }
        if(localStream){
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }
        if(remoteStream){
            remoteStream.getTracks().forEach((track) => track.stop());
            setRemoteStream(null);
        }
        navigate('/');
    }, [localStream, remoteStream, peer, navigate]);

    const handleVideo = useCallback(() => {
        setRemoteStream((prevStream) => {
            if (prevStream) {
                const newStream = new MediaStream(prevStream.getTracks()); 
                newStream.getVideoTracks()[0].enabled = !prevStream.getVideoTracks()[0].enabled;
                return newStream;
            }
            return prevStream;
        });
    }, []);

    const handleInvalidRequest = useCallback(() => {
        navigate('/invalid_request');
    }, []);

    const handleSetStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        setLocalStream(stream);
    }, []);

    useEffect(() => {
        if(socket){
            socket.on('new-user-joined', handleNewUserJoined);
            socket.on('nego-offer', handleNegoOffer);
            socket.on('nego-done', handleNegoDone);
            socket.on('ice-request', handleIceCandidate);
            socket.on('close-call', hangUpCall);
            socket.on('pause-video', handleVideo);
            socket.on('start-stream', handleSetStream);
            socket.on('invalid-request', handleInvalidRequest);
            
            return () => {
                socket.off('new-user-joined', handleNewUserJoined);
                socket.off('nego-offer', handleNegoOffer);
                socket.off('nego-done', handleNegoDone);
                socket.off('ice-request', handleIceCandidate);
                socket.off('close-call', hangUpCall);
                socket.off('pause-video', handleVideo);
                socket.off('start-stream', handleSetStream);
                socket.off('invalid-request', handleInvalidRequest);
            }
        }
    }, [handleSetStream, handleInvalidRequest, handleVideo, localStream, peer, handleNewUserJoined, handleNegoOffer, handleNegoDone, handleIceCandidate, hangUpCall, socket]);
    
    const stopVideoStream = useCallback(() => {
        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack.enabled) {
            videoTrack.enabled = false; 
            setVideoBtnColor("bg-red-500 hover:bg-red-600");
        } else {
            videoTrack.enabled = true;
            setVideoBtnColor("bg-blue-900 hover:bg-blue-800");
        }
        socket.emit('pause-video', {socketId: peer.socketId});
    }, [localStream, peer, socket]);
    
    const stopAudioStream = useCallback(() => {
        const audioTrack = localStream.getAudioTracks()[0];
        if (audioTrack.enabled) {
            audioTrack.enabled = false; 
            setAudioBtnColor("bg-red-500 hover:bg-red-600");
        } else {
            audioTrack.enabled = true;
            setAudioBtnColor("bg-blue-900 hover:bg-blue-800");
        }
    }, [localStream]);

    return <>
        <div className="bg-indigo-50 h-screen overflow-hidden p-6 flex flex-col items-center justify-between">
            <div className="rounded-lg border-blue-900 overflow-hidden border-2 flex-grow flex items-center justify-center ">
                {remoteStream && remoteStream.getVideoTracks()[0].enabled 
                ? 
                <div className="w-full h-full bg-black">
                    <ReactPlayer width={"100%"} height={"100%"} url={remoteStream} playing/>
                </div>
                : 
                <>
                    <img src={boyImg} className="h-full object-contain"></img>
                </>
                }
            </div>
            <div className="flex items-center justify-center mt-4">
                <button
                    className={`${videoBtnColor} z-10 p-4 mr-2 text-white rounded-full hover:shadow-lg`}
                    onClick={stopVideoStream}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
                    </svg>
                </button>
                <button
                    className={`${audioBtnColor} z-10 mx-2 p-4 text-white rounded-full hover:shadow-lg`}
                    onClick={stopAudioStream}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                        <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                    </svg>
                </button>
                <button
                    className="bg-red-500 z-10 p-4 mx-2 text-white rounded-full hover:shadow-lg hover:bg-red-600"
                    onClick={hangUpCall}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                </button>
                <ShareButton />
            </div>
            <DraggableStream localStream={localStream} />
        </div>
    </>;
}

export default Room;
