import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/Authentication";
import { toast } from "react-toastify";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleSignin = useCallback(async () => {
        const responseJson = await fetch("http://localhost:3000/auth/signin",{
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        });
        if(!responseJson.ok){
            toast.error("Invalid Credentials");
        }
        else{
            const response = await responseJson.json();
            localStorage.setItem('email', email);
            localStorage.setItem('token', "Bearer " + response.token);
            setIsAuthenticated(true);
            navigate('/');
        }
    }, [email, password]);

    return <>
        <div className="bg-indigo-50 p-6 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl text-blue-900 font-semibold mb-6">Sign In</h1>
                <form>
                <div className="mb-4">
                    <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="email">
                    Email
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-blue-900 text-sm font-bold mb-2" htmlFor="password">
                    Password
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPasword(e.target.value)}
                    />
                </div>
                <div className="flex pt-1 items-center justify-between">
                    <button
                    className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSignin}
                    >
                    Sign In
                    </button>
                </div>
                <div className="text-center mt-5">
                    <p className="text-blue-900 text-sm">
                    Don't have an account?{' '}
                    <a href="/auth/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
                        Sign Up
                    </a>
                    </p>
                </div>
                </form>
            </div>
        </div>
    </>
}

export default Signin;