import { ArrowPathIcon, DocumentIcon, EyeIcon, LockClosedIcon, PencilIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { getRequestWithToken, postRequest, putRequestWithToken } from "../Requests";
import { useNavigate } from "react-router-dom";
import ShareModal from "../Components/ShareModal";
import { useParams } from "react-router-dom";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles
import { DisconnectWebSocket, ConnectToWebSocket, sendmessage } from '../services/WebSocket';
import { convertDeltaToCrdt, CRDTinstance, siteId } from '../services/CRDTS';
import { baseUrl } from "../Constants"
import moment from 'moment';
import AlertDemo from "../Components/AlertDemo";






const toolbarOptions = [
    ['bold', 'italic'],
];


const CustomToolbar = ({ permissionType }) => {
    const [permissions, setPermissions] = useState(permissionType);
    useEffect(() => {
        setPermissions(permissionType);
    }, [permissionType]);
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


const TextEditor = ({ userInfo }) => {

    let { id } = useParams();

    const [isOpenedShareMenu, setIsOpenedShareMenu] = useState(false);
    const [renameMode, setRenameMode] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [pageContent, setPageContent] = useState("");
    const [lastValidName, setLastValidName] = useState("");
    const inputRef = useRef();
    const sharedMenuRef = useRef();
    const quillRef = useRef();
    const navigate = useNavigate();
    const [editPermission, setEditPermission] = useState(false);
    const [permissionType, setPermissionType] = useState("");
    const [isOpenVersionHistory, setIsOpenVersionHistory] = useState(false);
    const [history, setHistory] = useState([]);
    const [noHistory, setNoHistory] = useState(false);

    const [alertState, setAlertState] = useState({
        show: false,
        message: "",
        condition: "",
    });


    const save = async () => {
        const response = await getRequestWithToken(`${baseUrl}/document/save/${id}`);
        if (response.status == 200 || response.status == 201) {
            window.location.reload();
        }
    }

    const getVersionHistory = async () => {
        setIsOpenVersionHistory(prev => !prev);
        if (isOpenVersionHistory)
            return;
        const response = await getRequestWithToken(`${baseUrl}/documentversion/get/${id}`);
        if (response.status == 200 || response.status == 201) {
            const sortedHistory = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const recentSix = sortedHistory.slice(0, 6);
            setHistory(recentSix);
        }
        else if (response.status == 403) {
            setNoHistory(true);
        }
    }

    const showAlertForTime = (condition, message) => {
        setAlertState({ show: true, message: message, condition: condition });

        setTimeout(() => {
            setAlertState({ show: false, message: "", condition: "" });
        }, 3000);
    };


    useEffect(() => {

        const getDoc = async () => {
            const response = await getRequestWithToken(`${baseUrl}/document/${id}`);
            if (response.status === 200 || response === 201) {
                setInputValue(response.data.title);
                setLastValidName(response.data.title);
                setPageContent(response.data.content);
                setEditPermission(response.data.canEdit || response.data.owner);
                setPermissionType(response.data.owner ? "Owner" : response.data.canEdit ? "Editor" : "Viewer");
                CRDTinstance.setDocumentId(id);
                CRDTinstance.constructTheSequence(response.data.content)
            }
        }

        getDoc();

    }, [id]);


    useEffect(() => {
        return () => {
            CRDTinstance.clearSequence();
        }
    }, [])

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
    }, [editPermission]);


    useEffect(() => {
        ConnectToWebSocket(quillRef, userInfo);
    }, []);


    useEffect(() => {

        return () => {
            if (userInfo) {
                const op = { operation: 'disconnect', documentId: id, userName: userInfo.userName, siteId: siteId };
                sendmessage(op);
            }
        }
    }, [userInfo])


    const handleBlur = () => {
        if (userInfo) {
            const op = { operation: 'cursor_remove', documentId: id, userName: userInfo.userName, siteId: siteId };
            sendmessage(op);
        }
    }


    useEffect(() => {
        quillRef.current.getEditor().on('selection-change', function (range, oldRange, source) {
            if (range && userInfo) {
                console.log("Cursor Sent", range.index);
                const op = { operation: 'cursor', documentId: id, cursorIndex: range.index, userName: userInfo.userName, siteId: siteId };
                console.log("cursooooooooooor seeeeeeeeent", op);
                sendmessage(op);
            }
        });

        quillRef.current.getEditor().on('text-change', function (delta, oldDelta, source) {
            if (source === 'user' && userInfo) {
                const range = quillRef.current.getEditor().getSelection();
                if (range) {
                    const op = { operation: 'cursor', documentId: id, cursorIndex: range.index, userName: userInfo.userName, siteId: siteId };
                    console.log("cursooooooooooor seeeeeeeeent", op);
                    sendmessage(op);
                }
            }
        });

    }, [userInfo])

    useEffect(() => {
        if (!renameMode) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [renameMode]);


    const renameFile = async (newName) => {
        if (!editPermission)
            return;

        const response = await putRequestWithToken(`${baseUrl}/document/rename/${id}`, { title: inputValue });

        if (response.status === 200) {
            console.log("File renamed");
        } else {
            console.log("Error renaming file");
        }

    }

    const getVersionData = async (index) => {
        if (editPermission) {
            const response = await getRequestWithToken(`${baseUrl}/documentversion/get/${id}/${index}`);
            if (response.status === 200 || response.status === 201) {
                window.location.reload();
            }
        }
        else
        {
            showAlertForTime("error", "You don't have permission to change a docment's version");
        }
        // else if (response.status == 400) {
        //     // showAlertForTime("error", "Can't change version while other users are opening the document");
        //     alert("Can't change version while other users are opening the document");

        // }
    }



    return (
        <div className="w-full relative overflow-hidden min-w-[350px] h-fit flex flex-col bg-[#F9FBFD]">
            {alertState.show && (
                <AlertDemo
                    conditon={alertState.condition}
                    message={alertState.message}
                    showAlert={alertState.show}
                />
            )} 
            <div className="w-full h-14 px-2 py-2">
                <div className="w-full h-full flex items-center flex-row ">

                    <div onClick={() => navigate("/home")} className="w-[36px] cursor-pointer h-[36px] min-w-[36px] mr-1 ml-2 min-h-[36px]">
                        <img className="gb_Mc gb_Nd h-full w-full" src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
                    </div >
                    <div className="md:w-6/12 sm:5/12  w-3/12" onDoubleClick={() => setRenameMode(false)}>
                        {renameMode ? (<h1 className="text-black overflow-text w-full text-[18px] font-base">{inputValue}</h1>)
                            : (<input maxLength={50} readOnly={!editPermission} onBlur={(e) => {
                                setRenameMode(true);
                                if (e.target.value.trim() === "") {
                                    setInputValue(lastValidName); // If new name is empty, set back to last valid name

                                } else {
                                    setLastValidName(e.target.value); // If new name is not empty, update last valid name
                                    renameFile(e.target.value);
                                }
                            }} onChange={(e) => { setInputValue(e.target.value); }} ref={inputRef} className=" border-0 text-[18px] focus:ring-0 focus:outline-none w-full font-base bg-transparent focus:border-0" value={inputValue}

                            />)
                        }
                    </div>


                    {editPermission && <div onClick={save} className="mr-4 ml-auto flex flex-row justify-center items-center w-13 h-[32px] px-1 cursor-pointer rounded-3xl bg-blue-600 hover:bg-blue-500">
                        <h1 className="text-[12px] text-white font-semibold">Save</h1>
                    </div>
                    }

                    <div onClick={getVersionHistory} className={`mr-4 ${!editPermission ? 'ml-auto' : ''} flex flex-row justify-center items-center w-9 h-9 cursor-pointer rounded-full hover:bg-gray-200`}>
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
                                <h1 className="text-white text-semibold">{userInfo && userInfo.userName[0].toUpperCase()}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="w-full flex flex-col  h-16 border-gray-300 min-h-9 px-4">
                <CustomToolbar permissionType={permissionType} />
                <hr className="mt-auto" />
            </div>

            <div className="w-full px-4  overflow-y-auto h-full">
                <div className="w-full h-fit ">
                    <div className="w-full h-full border-[0.5px] border-t-[0px] p-4 flex flex-row border-gray-300">
                        <div className="w-[790px] mx-auto h-fit">
                            <ReactQuill className="w-full bg-white border-[0.5px] border-gray-300 focus:border-[0.5px] focus:border-gray-300 text-black p-7  h-[1000px] mb-2 resize-none focus:outline-none focus:ring-0"
                                value={pageContent}
                                onBlur={handleBlur}
                                ref={quillRef}
                                readOnly={!editPermission}
                                modules={{
                                    toolbar: toolbarOptions,
                                    cursors: true,
                                }}
                                onChange={(content, delta, source, editor) => {
                                    // console.log("quill delta", delta);
                                    // const op = convertDeltaToCrdt(delta);
                                    // console.log("operation correct ?  : ", op);
                                    // if (op.operation === 'insert') {
                                    //     CRDTinstance.localInsert(op.character, op.index);
                                    // } else {
                                    //     CRDTinstance.localDelete(op.index);
                                    // }


                                    if (source === 'user') {
                                        const isconvertBold = delta.ops.some(op => (op.attributes?.hasOwnProperty('bold') && !op.hasOwnProperty('insert')));
                                        const isconvertItalic = delta.ops.some(op => (op.attributes?.hasOwnProperty('italic') && !op.hasOwnProperty('insert')));

                                        if (isconvertBold || isconvertItalic) {
                                            CRDTinstance.localChangeStyle(delta, id);
                                            return;
                                        }

                                        const op = convertDeltaToCrdt(delta);
                                        if (op.operation === 'insert') {
                                            CRDTinstance.localInsert(op.character, op.index, op.attributes, id);
                                        } else {
                                            CRDTinstance.localDelete(op.index, id);
                                        }


                                    }
                                }} />
                        </div>
                    </div>
                </div>
            </div>
            {isOpenedShareMenu && (
                <div onClick={(e) => { e.stopPropagation() }} className="community-modal flex flex-row items-center justify-center">
                    <div className='overlay'></div>
                    <div ref={sharedMenuRef} className='z-20 flex flex-col w-100% h-100%  msm:w-132 msm:h-160'>
                        <ShareModal setIsOpenedShareMenu={setIsOpenedShareMenu} id={id} name={lastValidName} />
                    </div>
                </div>
            )}
            {<div className={`absolute h-full py-3 w-[300px] border-[1px] border-blue-100 items-center right-4 top-[111px] rounded-sm flex flex-col z-40 bg-[#F0F4F8] transition-all duration-300 overflow-hidden ${isOpenVersionHistory ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'}`}>

                <div className="flex flex-row w-full">
                    <h1 className="text-[26px] px-4 ">Version history</h1>
                </div>

                <div className="flex mt-1 flex-col h-full w-full space-y-1 py-1 ">
                    {!noHistory && history.map((item, index) => (
                        <div onClick={() => getVersionData(item.index)} key={index} className="w-full flex flex-col justify-center px-6 cursor-pointer py-4 hover:bg-[#DDE3EA]">
                            <div className="flex flex-row w-full items-center">
                                <h1 className="text-[18px] font-semibold">{moment(item.createdAt).format('D MMMM YYYY, h:mm A')}</h1>

                            </div>
                            {item.version.length > 49 && <h1 className="text-[14px] mt-2 ">preview: {item.version.substring(0, 50)}...</h1>}
                            {item.version.length <= 49 && <h1 className="text-[14px] mt-2 ">preview: {item.version.substring(0, 50)}</h1>}
                        </div>
                    ))}
                    {
                        noHistory && <h1 className="text-[18px] px-[18px] mt-5 font-semibold">There is no history for this document yet.</h1>
                    }
                </div>
            </div>}
        </div>
    );
}

export default TextEditor;