import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./HorizontalListSlider.scss";

const HorizontalListSlider = ({ list, pathName }) => {
  const { category } = useParams();

  const [selectedElement, setSelectedElement] = useState(
    category ? category : ""
  );

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
    activeElementRef.current?.scrollIntoView();
  }, [activeElementRef.current]);

  return (
    <div className="list">
      <span className="scroll-backward">
        <button ref={btnLeftRef} onClick={() => slideList(-1)}>
          {"<"}
        </button>
      </span>

      <span className="scroll-forward">
        <button ref={btnRightRef} onClick={() => slideList(1)}>
          {">"}
        </button>
      </span>
      <div className="slide" ref={listSliderRef}>
        <ul>
          <li>
            <Link
              to={`${pathName}`}
              className={selectedElement === "" ? "active" : ""}
              onClick={() => setSelectedElement("")}
            >
              All
            </Link>
          </li>
          {list &&
            list.map((element, index) => (
              <li key={element.name}>
                <Link
                  to={`${pathName}/${element.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className={
                    selectedElement
                      .toLowerCase()
                      .match(element.name.toLowerCase().replace(" ", "-")) &&
                    "active"
                  }
                  ref={
                    selectedElement.match(
                      element.name.toLowerCase().replace(" ", "-")
                    )
                      ? activeElementRef
                      : null
                  }
                  onClick={() =>
                    setSelectedElement(
                      element.name.toLowerCase().replace(" ", "-")
                    )
                  }
                >
                  {element.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default HorizontalListSlider;
