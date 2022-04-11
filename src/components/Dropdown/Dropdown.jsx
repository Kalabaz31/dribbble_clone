import React, { useRef, useState, useEffect } from "react";

import "./Dropdown.scss"

const Dropdown = ({list}) => {


  const [sortBtnClick, setSortBtnClick] = useState(false);
  const [selectedOption, setSelectedOption] = useState(2);


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

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setSortBtnClick(!sortBtnClick)}
        className={sortBtnClick ? "dropped" : ""}
      >
        {list[selectedOption]}
      </button>

      <ul className={`sort-options ${!sortBtnClick ? "hidden" : ""}`}>
        {list.map((option, index) => (
          <li>
            <a
              href="#s"
              onClick={() => setSelectedOption(index)}
              className={list[selectedOption] === option ? "active" : ""}
            >
              {option}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
