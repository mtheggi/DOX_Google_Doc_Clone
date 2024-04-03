import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import React from 'react';
import Modal2 from "../Components/Modal2";
import { Input } from "postcss";

const Home = () => {
    const [sortValue, setSortValue] = useState("All");
    const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
    const [isOpenedShareMenu, setIsOpenedShareMenu] = useState(false);
    const [optionsDropDownOpen, setOptionsDropDownOpen] = useState(false);


    const [renameMode, setRenameMode] = useState(false);
    const [inputValue, setInputValue] = useState("Resume");
    const [lastValidName, setLastValidName] = useState("Resume");

    const sortMenuRef = useRef();
    const optionsMenuRef = useRef();
    const sharedMenuRef = useRef();
    const inputRef = useRef([]);


 

    useEffect(() => {
        if (renameMode) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameMode]);

    useEffect(() => {
        let closeDropdown = (e) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
                setSortDropDownOpen(false);
            }
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(e.target)) {
                setOptionsDropDownOpen(false);
            }
            if (sharedMenuRef.current && !sharedMenuRef.current.contains(e.target)) {
                setIsOpenedShareMenu(false);
            }
        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

 

    return (
        <div className="w-full h-full min-w-[342px] flex mt-[58px]  flex-col">
            <div className="w-full px-4 bg-[#F1F3F4] h-[272px]">
                <div className="h-full min-h-[252px] mt-4 w-full msm:w-[470px] md:w-[660px] lg:w-[860px] xl:w-[1050px] mx-auto">
                    <div className="flex flex-col w-full h-full font-light text-[14px]">
                        <h1 className="text-black h-fit ml-1.5 w-fit">Start a new document</h1>
                        <div className="bg-white h-[156px] w-[126px] border-[1px] hover:border-blue-300 cursor-pointer border-gray-200 mt-3.5">
                            <img className="w-full h-full" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt=""></img>
                        </div>
                        <h1 className="text-black h-fit text-[12px] font-medium mt-2 ml-0.5 w-fit">Blank Document</h1>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-center bg-white sm:px-2 flex-col items-center">
                <div className="flex mb-auto h-13 mt-2 flex-row items-center w-full msm:w-[494px] md:w-[685px] space-y-3 lg:w-[885px] xl:w-[1075px] -ml-7">
                    <div className="flex-row flex min-w-[160px] w-6/12">
                        <h1 className="text-[14px] ml-7 mt-2 sm:ml-6 font-medium">Documents</h1>
                    </div>

                    <div className='flex flex-row  w-4/12 items-center relative'>
                        <div ref={sortMenuRef} onClick={(e) => { e.stopPropagation(); setSortDropDownOpen(prev => !prev) }} id="create_post_vote_dropdown_button" className={`text-black ${sortValue == "All" ? '-ml-[6px]' : '-ml-[18px]'}  text-[14px] rounded-lg cursor-pointer no-select w-fit  h-8 focus:outline-none text-center no-select pl-1.5 font-medium hover:bg-blue-100 ${sortDropDownOpen ? "bg-blue-100" : ""} items-center flex flex-row" type="button`}>
                            <h1 className="">{sortValue}</h1>
                            <div className="w-fit flex ml-2 mr-2 flex-row">
                                <svg className="w-2.5 h-2.5  mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </div>
                            <div id="vote_duration_dropdown_menu" className={`z-10 absolute mt-37 -ml-13  ${sortDropDownOpen ? '' : 'hidden'} bg-gray-200 rounded-lg shadow w-34  `}>
                                <ul className="text-xs border-[0.5px] rounded-lg border-gray-400" aria-labelledby="dropdownInformationButton">
                                    <li id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('All')} className={`block rounded-t-lg px-4 py-2  text-black   ${sortValue == 'All' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>All</p>
                                    </li>
                                    <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('Owned')} className={`block px-4 py-2  text-black   ${sortValue == 'Owned' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>Owned</p>
                                    </li>
                                    <li id="vote_3_day" className={`cursor-pointer rounded-b-lg border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('Shared')} w className={`block px-4 py-2 rounded-b-lg  text-black  ${sortValue == 'Shared' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>Shared</p>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row w-4/12">
                        <h1 className="text-[14px] -ml-1.5 font-medium">Created</h1>
                    </div>
                </div>
                <div className={`flex  flex-col mt-4 h-full w-full msm:w-[494px] md:w-[685px] space-y-3 lg:w-[885px] xl:w-[1075px] mx-auto`}>




                    <div className="flex no-select flex-row w-full h-fit">
                        <div className={`w-full ${optionsDropDownOpen ? 'bg-blue-100' : ''} flex flex-row items-center  h-10 sm:rounded-3xl hover:bg-blue-100 cursor-pointer px-2`}>
                            <div className="flex w-6/12 min-w-[140px] flex-row">
                                <DocumentTextIcon className="h-full min-w-7 w-7 fill-blue-600 text-gray-200" />
                                {!renameMode ? (<h1 onDoubleClick={(e) => { e.stopPropagation; setRenameMode(true) }} className="ml-3 overflow-text w-55% lg:w-60% xl:w-70% text-[13.5px] mt-[6px] font-medium">{inputValue}</h1>) :
                                    (<input maxLength={50} onBlur={(e) => {
                                        setRenameMode(false);
                                        if (e.target.value.trim() === "") {
                                            setInputValue(lastValidName); // If new name is empty, set back to last valid name
                                        } else {
                                            setLastValidName(e.target.value); // If new name is not empty, update last valid name
                                        }
                                    }} onChange={(e) => setInputValue(e.target.value)} ref={inputRef} className=" border-0 mt-1 ml-3 text-[13.5px] focus:ring-0 focus:outline-none font-medium w-55% lg:w-60% xl:w-70% bg-transparent focus:border-0" value={inputValue}

                                    />)}
                            </div>
                            <div className="w-4/12 flex flex-row">
                                <h1 className="text-[12.5px] mt-1.5 ml-1 font-medium">Me</h1>
                            </div>
                            <div className="w-4/12 flex flex-row">
                                <h1 className="text-[12.5px] mt-1.5 no-select font-medium">11/01/2022</h1>
                            </div>
                            <div className="">
                                <div onClick={(e) => { e.stopPropagation(); setOptionsDropDownOpen(prev => !prev) }} className={`w-8 h-8  sm:mr-0 rounded-full mt-1 hover:bg-gray-300 relative flex flex-row justify-center items-center ${optionsDropDownOpen ? 'bg-gray-300' : ''}`}>
                                    <EllipsisVerticalIcon className="w-6 h-7" />
                                    <div ref={optionsMenuRef} id="options" className={`z-10 absolute mt-34 right-[-2px]  ${optionsDropDownOpen ? '' : 'hidden'} bg-gray-200 rounded-lg shadow w-34  `}>
                                        <ul onClick={(e) => e.stopPropagation()} className="text-xs border-[0.5px] rounded-lg border-gray-400" aria-labelledby="dropdownInformationButton">
                                            <li onClick={() => { setOptionsDropDownOpen(false); setIsOpenedShareMenu(true); }} id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                <p className={`block rounded-t-lg px-4 py-2  text-black   hover:bg-blue-400`}>Share</p>
                                            </li>
                                            <li onClick={() => { setRenameMode(true); setOptionsDropDownOpen(false) }} id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                                <p className={`block px-4 py-2  text-black hover:bg-blue-400`}>Rename</p>
                                            </li>
                                            <li id="vote_3_day" className={`cursor-pointer rounded-b-lg border-b-[0.5px] border-gray-400`}>
                                                <p className={`block px-4 py-2 rounded-b-lg  text-black hover:bg-blue-400`}>Delete</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

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

export default Home;




