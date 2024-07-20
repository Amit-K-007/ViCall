import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useState } from "react";
import { useAuth } from "../providers/Authentication";

const Homepage = () => {
    const {setIsAuthenticated} = useAuth();

    useState(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const response = await fetch("http://localhost:3000/auth",{
                    headers: {
                        "authorization": token
                    }
                });
                if(response.ok){
                    setIsAuthenticated(true);
                }
            }
        }
        checkToken();
    }, []);

    return <>
        <Navbar />
        <Hero />
    </>
}

export default Homepage;