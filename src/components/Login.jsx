import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/UseAuth.js";

function Login() {

  const { setUser } = useAuth();
  const [load, setLoad] = useState(false)
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoad(!load)
      const rs = await axios.post(
        "http://192.168.42.139/api/login",
        input
      );
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://192.168.42.139/api/me", {
        headers: { Authorization: "Bearer " + rs.data.token }
      })
      if (rs1.status === 200) {
        setLoad(false)
        setUser(rs1.data.data[0])
      }
    } catch (err) {
      console.log(err);
      // alert(err);
    }
  };


  return (
    <div className="flex justify-center pt-20 sm:pt-28 h-screen bg-gradient-to-tr from-green-900 to-green-700">
      <div className="flex flex-col rounded-2xl h-fit pb-5 w-[400px] bg-white shadow-2xl scale-90 sm:scale-100">
        <div className="flex items-center justify-center mt-5">
          <div className="w-[150px] h-[150px] rounded-full">
            <img className="rounded-full" src="https://picsum.photos/id/120/150" alt="" />
          </div>
        </div>
        <h1 className="flex justify-center text-3xl text-green-800 font-bold my-2">Login</h1>
        <div className="px-4">
          <div className="flex flex-col gap-5 w-full my-2 mb-10">
            <div className="relative">
              <input type="text" id="floating_username" className="block px-2 pb-2 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border-2 border-green-800 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " name="username" value={input.username} onChange={hdlChange} required />
              <label htmlFor="floating_username" className="absolute text-lg duration-300 transform -translate-y-5 text-green-800 scale-75 top-2 z-10 origin-[0] font-bold bg-white px-2 peer-focus:px-2 peer-focus:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:font-bold peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:font-bold start-1">Username</label>
            </div>
            <div className="relative">
              <input type="password" id="floating_password" className="block px-2 pb-2 pt-4 w-full text-lg text-gray-900 bg-transparent rounded-lg border-2 border-green-800 focus:outline-none focus:ring-0 focus:border-green-700 peer" placeholder=" " name="password" value={input.password} onChange={hdlChange} required />
              <label htmlFor="floating_password" className="absolute text-lg duration-300 transform -translate-y-5 text-green-800 scale-75 top-2 z-10 origin-[0] font-bold bg-white px-2 peer-focus:px-2 peer-focus:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:font-bold peer-focus:scale-75 peer-focus:-translate-y-5 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:font-bold start-1">Password</label>
            </div>
          </div>
          <button className="w-full h-12 bg-green-800 transition ease-in-out hover:bg-green-900 active:bg-green-800 text-white font-bold py-2 px-4 rounded-full flex justify-center items-center scale-100 active:scale-95 disabled:bg-green-800 disabled:scale-100 disabled:opacity-85" type="submit" onClick={hdlSubmit} disabled={load}>
            {load ? <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-green-600" /> : "Login"}</button>
        </div>
      </div>
    </div>
  );
}

export default Login;