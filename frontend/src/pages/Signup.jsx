import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../providers/Authentication";
import BackButton from "../components/BackButton";
import userSchema from "../schemas/userSchema";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const {roomId} = useParams();

    const signinLink = roomId ? `/auth/signin/${roomId}` : "/auth/signin";

    const handleSignup = useCallback(async () => {
        const isValid = userSchema.safeParse({email, password});
        if(isValid.success){
            const responseJson = await fetch("http://localhost:3000/auth/signup",{
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const response = await responseJson.json();
            if(!responseJson.ok){
                toast.error(response.msg,{
                    position: "bottom-right"
                });
                return;
            }
            toast.success(response.msg,{
                position: "bottom-right"
            });
            localStorage.setItem('token', "Bearer " + response.token);
            setIsAuthenticated(true);
            if(roomId){
                navigate(`/room/${roomId}`);
            }
            else{
                navigate('/');
            }
        }
        else{
            toast.error(<div>
                {isValid.error.issues.map((issue) => <div>{
                    issue.code == "invalid_string" ? "Enter valid email address" : "Enter minimum 8 characters password"
                }</div>)}
            </div>, {
                position: "bottom-right"
            });
        }
    }, [email, password, roomId]);

    return <>
        <div className="bg-indigo-50 p-6 min-h-screen flex items-center justify-center">
            <BackButton />
            <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl text-blue-900 font-semibold mb-10">Sign Up</h1>
                <form>
                <div className="mb-6">
                    <label 
                        className="block text-blue-900 text-xl font-bold mb-4" 
                        htmlFor="email"
                        >Email
                    </label>
                    <input
                        className="shadow appearance-none border text-xl rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label 
                        className="block text-blue-900 text-xl font-bold mb-4" 
                        htmlFor="password"
                        >Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded text-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                </div>
                <div className="flex pt-2 items-center justify-between">
                    <button
                        className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 text-xl px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignup}
                        >Sign Up
                    </button>
                </div>
                <div className="text-center mt-5">
                    <p className="text-blue-900 text-lg">
                        Already have an account?{' '}
                        <a 
                            href={signinLink} 
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                            >Sign In
                        </a>
                    </p>
                </div>
                </form>
            </div>
        </div>
    </>;
}

export default Signup;