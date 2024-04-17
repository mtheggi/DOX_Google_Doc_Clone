import React, { useState, useEffect, useContext } from "react";
import FloatingInput from "../Components/authentication/FloatingInput";
import { postRequest } from "../Requests";


const LogIn = ({ setIsOpenedLoginMenu, setIsOpenedSignupMenu }) => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const validateLoginUsername = (username) => {
    if (username != '' && username)
      return true;
    else
      return false;
  }
  const validateLoginPassword = (password) => {
    if (password != '' && password) {
      return true;
    }
  }
  const handleLoginSubmit = async () => {
    if (username && password && validateLoginUsername(username) && validateLoginPassword(password) && loginError == null) {
      const response = await postRequest(`/user/login`, { username, password });
      if (response.status !== 200 && response.status !== 201) {
        setLoginError(response.data.message);
      }
      else {
          setIsOpenedLoginMenu(false);
          setIsLoggedIn(true);
      }
    }
  }


  return (
    <div className="h-full w-full flex justify-center items-center">
      <div id="navbar_login_menu" className="flex pt-10 w-[500px] flex-col bg-white msm:rounded-3xl h-[600px] min-w-88 px-6 msm:px-16">

        <div className="h-full flex flex-col">
          <div className="flex flex-col">

            <div className="flex flex-row justify-between">
              <h1 className="text-2xl h-7 text-blue-500 font-bold mb-2 text-neutral">
                Log In
              </h1>
              <div className="flex ">
         
              </div>
            </div>
            <p className="text-[14px] my-2 h-10 text-blue-500">By continuing, you agree to our{" "} User Agreement and acknowledge that you understand the{" "}Privacy Policy .</p>
          </div>

          <div className="mt-4">
            <div className="mb-8">
              <FloatingInput
                id={"login_username"}
                label="Username"
                validateInput={validateLoginUsername}
                setInputNameOnChange={setUsername}
                backendValidationError={loginError}
                setBackendValidationError={setLoginError}
              />
            </div>
            <div className="mb-2">
              <FloatingInput
                id={"login_password"}
                label="Password"
                validateInput={validateLoginPassword}
                setInputNameOnChange={setPassword}
                backendValidationError={loginError}
                setBackendValidationError={setLoginError}
              />
            </div>
            {loginError != null && <div className=" ml-1 h-2 text-xs font-light w-85"> <p className="text-red-400">{loginError}</p> </div>}
          </div>

          <div className="flex flex-col mt-auto">


      
            <div className={` text-[14px] text-black`}>
              New to DocX?  <a id="login_signup" onClick={(e) => { e.stopPropagation(); setIsOpenedSignupMenu(true); setIsOpenedLoginMenu(false) }} className=" text-reddit_links cursor-pointer hover:text-blue-300">Sign Up</a>
            </div>
          </div>
        </div>

        <div className="h-[96px] py-[24px] mt-auto mb-4 msm:mt-0 msm:mb-0 flex items-center">
          <div onClick={handleLoginSubmit} id="login_submit" className={` ${username && password && validateLoginUsername(username) && validateLoginPassword(password) && loginError == null ? '  hover:bg-blue-800 bg-[#3E82F8] cursor-pointer text-white' : 'text-gray-400 cursor-not-allowed'} w-120 mt-1 h-[48px] items-center justify-center inline-flex mx-auto rounded-3xl bg-gray-200`}>
            <span className="flex items-center justify-center">
              <span className="flex items-center gap-[8px] text-[14px] font-[600] ">
                Log In
              </span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogIn;
