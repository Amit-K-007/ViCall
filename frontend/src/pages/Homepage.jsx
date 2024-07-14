import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/Socket";

const Homepage = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState(0);
    const navigate = useNavigate();
    const socket = useSocket();

    const enterRoom = useCallback(() => {
        navigate(`/room/${room}`);
        socket.emit('user-joined', {email, room});
    }, [room]);

    return <>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
        <input type="number" value={room} onChange={e => setRoom(e.target.value)}></input>
        <button onClick={enterRoom}>Enter</button>
    </>
}

export default Homepage;