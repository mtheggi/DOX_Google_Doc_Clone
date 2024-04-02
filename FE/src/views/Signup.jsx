import React, { useState, useEffect, useContext } from "react";
import FloatingInput from "../Components/authentication/FloatingInput";
import { postRequest } from "../Requests";


const SignUp = ({ setIsOpenedsignupMenu, setIsOpenedSignupMenu }) => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupError, setSignupError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validateEmail = (email) => {
    var re = /^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+)\.([a-z A-Z]{2,6})$/;
    return re.test(email);
  };

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (username != '' && username && regex.test(username))
      return true;
    else
      return false;
  }

  const validatePassword = (password) => {
    if (password != '' && password && password.length >= 8) {
      return true;
    }
    else {
      return false;
    }
  };

  const handleSignupSubmit = async () => {
    if (signupError == null && email && validateEmail(email) && username && validateUsername(username) && password && validatePassword(password)) {
      console.log("signup", { email, username, password })
      const response = await postRequest(`http://localhost:8080/user/signup`, { email: email, userName: username, password: password });
      console.log(response.status);
      if (response.status != 200 && response.status != 201) {
        setSignupError(response.data.message);
      }
      else {
        setIsLoggedIn(true);
      }
    }
  }


  return (
    <div className="h-full w-full flex justify-center items-center">
      <div id="navbar_signup_menu" className="flex pt-10 w-[500px] flex-col bg-white msm:rounded-3xl h-[600px] min-w-88 px-6 msm:px-16">

        <div className="h-full flex flex-col">
          <div className="flex flex-col">

            <div className="flex flex-row justify-between">
              <h1 className="text-2xl h-7 text-black font-bold mb-2 text-neutral">
                Sign up
              </h1>
              <div className="flex ">

              </div>
            </div>
            <p className="text-[14px] my-2 h-10 text-black">By continuing, you agree to our{" "} User Agreement and acknowledge that you understand the{" "}Privacy Policy .</p>
          </div>

          <div className="mt-6">
            <div className="mb-6">
              <FloatingInput
                id={"signup_username"}
                label="Username"
                validateInput={validateUsername}
                setInputNameOnChange={setUsername}
                backendValidationError={signupError}
                setBackendValidationError={setSignupError}
              />
            </div>
            <div className="mb-6">
              <FloatingInput
                id={"signup_email"}
                label="Email"
                validateInput={validateEmail}
                setInputNameOnChange={setEmail}
                backendValidationError={signupError}
                setBackendValidationError={setSignupError}
              />
            </div>
            <div className="mb-2">
              <FloatingInput
                id={"signup_password"}
                label="Password"
                validateInput={validatePassword}
                setInputNameOnChange={setPassword}
                backendValidationError={signupError}
                setBackendValidationError={setSignupError}
              />
            </div>
            {signupError != null && <div className=" ml-1 h-2 text-xs font-light w-85"> <p className="text-red-400">{signupError}</p> </div>}
          </div>

          <div className="flex flex-col mt-auto">

          </div>
        </div>

        <div className="h-[96px] py-[24px] mt-auto mb-4 msm:mt-0 msm:mb-0 flex items-center">
          <div onClick={handleSignupSubmit} id="signup_submit" className={` ${email && validateEmail(email) && username && password && validateUsername(username) && validatePassword(password) && signupError == null ? '  hover:bg-blue-800 bg-blue-500 cursor-pointer text-white' : 'text-gray-500 cursor-not-allowed'} w-120 mt-1 h-[48px] items-center justify-center inline-flex mx-auto rounded-3xl bg-gray-200`}>
            <span className="flex items-center justify-center">
              <span className="flex items-center gap-[8px] text-[14px] font-[600] ">
                Sign up
              </span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;
