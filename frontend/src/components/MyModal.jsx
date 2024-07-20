import { useState, useCallback } from 'react';
import Modal from '../components/Modal';
import { useNavigate } from  'react-router-dom';
import { toast } from 'react-toastify';
import { useSocket } from "../providers/Socket";

const MyModal = ({closeModal}) => {
    const socket = useSocket();
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const enterRoom = useCallback((event) => {
        if(event.target.id == "newMeetBtn"){
            const timestamp = Date.now();
            const randomNum = Math.floor(Math.random() * 1000);
            const uniqueValue = `${timestamp}${randomNum}`;
            const unique9DigitNumber = uniqueValue.slice(-9);
            socket.emit('create-room', {roomId: unique9DigitNumber});
            navigate(`/room/${unique9DigitNumber}`);
        }
        else{
            if(room == "" || room.length != 9){
                toast.error("Enter a valid room code",{
                    position: "bottom-right"
                });
            }
            else{
                navigate(`/room/${room}`);
            }
        }
    }, [room]);

    return <Modal closeModal={closeModal}>
        <div className="bg-indigo-50 rounded-lg shadow-lg h-full w-full flex justify-center items-center flex-col p-4">
            <button
            className="bg-blue-900 hover:bg-blue-800 h-12 text-white font-semibold w-full sm:w-9/12 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
            type="button"
            onClick={enterRoom}
            id='newMeetBtn'
            >Start a new video call</button>
            <div className="mt-5 flex w-full sm:w-9/12 justify-between items-center">
                <input
                type="number"
                placeholder="Join video call with code"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-8/12 rounded-md text-center grow h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                ></input>
                <button className="h-12 w-12 p-2 ml-3 bg-white rounded-md text-blue-900 hover:shadow-md hover:outline"
                onClick={enterRoom}
                id='joinBtn'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                </button>
            </div>
        </div>
    </Modal>;
}

export default MyModal;