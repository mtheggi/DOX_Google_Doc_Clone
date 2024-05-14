import React, { useState, useEffect, useContext, useRef } from "react";
import FloatingInput from "./authentication/FloatingInput";
import { postRequest, putRequestWithToken } from "../Requests";
import TagInput from "./TagInput";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {baseUrl} from "../Constants"

const ShareModal = ({ setIsOpenedShareMenu, name, id }) => {



    const [permissionValue, setPermissionValue] = useState("View");
    const [permissionDropDown, setPermissionDropDown] = useState(false);
    const permissionMenuRef = useRef();
    const [userDoesntExist, setUserDoesntExist] = useState(null);
    const [tags, setTags] = useState([]);

    const shareWithOthers = async () => {
        const response = await putRequestWithToken(`${baseUrl}/document/share`, { documentId: id, usernames: tags, viewOnly: permissionValue ==='View'? true : false, edit: permissionValue === 'Edit' ? true : false});
        if (response.status === 200 || response.status === 201) {
            setIsOpenedShareMenu(false);
            console.log(response.data);
        } else {
            setUserDoesntExist(response.data.message);
        }
    }

    return (
        <div className="h-full min-w-[340px] w-full flex justify-center items-center">
            <div id="navbar_login_menu" className="flex pt-6 w-[470px] flex-col bg-white rounded-lg h-[350px] min-w-88 px-3 msm:px-7">

                <div className="h-full flex flex-col">

                    <div className="flex flex-row mb-3 justify-between">
                        <h1 className="text-2xl h-7 text-black font-medium mb-2 text-neutral">
                            Share '{name}'
                        </h1>
                        <div onClick={() => setIsOpenedShareMenu(false)} className="flex flex-row w-8 h-8 justify-center items-center cursor-pointer rounded-full hover:bg-gray-200">
                            <XMarkIcon className="w-7 h-7" />
                        </div>

                    </div>

                    <div className="flex  mt-2 flex-row justify-between">
                        <TagInput setUserDoesntExist={setUserDoesntExist} setTags={setTags} tags={tags} />
                    </div>
                    {setUserDoesntExist && <div className=" ml-1 h-6 text-[14px] mt-4 font-medium w-85"> <p className="text-red-400">{userDoesntExist}</p> </div>}
                    <div className="flex mb-3 flex-col mt-auto">
                        <div className="flex flex-row w-full items-center">
                            <div ref={permissionMenuRef} onClick={(e) => { e.stopPropagation(); setPermissionDropDown(prev => !prev) }} id="create_post_vote_dropdown_button" className={`text-black text-[14px] mr-auto relative rounded-lg px-1.5 cursor-pointer no-select w-fit h-10 focus:outline-none text-center no-select font-medium hover:bg-blue-100 ${permissionDropDown ? "bg-blue-100" : ""} items-center flex flex-row" type="button`}>{permissionValue}
                                <div className="w-fit flex ml-2 mr-2 flex-row">
                                    <svg className="w-2.5 h-2.5  mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </div>
                                <div id="vote_duration_dropdown_menu" className={`z-10 absolute right-[-143px]  ${permissionDropDown ? '' : 'hidden'} bg-gray-200 rounded-lg shadow w-34  `}>

                                    <ul className="text-xs border-[0.5px] rounded-lg border-gray-400" aria-labelledby="dropdownInformationButton">
                                        <li id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                            <p onClick={() => setPermissionValue('View')} className={`block rounded-t-lg px-4 py-2  text-black   ${permissionValue == 'View' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>View</p>
                                        </li>
                                        <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                            <p onClick={() => setPermissionValue('Edit')} className={`block px-4 py-2  text-black   ${permissionValue == 'Edit' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>Edit</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={() => { shareWithOthers();}} className="w-16 bg-blue-600 flex flex-row justify-center border-0 text-white hover:bg-blue-500 text-medium text-[13px] items-center rounded-full h-9">Done</button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ShareModal;
