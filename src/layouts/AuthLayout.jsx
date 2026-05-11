import { Outlet } from "react-router-dom";
import authBg from "../assets/bg.png";
import logo from "../assets/LOGO.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">

      {/* LEFT SIDE */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="text-center">
          <img src={logo} alt="logo" className="w-115 mx-auto" />
        </div>
      </div>

         {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <Outlet />  
      </div>

    </div>
  );
};

export default AuthLayout;