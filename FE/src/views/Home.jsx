import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { getRequestWithToken } from "../Requests";
import Navbar from "../Components/Navbar";
import RenameModal from "../Components/RenameModal";
import File from "../Components/File";
import Loading from "../Components/Loading";


const Home = ({ setIsLoggedIn }) => {
    const baseUrl = "http://25.62.207.82:8080";
    const [sortValue, setSortValue] = useState(() => {
        return localStorage.getItem('sortValue') || "All";
    });
    useEffect(() => {
        localStorage.setItem('sortValue', sortValue);
    }, [sortValue]);

    const [sortDropDownOpen, setSortDropDownOpen] = useState(false);
    const [isNewDocAdded, setIsNewDocAdded] = useState(false);
    const [shared, setShared] = useState([]);
    const [owned, setOwned] = useState([]);
    const [all, setAll] = useState([]);
    const prevSelectedSort = useRef(sortValue);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);


    const [sortChanged, setSortChanged] = useState(0);

    const navigate = useNavigate();
    const sortMenuRef = useRef();
    const renameMenuRef = useRef();

    const observer = useRef();
    const lastPostRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {

                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);



    useEffect(() => {
        let closeDropdown = (e) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
                setSortDropDownOpen(false);
            }

            if (renameMenuRef.current && !renameMenuRef.current.contains(e.target)) {
                setIsNewDocAdded(false);
            }

        };
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);



    useEffect(() => {
        if (prevSelectedSort.current !== sortValue) {
            setAll([]);
            setOwned([]);
            setShared([]);
            setPage(1);
            setSortChanged(prev => (prev + 1));
        }
    }, [sortValue]);




    useEffect(() => {

        const getDocuments = async () => {
            try {
                setHasMore(true);
                setLoading(true);

                const response = await getRequestWithToken(`${baseUrl}/document/${sortValue.toLowerCase()}/${page}`);
                const status = response.status;
                const data = response.data;

                if (status === 200 || status === 201) {

                    if (sortValue === "All") {
                        setAll(prev => [...prev, ...data]);
                    }
                    else if (sortValue === "Owned") {
                        setOwned(prev => [...prev, ...data]);
                    }
                    else {
                        setShared(prev => [...prev, ...data]);
                    }

                    setHasMore(data.length > 0);

                } else {

                    if (status == 403) {
                        navigate('/not-found');
                        setIsLoggedIn(false);
                    }

                    throw new Error('Error fetching comments');

                }

            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
        getDocuments();
        prevSelectedSort.current = sortValue;
    }, [page, sortChanged]);










    return (
        <>
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div className="w-full h-full min-w-[342px] flex mt-[52px]  flex-col">
                <div className="w-full px-4 bg-[#F1F3F4] h-[272px]">
                    <div className="h-full min-h-[252px] mt-4 w-full msm:w-[470px] md:w-[660px] lg:w-[860px] xl:w-[1050px] mx-auto">
                        <div className="flex flex-col w-full h-full font-light text-[14px]">
                            <h1 className="text-black h-fit ml-1.5 w-fit">Start a new document</h1>
                            <div onClick={(e) => { e.stopPropagation(); setIsNewDocAdded(true) }} className="bg-white h-[156px] w-[126px] border-[1px] hover:border-blue-300 cursor-pointer border-gray-200 mt-3.5">
                                <img className="w-full h-full" src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" alt=""></img>
                            </div>
                            <h1 className="text-black h-fit text-[12px] font-medium mt-2 ml-4 w-fit">Blank Document</h1>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex justify-center bg-white sm:px-2 flex-col items-center">
                    <div className="flex  h-13 mt-2 flex-row items-center w-full msm:w-[494px] md:w-[685px] space-y-3 lg:w-[885px] xl:w-[1075px] -ml-7">
                        <div className="flex-row flex min-w-[160px] w-6/12">
                            <h1 className="text-[14px] ml-7 mt-2 sm:ml-6 font-medium">documents</h1>
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
                                            <p onClick={() => setSortValue('Shared')} className={`block px-4 py-2 rounded-b-lg  text-black  ${sortValue == 'Shared' ? 'bg-blue-500' : 'hover:bg-blue-400'}`}>Shared</p>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-4/12">
                            <h1 className="text-[14px] -ml-1.5 font-medium">Created</h1>
                        </div>
                    </div>
                    <div id="documents_arranged" className={`flex  flex-col mt-2 mb-auto overflow-y-auto h-[400px] w-full msm:w-[494px] md:w-[685px] space-y-3 lg:w-[885px] xl:w-[1075px] mx-auto hide-scrollbar`}>

                        {sortValue === "All" && all.map((document, index) => {
                            if (index + 1 == all.length) {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={document.ownername}
                                    createdAt={document.createdAt}
                                    lastPostRef={lastPostRef}
                                />
                            }
                            else {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={document.ownername}
                                    createdAt={document.createdAt}
                                />
                            }
                        })}

                        {sortValue === "Shared" && shared.map((document, index) => {
                            if (index + 1 == shared.length) {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={document.ownername}
                                    createdAt={document.createdAt}
                                    lastPostRef={lastPostRef}
                                />
                            }
                            else {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={document.ownername}
                                    createdAt={document.createdAt}
                                />
                            }
                        })}




                        {sortValue === "Owned" && owned.map((document, index) => {
                            if (index + 1 == owned.length) {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={"Me"}
                                    createdAt={document.createdAt}
                                    lastPostRef={lastPostRef}
                                />
                            }
                            else {
                                return <File key={document.id}
                                    name={document.title}
                                    id={document.id}
                                    owner={"Me"}
                                    createdAt={document.createdAt}
                                />
                            }
                        })}


                        {loading && <Loading />}

                    </div>
                </div>

                {isNewDocAdded && (
                    <div className="community-modal flex flex-row items-center justify-center">
                        <div className='overlay'></div>
                        <div ref={renameMenuRef} className='z-20 flex flex-col w-100%  msm:w-132 h-[300px]'>
                            <RenameModal setIsOpenedShareMenu={setIsNewDocAdded} />
                        </div>
                    </div>
                )}

            </div>
        </>
    );
}

export default Home;




