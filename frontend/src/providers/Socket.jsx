import { io } from "socket.io-client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./Authentication";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (isAuthenticated){
            const token = localStorage.getItem('token');
            const newSocket = io("http://localhost:3000", {
                auth: {
                    token: token
                }
            });
            setSocket(newSocket);
            return () => {
                newSocket.disconnect();
            };
        } 
        else{
            setSocket(null);
        }
    }, [isAuthenticated]);
    
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>;
}