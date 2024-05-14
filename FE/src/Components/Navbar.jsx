import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { getRequestWithToken } from "../Requests";
import {baseUrl} from "../Constants"

const Navbar = ({setIsLoggedIn, userInfo}) => {

    const navigate = useNavigate();
    const [isLogoutMenuOpened, setIsLogoutMenuOpened] = useState(false);
    const sortMenuRef = useRef();

    const Logout = async () => {
        const response = await getRequestWithToken(`${baseUrl}/user/logout`);
        if (response.status != 200 && response.status != 201) {
          
        }
        else {
            navigate("/");
            setIsLoggedIn(false);
        }


    }

    useEffect(() => {
        let closeDropdown = (e) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
                setIsLogoutMenuOpened(false);
            }
        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <div className="fixed z-20 w-full flex flex-row items-center h-13 px-4 bg-white">

            <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]">
                <img className="gb_Mc gb_Nd h-full w-full" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
            </div>

            <div className=" cursor-pointer" onClick={() => navigate("/")}>
                <h1 className=" font-base mr-30 text-[22px] ml-1 text-black">DocX</h1>
            </div>


            <div className=" ml-auto h-fit relative flex flex-col ">
                <div className="   rounded-lg w-fit px-2 h-10 hover:no-underline  items-center justify-center  inline-flex">
                    <div onClick={(e) => { e.stopPropagation(); setIsLogoutMenuOpened(prev => !prev) }} className="w-10 cursor-pointer h-10 rounded-full hover:bg-gray-200  flex flex-row items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#0097A7] flex flex-row items-center justify-center">
                            <h1 className="text-white text-semibold">{userInfo && userInfo.userName[0].toUpperCase()}</h1>
                        </div>
                    </div>
                </div>

                {isLogoutMenuOpened && <div ref={sortMenuRef} className="h-fit py-6 w-[300px] border-[1px] border-blue-200 items-center -right-1 top-11 rounded-[36px] absolute flex flex-col z-40  bg-gray-200">

                    <h1 className="text-[13px] mt-1">{userInfo.email}</h1>
                    <div className=" mt-6  rounded-lg w-fit px-2 h-10 hover:no-underline  items-center justify-center  inline-flex">
                        <div className="w-14 h-14 rounded-full hover:bg-gray-200  flex flex-row items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-[#0097A7] flex flex-row items-center justify-center">
                                <h1 className="text-white text-[28px] text-semibold">{userInfo && userInfo.userName[0].toUpperCase()}</h1>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-[20px] mt-3">Hi {userInfo && userInfo.userName}, </h1>
                    <div onClick={
                        Logout
                    } className="bg-white pl-5 items-center flex flex-row w-32 hover:bg-gray-100 cursor-pointer h-11 mt-7 rounded-[45px]">
                        <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" class=" NMm5M"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                        <h1 className="text-[16px] mb-[3px] ml-2 mt-1">Logout</h1>
                    </div>

                </div>}
            </div>

        </div>
    );
}

export default Navbar;