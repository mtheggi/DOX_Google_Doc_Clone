import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed z-20 w-full flex flex-row items-center h-13 px-4 bg-white">

            <div className="w-[36px] h-[36px] min-w-[36px] min-h-[36px]">
                <img className="gb_Mc gb_Nd h-full w-full" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" srcset="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
            </div>

            <div className=" cursor-pointer" onClick={() => navigate("/")}>
                <h1 className=" font-base mr-30 text-[22px] ml-1 text-black">DocX</h1>
            </div>


            <div className="  ml-auto  rounded-lg w-fit px-2 mr-3 h-10 hover:no-underline  items-center justify-center  inline-flex">
                <span className="flex items-center justify-center ">
                    <span className="flex items-center font-medium text-gray-600 no-select text-sm ">Elsaka470</span>
                </span>
            </div>

        </div>
    );
}

export default Navbar;