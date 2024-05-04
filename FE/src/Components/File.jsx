import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import ShareModal from "../Components/ShareModal";
import EventEmitter from 'events';


const File = ({ name, id, owner, isOpenedShareMenu, setIsOpenedShareMenu, optionsDropDownOpen, setOptionsDropDownOpen, createdAt }) => {

    const [renameMode, setRenameMode] = useState(false);
    const [inputValue, setInputValue] = useState(name);
    const [lastValidName, setLastValidName] = useState(name);
    const inputRef = useRef();   

    const optionsMenuRef = useRef();
    const sharedMenuRef = useRef();

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JS
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }


    useEffect(() => {
        let closeDropdown = (e) => {
            if (sharedMenuRef.current && !sharedMenuRef.current.contains(e.target)) {
                setIsOpenedShareMenu(false);
            }
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(e.target)) {
                setOptionsDropDownOpen(false);
            }
      
        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);



    useEffect(() => {
        if (renameMode) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameMode]);

    return (
        <div className="flex no-select flex-row w-full h-fit">
            <div className={`w-full ${optionsDropDownOpen ? 'bg-blue-100' : ''} flex flex-row items-center  h-10 sm:rounded-3xl hover:bg-blue-100 cursor-pointer px-2`}>
                <div className="flex w-6/12 min-w-[140px] flex-row">
                    <img className="gb_Mc gb_Nd h-full min-w-7 w-7 fill-blue-600 text-gray-200" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
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
                    <h1 className="text-[12.5px] mt-1.5 ml-1 font-medium">{owner}</h1>
                </div>
                <div className="w-4/12 flex flex-row">
                    <h1 className="text-[12.5px] mt-1.5 no-select font-medium">{formatDate(createdAt)}</h1>
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
            {isOpenedShareMenu && (
                <div className="community-modal flex flex-row items-center justify-center">
                    <div className='overlay'></div>
                    <div ref={sharedMenuRef} className='z-20 flex flex-col w-100% msm:w-132 h-100'>
                        <ShareModal setIsOpenedShareMenu={setIsOpenedShareMenu} name={name} id={id} owner={owner} />
                    </div>
                </div>
            )}
        </div>

    );
}

export default File;