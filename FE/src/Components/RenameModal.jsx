import React, { useState, useEffect, useRef } from "react";
import { postRequest, postRequestWithToken } from "../Requests";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";


const RenameModal = ({ setIsOpenedShareMenu }) => {
    const navigate = useNavigate();
    const [docName, setDocName] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const baseUrl = "http://localhost:8080"
    const createDocument = async () => {

        if (!(docName.trim() == "")) {
            const response = await postRequestWithToken(`${baseUrl}/document/create`, { title: docName, content: "" });
            if (response.status != 200 && response.status != 201) {
                setErrorMsg(response.data.message);

            }
            else {
                navigate(`/texteditor/${response.data.id}`);
                setIsOpenedShareMenu(false);

            }
        }
    }

    return (
        <div className="h-full min-w-[340px] w-full flex justify-center items-center">
            <div id="navbar_login_menu" className="flex pt-6 w-[470px] flex-col bg-white rounded-lg h-[300px] min-w-88 px-3 msm:px-7">

                <div className="h-full flex flex-col">

                    <div className="flex flex-row mb-3 justify-between">
                        <h1 className="text-2xl h-7 text-black font-medium mb-2 text-neutral">
                            Document Name
                        </h1>
                        <div onClick={() => setIsOpenedShareMenu(false)} className="flex flex-row w-8 h-8 justify-center items-center cursor-pointer rounded-full hover:bg-gray-200">
                            <XMarkIcon className="w-7 h-7" />
                        </div>

                    </div>

                    <div className="flex  mt-2 flex-row justify-between">
                        <textarea onChange={(e) => setDocName(e.target.value)} className=" resize-none rounded-xl w-full h-13 mt-3 focus:outline-none border-black text-[16px] focus:ring-0 focus:border-black" name="docName" id=""></textarea>
                        {errorMsg && <h1 className="text-[11px] text-red-600"> {errorMsg} </h1>}
                    </div>

                    <div className="flex mb-3 flex-col mt-auto">
                        <div className="flex flex-row w-full items-center">
                            <button onClick={async () => await createDocument()} className={`w-16 flex ml-auto flex-row justify-center border-0 text-white  text-medium text-[13px] items-center rounded-full h-9 ${docName.trim() == "" ? "cursor-not-allowed bg-blue-500 " : "cursor-pointer bg-blue-600 hover:bg-blue-700"}`}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RenameModal;
