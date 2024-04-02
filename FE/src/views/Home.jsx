import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

const Home = () => {
    const [sortValue, setSortValue] = useState("All documents");
    const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
    const sortMenuRef = useRef();

    useEffect(() => {
        let closeDropdown = (e) => {

            if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
                setSortDropDownOpen(false);
            }

        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    });
    return (
        <div className="w-full h-full min-w-[342px] flex mt-[58px]  flex-col">
            <div className="w-full px-4 bg-[#F1F3F4] h-[272px]">
                <div className="h-full min-h-[252px] mt-4 w-[300px] msm:w-[470px] md:w-[660px] lg:w-[860px] xl:w-[1050px] mx-auto">
                    <div className="flex flex-col w-full h-full font-light text-[14px]">
                        <h1 className="text-black h-fit ml-1.5 w-fit">Start a new document</h1>
                        <div className="bg-white h-[156px] w-[126px] border-[1px] hover:border-blue-300 cursor-pointer border-gray-200 mt-3.5">
                            <img className="w-full h-full" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt=""></img>
                        </div>
                        <h1 className="text-black h-fit text-[12px] font-medium mt-2 ml-0.5 w-fit">Blank Document</h1>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex justify-center bg-white px-2 flex-col items-center">
                <div className="flex h-13 mt-2 flex-row justify-between items-center w-[300px] msm:w-[470px] md:w-[660px] lg:w-[860px] xl:w-[1050px] mx-auto">
                    <h1 className="text-[14px] ml-0.5 font-medium">Documents</h1>
                    <div className='flex flex-row items-center relative'>
                        <div ref={sortMenuRef} onClick={(e) => { e.stopPropagation(); setSortDropDownOpen(prev => !prev) }} id="create_post_vote_dropdown_button" className={`text-black text-[14px] hover:bg-blue-200 rounded-3xl px-1 pl-2.5 cursor-pointer no-select w-fit h-10 focus:outline-none text-center no-select font-medium  items-center flex flex-row" type="button`}>{sortValue}
                            <div className="w-fit flex ml-2 mr-2 flex-row">
                                <svg className="w-2.5 h-2.5  mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </div>
                            <div id="vote_duration_dropdown_menu" className={`z-10 absolute mt-34 right-[-2px]  ${sortDropDownOpen ? '' : 'hidden'} bg-blue-600 rounded-lg shadow w-34  `}>

                                <ul className="text-xs border-[0.5px] rounded-lg border-gray-400" aria-labelledby="dropdownInformationButton">
                                    <li id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('All documents')} className={`block rounded-t-lg px-4 py-2  text-gray-200   ${sortValue == 'All documents' ? 'bg-reddit_search_light' : 'hover:bg-blue-700'}`}>All documents</p>
                                    </li>
                                    <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('Owned by me')} className={`block px-4 py-2  text-gray-200   ${sortValue == 'Owned by me' ? 'bg-reddit_search_light' : 'hover:bg-blue-700'}`}>Owned by me</p>
                                    </li>
                                    <li id="vote_3_day" className={`cursor-pointer rounded-b-lg border-b-[0.5px] border-gray-400`}>
                                        <p onClick={() => setSortValue('Shared with me')} className={`block px-4 py-2 rounded-b-lg  text-gray-200 ${sortValue == 'Shared with me' ? 'bg-reddit_search_light' : 'hover:bg-blue-700'}`}>Shared with me</p>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row mt-4 h-full w-[325px] msm:w-[494px] md:w-[685px] lg:w-[885px] xl:w-[1075px] mx-auto">
                    <div className="w-full flex flex-row items-center  h-10 rounded-3xl hover:bg-blue-100 cursor-pointer px-2">
                        <DocumentTextIcon className="h-full w-7 fill-blue-600 text-gray-200"/>
                        <h1 className="ml-4 text-[13.5px] mt-1.5 font-medium">Resume</h1>

                    </div>

                </div>


            </div>

        </div>
    );
}

export default Home;