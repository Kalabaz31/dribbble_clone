import React, { useRef, useState, useEffect } from "react";


import "./HorizontalListSlider.scss"

const HorizontalListSlider = ({list}) => {


  const [selectedElement, setSelectedElement] = useState(7);

  const listSliderRef = useRef();
  const activeElementRef = useRef();
  const btnLeftRef = useRef();
  const btnRightRef = useRef();

  const slideList = (direction) => {
    const slideLength =
      ((listSliderRef.current.offsetWidth * 2) / 3) * direction;
    listSliderRef.current.scrollLeft += slideLength;
  };



  useEffect(() => {
    activeElementRef.current?.scrollIntoView()    
  }, [activeElementRef])

  return (
      
    <div className="list">

    <span className="scroll-backward">
      <a href="#" ref={btnLeftRef} onClick={() => slideList(-1)}>
        {"<"}
      </a>
    </span>

    <span className="scroll-forward">
      <a href="#" ref={btnRightRef} onClick={() => slideList(1)}>
        {">"}
      </a>
    </span>
    <div className="slide" ref={listSliderRef}>
      <ul>
        <li>
          <a href="#all" className={selectedElement === 0 && "active"}>
            All
          </a>
        </li>
        {list.map((element, index) => (
          <li key={element}>
            <a href="" onClick={()=> setSelectedElement(index) } ref={selectedElement === index ? activeElementRef : null} className={selectedElement === index && "active"}>{element}</a>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default HorizontalListSlider