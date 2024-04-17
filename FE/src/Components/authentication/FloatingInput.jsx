import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';


const FloatingInput = ({ id, label, validateInput, setInputNameOnChange, backendValidationError, setBackendValidationError, setBackendMessage }) => {

    const [input, setInput] = useState(null);
    const [backendUsernameError, setBackendUsernameError] = useState(null);
    const inputRef = useRef(null);
    const isRed = (!validateInput(input) && input != null || backendValidationError != null) || (backendUsernameError != null && id === "signup_username");
    const isGreen = validateInput(input) && input != null && (backendValidationError == null) && backendUsernameError == null;

    return (
        <div className='w-full flex-col h-16'>
            <div onChange={(e) => { if (setBackendValidationError) { setBackendValidationError(null) }; if (setInputNameOnChange) { setInputNameOnChange(e.target.value) }; if (setBackendMessage) { setBackendMessage(null) } }} onBlur={(e) => { setInput(e.target.value); }} className={`relative flex items-center flex-row z-0 bg-[#EBEDEF] rounded-2xl h-14 w-full hover:bg-gray-300 border-1 ${isRed ? 'border-red-400' : 'border-transparent'}`}>
                <input ref={inputRef} onFocus={() => { setInput(null); setBackendUsernameError(null) }} onChange={(e) => {
                    if (e.target.value !== "") {
                        e.target.style.height = "24px";
                        e.target.style.marginTop = "20px";
                        e.target.style.width = "85%";
                    }
                }} maxLength={label !== 'Email' && id !== 'login_username' && id !== 'login_password' ? '21' : '320'} type={label === 'Password' ? 'password' : 'text'} autoComplete={label === 'Name' ? 'off' : 'on'} onCopy={(e) => { if (label === 'Password') e.preventDefault(); }} id={id} className={`block focus:mt-5  focus:h-6 h-13 px-0 ml-3.5 w-full text-sm text-black bg-transparent border-0  appearance-none dark:text-black   focus:outline-none focus:ring-0  peer`} placeholder=" " />
                <div className="flex absolute text-sm duration-300 transform -translate-y-3 scale-85 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-reddit_upvote peer-focus:dark:text-reddit_upvote peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-85 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ml-3.5 mt-1">
                    <label htmlFor={id} className="text-blue-500 dark:text-blue-500">{label}</label>
                    <span className="text-red-600 dark:text-red-600 ml-1">*</span>
                </div>



                <div className={`${id=="signup_username"? 'mr-2':''}`}>
                    {isRed ? (<ExclamationCircleIcon className={`text-red-600 ml-auto my-auto ${id=="signup_username"? '':'mr-3'} w-9 h-9`} />) : ''}
                    {isGreen ? (<CheckIcon className="text-green-400 ml-auto w-7 my-auto h-7" />) : ''}
                </div>

               
            </div>


            {(input != null || input === '') &&
                (<div className="mt-1 ml-1 h-5 text-xs font-light w-92">
                    {
                        (input === '') && (<p className="text-red-600">Please fill out this field.</p>)
                    }
                    {
                        (!validateInput(input) && !(input === '') && label != 'Password' && label!='Username') &&  <p className="text-red-600">Please enter a valid {label}.</p>
                    }
                    {
                        (!validateInput(input) && !(input === '') && label == 'Password') && <p className="text-red-600">Please lengthen this {label} to 8 characters or more.</p>
                    }
                    {
                        (!validateInput(input) && input.length < 3 && !(input === '') && id == 'signup_username') && <p className="text-red-600">Please lengthen this {label} to be 3 characters or more.</p>
                    }
                    {
                        (!validateInput(input) && input.length > 3 && !(input === '') && id == 'signup_username') && <p className="text-red-600 w-full">{label} can't contain any special characters except '-' & '_' .</p>
                    }
                    {
                        (validateInput(input) && !(input === '') && id == 'signup_username') && <p className="text-red-600">{backendUsernameError}</p>
                    }

                </div>)
            }
        </div>
    );
}

export default FloatingInput;