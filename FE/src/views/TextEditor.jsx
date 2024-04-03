import { ArrowPathIcon, DocumentIcon, EyeIcon, LockClosedIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useReducer, useRef, useEffect } from "react";
import Modal2 from "../Components/Modal2";
const TextEditor = () => {

    const [isOpenedShareMenu, setIsOpenedShareMenu] = useState(false);
    const [renameMode, setRenameMode] = useState(true);
    const [inputValue, setInputValue] = useState("Resume");
    const [lastValidName, setLastValidName] = useState("Resume");
    const inputRef = useRef();
    const sharedMenuRef = useRef();

    useEffect(() => {
        let closeDropdown = (e) => {
            if (sharedMenuRef.current && !sharedMenuRef.current.contains(e.target)) {
                setIsOpenedShareMenu(false);
            }
        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    useEffect(() => {
        if (!renameMode) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameMode]);

    return (

        <div className="w-full overflow-hidden min-w-[350px] h-fit flex flex-col bg-[#F9FBFD]">
            <div className="w-full h-14 px-2 py-2">
                <div className="w-full h-full flex items-center flex-row ">
                    <div className="h-full w-[52px] min-w-[52px]">
                        <DocumentTextIcon className="w-13 h-10 fill-blue-600 text-white" />
                    </div >
                    <div className="md:w-6/12 sm:5/12  w-3/12" onDoubleClick={() => setRenameMode(false)}>
                        {renameMode ? (<h1 className="text-black overflow-text w-full text-[18px] font-base">{inputValue}</h1>)
                            : (<input maxLength={50} onBlur={(e) => {
                                setRenameMode(true);
                                if (e.target.value.trim() === "") {
                                    setInputValue(lastValidName); // If new name is empty, set back to last valid name
                                } else {
                                    setLastValidName(e.target.value); // If new name is not empty, update last valid name
                                }
                            }} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} className=" border-0 text-[18px] focus:ring-0 focus:outline-none w-full font-base bg-transparent focus:border-0" value={inputValue}

                            />)
                        }
                    </div>

                    <div className="ml-auto mr-4 flex flex-row justify-center items-center w-9 h-9 cursor-pointer rounded-full hover:bg-gray-200">
                        <ArrowPathIcon className="w-6 h-6" />
                    </div>

                    <div onClick={(e) => { e.stopPropagation(); setIsOpenedShareMenu(true) }} className="w-20 mr-4 h-9 bg-blue-200 cursor-pointer hover:bg-blue-300 rounded-full  flex flex-row justify-center items-center">
                        <LockClosedIcon className="w-[18px] h-[18px] mr-1" />
                        <h1 className="text-[13px] font-medium">
                            Share
                        </h1>
                    </div>

                    <div className="w-20 h-fit">
                        <h1 className="text-[14px] font-medium">
                            Elsaka70
                        </h1>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col  h-16 border-gray-300 min-h-9 px-4">
                <div className="w-full h-9 px-2 flex flex-row items-center rounded-full bg-[#EDF2FB]">
                    <div className="ml-auto w-20 h-7 mr-2 flex justify-center items-center rounded-xl bg-[#DFE5EA] ">
                        {/* <PencilIcon className="h-[15px] w-[15px] mr-1"/>
                        <h1 className="text-[12px] font-medium">
                            Editor
                        </h1> */}
                        {/* <EyeIcon className="h-[17px] w-[17px] mr-1"/>
                        <h1 className="text-[12px] font-medium">
                            Viewer
                        </h1> */}
                        <UserCircleIcon className="h-[17px] w-[17px] mr-1" />
                        <h1 className="text-[12px] font-medium">
                            Owner
                        </h1>

                    </div>
                </div>
                <hr className="mt-auto" />
            </div>

            <div className="w-full px-4  overflow-y-auto h-full">
                <div className="w-full h-full ">
                    <div className="w-full h-full border-[0.5px] border-t-[0px] p-4 flex flex-row border-gray-300">
                        <div className="w-[790px] mx-auto h-fit">
                            <textarea className="w-full  bg-white  border-[0.5px] border-gray-300 focus:border-[0.5px] focus:border-gray-300 text-black p-10 h-[1000px] mb-2  resize-none focus:outline-none focus:ring-0"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            {isOpenedShareMenu && (
                <div className="community-modal flex flex-row items-center justify-center">
                    <div className='overlay'></div>
                    <div ref={sharedMenuRef} className='z-20 flex flex-col w-100% h-100%  msm:w-132 msm:h-160'>
                        <Modal2 setIsOpenedShareMenu={setIsOpenedShareMenu} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextEditor;