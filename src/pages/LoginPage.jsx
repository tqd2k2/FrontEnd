import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
export default function LoginPage() {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  }
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.text.value;
    const password = event.target.password.value;

    axios
      .post(`${API_BASE_URL}/login`, { username, password })
      .then((response) => {
        // Lưu access token vào localStorage
        localStorage.setItem("accessToken", response.data.access_token);
        navigate("/qr")        
        alert("Login successfully");
      })
      .catch((error) => {
       // Xử lý lỗi
       if (error.response && error.response.status === 401) {
        setLoginError("Incorrect username or password");
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
      });
  };

  return (
    <section className="bg-cover bg-[url('https://img.freepik.com/premium-vector/white-background-with-blue-technology-circuit_583398-369.jpg')]">
    <div className="bg-form card flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="header text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Log in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your UserName</label>
            <input type="text" name='text' className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name='password' placeholder="••••••••" className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">LOG IN</button>
        </form>
        <div className="flex items-center">
            <p className="font-medium text-primary-600 dark:text-primary-500">Don't have an account? </p>
            <div className="mx-2">•</div>
            <div className="pointer" onClick={handleRegister} class="font-medium text-primary-600 hover:underline dark:text-primary-500"> Register here</div>
        </div>
        {loginError && <div className="text-red-500 text-center font-bold text-14">{loginError}</div>}
      </div>
    </div>
    </section>
  );
};
