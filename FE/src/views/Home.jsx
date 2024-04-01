import { useState, useRef, useEffect } from "react";

const Home = () => {
    const [sortValue, setSortValue] = useState("All");
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
        <div className="w-full h-full flex mt-[58px]  flex-col">
            <div className="w-full bg-[#F1F3F4]  px-58 h-[272px]">
                <div className="flex flex-col w-full h-full mt-4 font-light text-[14px]">
                    <h1 className="text-black h-fit ml-1.5 w-fit">Start a new document</h1>
                    <div className="bg-white h-[156px] w-[126px] border-[1px] hover:border-blue-300 cursor-pointer border-gray-200 mt-3.5">
                        <img className="w-full h-full" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt=""></img>
                    </div>
                    <h1 className="text-black h-fit text-[12px] font-medium mt-2 ml-0.5 w-fit">Blank Document</h1>
                </div>
            </div>
            <div className="w-full h-13 px-56 flex flex-row items-center">
                <h1 className="text-[14px] font-medium">Documents</h1>
                <div className='flex flex-row sm:mr-4 items-center relative'>
                    <div ref={sortMenuRef} onClick={(e) => { e.stopPropagation(); setSortDropDownOpen(prev => !prev) }} id="create_post_vote_dropdown_button" className={`text-gray-300 text-xs cursor-pointer pl-1.5 no-select w-22 h-10 rounded-sm focus:outline-none font-normal text-center  items-center flex flex-row" type="button`}>{sortValue}
                        <div className="w-fit flex ml-2 mr-2 flex-row">
                            <svg className="w-2.5 h-2.5  mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="#F05152" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </div>
                        <div id="vote_duration_dropdown_menu" className={`z-10 absolute mt-66 right-[0.5px]  ${sortDropDownOpen ? '' : 'hidden'} bg-reddit_hover divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700 dark:divide-gray-600`}>

                            <ul className="text-xs border-[0.5px] rounded-sm border-gray-400" aria-labelledby="dropdownInformationButton">
                                <li id="vote_1_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('1 Day')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '1 Day' ? 'bg-reddit_search_light' : ''}`}>1 Day</p>
                                </li>
                                <li id="vote_2_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('2 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '2 Days' ? 'bg-reddit_search_light' : ''}`}>2 Days</p>
                                </li>
                                <li id="vote_3_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('3 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '3 Days' ? 'bg-reddit_search_light' : ''}`}>3 Days</p>
                                </li>
                                <li id="vote_4_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('4 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '4 Days' ? 'bg-reddit_search_light' : ''}`}>4 Days</p>
                                </li>
                                <li id="vote_5_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('5 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '5 Days' ? 'bg-reddit_search_light' : ''}`}>5 Days</p>
                                </li>
                                <li id="vote_6_day" className={`cursor-pointer border-b-[0.5px] border-gray-400`}>
                                    <p onClick={() => setSortValue('6 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '6 Days' ? 'bg-reddit_search_light' : ''}`}>6 Days</p>
                                </li>
                                <li id="vote_7_day" className={`cursor-pointer`}>
                                    <p onClick={() => setSortValue('7 Days')} className={`block px-4 py-2  text-gray-200 hover:bg-reddit_search_light ${sortValue == '7 Days' ? 'bg-reddit_search_light' : ''}`}>7 Days</p>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}

export default Home;