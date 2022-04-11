import React, { useRef, useState, useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { Dropdown, HorizontalListSlider } from "../";

import "./Filter.scss";

const sortOptions = ["Follwing", "Popular", "New & Noteworthy"];

const categories = [
  "Animation",
  "Branding",
  "Illustration",
  "Mobile",
  "Print",
  "Product Design",
  "Typography",
  "Web Design",
];

const Filter = () => {
  return (
    <div className="app__filter">
      <div className="filters">
        <div className="sortFilter">
          <Dropdown list={sortOptions} />
        </div>
        <HorizontalListSlider list={categories} />

        <button className="btnFilter">
          <BsFilter fontSize={24} />
          Filters
        </button>
      </div>

      <div className="filter-inputs">
        <div className="input-item">
          <p>Tags</p>
          <Dropdown list={sortOptions} />
        </div>
        <div className="input-item">
          <p>Color</p>
          <Dropdown list={sortOptions} />
        </div>
        <div className="input-item">
          <p>Made With</p>
          <Dropdown list={sortOptions} />
        </div>
        <div className="input-item">
          <p>Downloads</p>
          <Dropdown list={sortOptions} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
