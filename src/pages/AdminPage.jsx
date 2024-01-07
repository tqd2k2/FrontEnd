import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { API_BASE_URL } from "../config";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken){
    const decoded = jwt_decode(accessToken);
    const user_id = decoded.sub;
  
    if (user_id !== 1) {
        alert("You are not admin");
        navigate('/');
    } else {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const user = response.data.username;
        setUser(user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("You are not authenticated");
      } else {
        alert(error);
      }
      }
    };
      fetchUser();
    }
    } else {
      alert("You are not logged in");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken){
      axios.get(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const dataList = response.data;
          setData(dataList);
        })
        .catch((error) => {
          // Xử lý lỗi 
          console.error('Error:', error);
        });
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('accessToken');
      axios
        .post(`${API_BASE_URL}/logout`,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          alert("Log out success!");
          localStorage.removeItem("accessToken");
          window.location.reload();
        })
        .catch((error) => { 
          alert(error);
        }); 
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${userId}`);
      if (response.status === 204) {
        alert('User deleted successfully.');
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error while deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  const handleHome = () => {
    if (location.pathname === "/") {
      window.location.reload(); 
    } else {
      navigate("/");
    }
  };

  return (
      <section className="bg-cover bg-center h-screen bg-[url('https://img.freepik.com/premium-vector/white-background-with-blue-technology-circuit_583398-369.jpg')]">
      <nav className="relative flex w-full flex-wrap items-center justify-between bg-orange-400 py-1 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-1">
          <div className="ml-2 flex items-center">
            <img className="w-8 h-8" src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN.png" alt="Logo của Học Viện Kỹ Thuật Mật Mã ACTVN"></img>
            <p className="text-xl font-bold ml-2 text-neutral-800 dark:text-neutral-200">SQRC APP</p>
          </div>
          <div className="flex items-center space-x-4 mr-4">
            <button type="button" onClick={handleHome} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">Home</button>
            {user && ( <button type="button" onClick={handleLogout} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded">Log Out</button>
            )}
            </div> 
        </div>
      </nav>
      <div className="flex justify-center items-center mx-auto my-auto lg:py-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <p className="text-4xl text-center font-bold mx-auto my-auto text-neutral-800 dark:text-neutral-200">Welcome to the Adminpage</p>
      {user && (
          <p className="text-4xl text-center font-bold mx-auto my-auto text-neutral-800 dark:text-neutral-200">Hello! {user}</p>
      )}
      </div>
      </div>
      <div className="w-1/2 mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-base text-center text-gray-500 dark:text-gray-400 bg-white">
          <thead className="text-xl text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-1 ">ID</th>
              <th scope="col" className="px-6 py-1 ">Username</th>
              <th scope="col" className="px-6 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-1">{item.id}</td>
                <td className="px-3 py-1">{item.username}</td>
                <td className="px-3 py-1">
                  {item.id !== 1 ? (
                  <button className="hover:bg-red-600 text-black hover:text-white font-semibold px-2 py-1 rounded" onClick={() => deleteUser(item.id)}>Delete
                  </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      </section>
  );
};
