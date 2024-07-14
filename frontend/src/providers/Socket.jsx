import { io } from "socket.io-client";
import { createContext, useContext } from "react";

const socket = io("http://localhost:3001");
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) => {
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>;
}