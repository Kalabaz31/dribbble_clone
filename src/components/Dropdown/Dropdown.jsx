import React, { useRef, useState, useEffect } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";

import "./Dropdown.scss";

const Dropdown = ({ list, pathName }) => {
  const navigate = useNavigate();

  const { type, category } = useParams();

  const [sortBtnClick, setSortBtnClick] = useState(false);
  const [selectedOption, setSelectedOption] = useState(type ? type : list[0].url.toLowerCase());

  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return document.removeEventListener("click", handleOutsideClick, false);
  }, []);

  const handleClick = () => {
    setSortBtnClick(false);
  };

  const handleOutsideClick = (e) => {
    if (!dropdownRef.current.contains(e.target)) handleClick();
  };

  function findArrayElementByTitle(array, title) {
    return  array.find((element) => {
      
      return element.url.toLowerCase().replaceAll(' ', '-') === title;
    })
  }

  useEffect(() => {
    const found = findArrayElementByTitle(list, type);

    
    
  }, [type, list])
  
  
  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setSortBtnClick(!sortBtnClick)}
        className={sortBtnClick ? "dropped" : ""}
      >
      {findArrayElementByTitle(list, selectedOption).name}
      </button>

      <ul className={`sort-options ${!sortBtnClick ? "hidden" : ""}`}>
        {list.map((option, index) => (
          <li key={index}>
            <Link
              to={`${pathName}/${option.url.toLowerCase().replaceAll(' ', '-')}${category ? "/"+category : ""}`}
              onClick={() => setSelectedOption(option.url.toLowerCase().replaceAll(' ', '-'))}
              className={selectedOption === option.url.toLowerCase().replaceAll(' ', '-') ? "active" : ""}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
