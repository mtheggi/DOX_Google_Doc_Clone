import { ArrowPathIcon, DocumentIcon, EyeIcon, LockClosedIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { postRequest } from "../Requests";
import { useNavigate } from "react-router-dom";
import ShareModal from "../Components/ShareModal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles
import { DisconnectWebSocket, ConnectToWebSocket, sendmessage } from '../services/WebSocket';
import { convertDeltaToCrdt } from '../services/CRTS';
import { useLocation } from 'react-router-dom';
const toolbarOptions = [
    ['bold', 'italic'],        // toggled buttons
];


const CustomToolbar = () => {
    const baseUrl = ""
    const [permissions, setPermissions] = useState("Owner");
    return (
        <div id="toolbar" className="w-full h-9 px-2 flex flex-row items-center rounded-full bg-[#EDF2FB]">

            <div className="ml-auto w-20 h-7 mr-2 flex justify-center items-center rounded-xl bg-[#DFE5EA] ">

                {
                    permissions == "Editor" &&
                    <>
                        <PencilIcon className="h-[15px] w-[15px] mr-1" />
                        <h1 className="text-[12px] font-medium">
                            Editor
                        </h1>
                    </>}
                {
                    permissions == "Viewer" &&
                    <>
                        <EyeIcon className="h-[17px] w-[17px] mr-1" />
                        <h1 className="text-[12px] font-medium">
                            Viewer
                        </h1>
                    </>}
                {
                    permissions == "Owner" &&
                    <>
                        <UserCircleIcon className="h-[17px] w-[17px] mr-1" />
                        <h1 className="text-[12px] font-medium">
                            Owner
                        </h1>
                    </>}
            </div>
        </div>
    )
};


const TextEditor = () => {

    const [isOpenedShareMenu, setIsOpenedShareMenu] = useState(false);
    const [renameMode, setRenameMode] = useState(true);
    // const [inputValue, setInputValue] = useState(inputdocmunet.title);
    // const [lastValidName, setLastValidName] = useState(inputdocmunet.title);
    // const [contentOfDocument, setContentOfDocument] = useState(inputdocmunet.content);
    const inputRef = useRef();
    const sharedMenuRef = useRef();
    const quillRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {

        ConnectToWebSocket(quillRef);
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

                    <div onClick={() => navigate("/home")} className="w-[36px] cursor-pointer h-[36px] min-w-[36px] mr-1 ml-2 min-h-[36px]">
                        <img className="gb_Mc gb_Nd h-full w-full" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
                    </div >
                    <div className="md:w-6/12 sm:5/12  w-3/12" onDoubleClick={() => setRenameMode(false)}>
                        {renameMode ? (<h1 className="text-black overflow-text w-full text-[18px] font-base">test</h1>)
                            : (<input maxLength={50} onBlur={(e) => {
                                setRenameMode(true);

                                if (e.target.value.trim() === "") {
                                    setInputValue(lastValidName); // If new name is empty, set back to last valid name
                                } else {
                                    setLastValidName(e.target.value); // If new name is not empty, update last valid name
                                }
                            }} onChange={(e) => { setInputValue(e.target.value); }} ref={inputRef} className=" border-0 text-[18px] focus:ring-0 focus:outline-none w-full font-base bg-transparent focus:border-0" value={inputValue}

                            />)
                        }
                    </div>

                    <div className="ml-auto mr-4 flex flex-row justify-center items-center w-9 h-9 cursor-pointer rounded-full hover:bg-gray-200">
                        <ArrowPathIcon className="w-6 h-6" />
                    </div>

                    <div onClick={(e) => { e.stopPropagation(); setIsOpenedShareMenu(true) }} className="w-20 mr-1 h-9 bg-blue-200 cursor-pointer hover:bg-blue-300 rounded-full  flex flex-row justify-center items-center">
                        <LockClosedIcon className="w-[18px] h-[18px] mr-1" />
                        <h1 className="text-[13px] font-medium">
                            Share
                        </h1>
                    </div>

                    <div className=" rounded-lg w-fit px-2 h-10 hover:no-underline  items-center justify-center  inline-flex">
                        <div className="w-10 cursor-pointer h-10 rounded-full hover:bg-gray-200  flex flex-row items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-[#0097A7] flex flex-row items-center justify-center">
                                <h1 className="text-white text-semibold">M</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col  h-16 border-gray-300 min-h-9 px-4">
                <CustomToolbar />
                <hr className="mt-auto" />
            </div>

            <div className="w-full px-4  overflow-y-auto h-full">
                <div className="w-full h-fit ">
                    <div className="w-full h-full border-[0.5px] border-t-[0px] p-4 flex flex-row border-gray-300">
                        <div className="w-[790px] mx-auto h-fit">
                            <ReactQuill className="w-full bg-white border-[0.5px] border-gray-300 focus:border-[0.5px] focus:border-gray-300 text-black p-7  h-[1000px] mb-2 resize-none focus:outline-none focus:ring-0" modules={{ toolbar: toolbarOptions }}
                                value={""}
                                ref={quillRef}
                                onChange={(content, delta, source, editor) => {
                                    if (source === 'silent') return;

                                    console.log("content", content);
                                    console.log("delta", delta);
                                    console.log("source ", source);
                                    console.log("editor", editor);
                                    sendmessage(convertDeltaToCrdt(delta));
                                    console.log("TEST TEST TEST");
                                    console.log(delta);
                                    // console.log(delta.ops[0].insert); // Logs the HTML content in the editor
                                }} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpenedShareMenu && (
                <div className="community-modal flex flex-row items-center justify-center">
                    <div className='overlay'></div>
                    <div ref={sharedMenuRef} className='z-20 flex flex-col w-100% h-100%  msm:w-132 msm:h-160'>
                        <ShareModal setIsOpenedShareMenu={setIsOpenedShareMenu} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextEditor;