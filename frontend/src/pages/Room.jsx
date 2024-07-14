import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { RTCConnection } from "../rtc/RTCconnection";
import ReactPlayer from 'react-player';


const Room = () => {
    const socket = useSocket();
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peer, setPeer] = useState(null);
    
    useEffect(() => {
        const setStream = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
            setLocalStream(stream);
        }
        setStream();
        console.log("first",localStream);
    }, []);
    
    const handleNewUserJoined = useCallback(async ({socketId}) => {
        const peer = new RTCConnection({socket, socketId});
        setPeer(peer);
        await peer.addTracks({localStream});
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
        const cand = new RTCIceCandidate(candidate);
        peer.handleIceRequest({cand});
    }, [peer]);

    useEffect(() => {
        console.log("second",localStream);
        socket.on('new-user-joined', handleNewUserJoined);
        socket.on('nego-offer', handleNegoOffer);
        socket.on('nego-done', handleNegoDone);
        socket.on('ice-request', handleIceCandidate);
        
        return () => {
            socket.off('new-user-joined', handleNewUserJoined);
            socket.off('nego-offer', handleNegoOffer);
            socket.off('nego-done', handleNegoDone);
            socket.off('ice-request', handleIceCandidate);
        }
    }, [localStream, peer]);

    return <>
        Room
        <ReactPlayer url={localStream} muted playing/>
        {remoteStream ? <ReactPlayer url={remoteStream} muted playing/> : <></>}
    </>
}

export default Room;