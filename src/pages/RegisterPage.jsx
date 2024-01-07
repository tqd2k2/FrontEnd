import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const RegisterPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.text.value;
    const password = e.target.password.value;
    const formData = new FormData();
    formData.append("file", selectedFile);

    if (!selectedFile) {
      console.error("No file selected");
      alert('No File selected')
      return;
    }

    axios
      .post(`${API_BASE_URL}/register`, { username, password })
      .then((response) => {
        console.log(response.data);
        alert("Register successfully");
        const id = response.data.user_id;
        axios.post(`${API_BASE_URL}/uploads/${id}`,formData)
            .then((response) => {
                console.log(response.data);
                alert("Create SQRC successfully");
                navigate("/login");
            })
            .catch((error) => {
                console.error("Create failed:", error);
                alert("Create failed: " + error);
            });

      })
      .catch((error) => {
        console.error(error);
        alert("Register failed");
      });
    }
  return (
    <section className="bg-cover bg-[url('https://img.freepik.com/premium-vector/white-background-with-blue-technology-circuit_583398-369.jpg')]">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create An Account</h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your UserName</label>
                      <input type="text" name='text' class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name='password' placeholder="••••••••" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fingerprint image</label>
                      <input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type='file' onChange={handleFileChange} />
                      <button type='submit' className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">REGISTER</button>
                  </form>
                  <div className="flex items-center">
                      <p className="textregister" class="font-medium text-primary-600 dark:text-primary-500">Already have an account?</p>
                      <div className="mx-2">•</div>
                      <div className="pointer" onClick={handleLogin} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in here</div>
                  </div>
          </div>
      </div>
    </div>
    </section>
  );
};

export default RegisterPage;