import React, { useState, useEffect, useRef } from 'react';
import './Taginput.css'; // Assuming you moved the CSS to a separate file
import { TrashIcon } from '@heroicons/react/24/outline';
import { getRequestWithToken } from '../Requests';

const TagInput = ({setUserDoesntExist, setTags, tags}) => {
  let baseUrl = "http://25.62.207.82:8080";
  const [inputValue, setInputValue] = useState('');
  const [matchedTags, setMatchedTags] = useState([]);


  const predefinedTags = [
    'programming',
    'design',
    'web development',
    'javascript',
    'python',
    'css',
    'html',
    'backend',
    'frontend',
    'database'
    // Add more predefined tags as needed
  ];

  const tagsInputRef = useRef(null);
  const tagsSuggestionsRef = useRef(null);
  const [isfocused, setisfocused] = useState(false);

  const checkTagInDatabase = async (tagText) => {
    const response = await getRequestWithToken(`${baseUrl}/user/exists/${tagText}`);
    if (response.status !== 200 && response.status !== 201 || response.data.includes("not")) {
      setUserDoesntExist(response.data);
      return false;
    }
    else {
      return true;
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      const tagTexts = inputValue.split(',').map(tagText => tagText.trim());
      tagTexts.forEach(tagText => addTag(tagText));
      setInputValue(''); 
    }
  }
  useEffect(() => {
    const matchedTags = predefinedTags.filter(tag => tag.includes(inputValue.toLowerCase().trim()));
    setMatchedTags(matchedTags);
  }, [inputValue]);

  const addTag = async (tagText) => {
    if (tagText !== '') {
      const tagExistsInDatabase = await checkTagInDatabase(tagText);
      if (!tagExistsInDatabase) {
        return;
      }
      setTags(prevTags => {
        if (!prevTags.includes(tagText)) {
          return [...prevTags, tagText];
        } else {
          return prevTags;
        }
      });
    }
  }

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }

  return (
    <div className="relative w-full h-full">
      <div className={`w-full flex-row flex items-center bg-gray-50 border-2 ${!isfocused ? 'border-gray-300' : ' border-blue-400'} focus:ring-0 text-gray-900 text-sm rounded-lg block`}>
        <input type="text" id="tags" placeholder="Enter tags" className="bg-gray-50 border-0  focus:ring-0 focus:border-blue-400 text-gray-900 text-sm rounded-lg block w-[375px] p-2.5"
          value={inputValue}
          onChange={e => {setInputValue(e.target.value); setUserDoesntExist(null)}}
          onFocus={() => setisfocused(true)}
          onBlur={() => setisfocused(false)}
          onKeyDown={handleKeyDown}
          ref={tagsInputRef}
        />
        <div className='flex  row justify-center  items-center h-8 w-8 rounded-full hover:bg-blue-100' onClick={() => setTags([])}>
          <TrashIcon className='text-black cursor-pointer  w-6 h-6' />
        </div>
      </div>

      <div id="tags-suggestions" className="mt-2  bg-white border border-gray-300 rounded-lg shadow-md hidden" ref={tagsSuggestionsRef}>
        {matchedTags.map(tag => (
          <div key={tag} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => addTag(tag)}>
            {tag}
          </div>
        ))}
      </div>
      <div id="tags-container" className="mt-2 h-fit max-h-[162px] overflow-auto">
        {tags.map(tag => (
          <div key={tag} className="tag">
            <span className="tag-text">{tag}</span>
            <span className="tag-close" data-tag={tag} onClick={(e) => { e.stopPropagation(); removeTag(tag) }}>x</span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TagInput;