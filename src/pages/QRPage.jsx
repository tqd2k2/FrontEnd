import { useState, useEffect } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const QRPage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [isLogIn, setIsLogIn] = useState(false);
    const [user_id, setUser_id] = useState(null);
    
    const navigate = useNavigate();

    const handleCheck = async () => { 
        try{    
            const response = await axios.get(`${API_BASE_URL}/checkauth`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (response.status === 200) {
                navigate('/');
            } else {        
                console.error('Error:', response.data);
                alert(response.data());
            }   
        } catch(error) {
            if (error.response && error.response.status === 401) {
                alert("You are not authenticated");
            } else {
                alert(error);
            }
        } 
    };

    useEffect(() => {
        if (accessToken) {
            const decoded = jwt_decode(accessToken);
            const user_id = decoded.sub;
            setIsLogIn(true);
            setUser_id(user_id);
        }
    }, [accessToken]);

    const handleLogin = () => {
        navigate("/login");
    };
    
    return (
        <div className="bg-cover bg-[url('https://img.freepik.com/premium-vector/white-background-with-blue-technology-circuit_583398-369.jpg')]">
            {isLogIn ? (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <img className="mx-auto max-w-xl" src={`${API_BASE_URL}/qrcode/${user_id}`} alt="SQRC"></img>
                <p className="text-xs font-bold mx-auto mb-2 text-neutral-800 dark:text-neutral-200">Please use the SQRC Authentication App to scan the above qr code and authenticate the user then press the button below</p>
                <button type="submit" onClick={handleCheck} className="flex flex-col items-center justify-center text-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Check Auth</button>
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <p className="text-4xl font-bold mx-auto mb-10 text-neutral-800 dark:text-neutral-200">You are not logged in, Please press the button below to log in first!</p>
                <button type="submit" onClick={handleLogin} className="flex flex-col items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Click To Redirect To The Login Page</button>
            </div>
            )}
        </div>
    );
};

export default QRPage;