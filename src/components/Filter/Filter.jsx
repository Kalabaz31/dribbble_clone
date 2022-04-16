import React, { useState, useEffect } from "react";
import { BsFilter } from "react-icons/bs";
import { Dropdown, HorizontalListSlider } from "../";
import { urlFor, client } from "../../client";
import { Link, useParams } from "react-router-dom";

import "./Filter.scss";

const sortOptions = [
  {
    name: "Following",
    url: "following",
  },
  {
    name: "Popular",
    url: "popular",
  },
  {
    name: "New & Noteworthy",
    url: "recent",
  },
];

const Filter = ({ pathName }) => {
  const { type, category } = useParams();

  const [showFilters, setShowFilters] = useState(false);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const query = '*[_type == "categories"]';

    client
      .fetch(query)
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app__filter">
      <div className="filters">
        <div className="sortFilter">
          <Dropdown list={sortOptions} pathName={pathName} />
        </div>
        <HorizontalListSlider list={categories} pathName={`/shots/${type? type: "following"}`} />

        <button
          className="btnFilter"
          onClick={() => setShowFilters(!showFilters)}
        >
          <BsFilter fontSize={24} />
          Filters
        </button>
      </div>

      <div className={`filter-inputs ${!showFilters ? "filters-hidden" : ""}`}>
        <div className="input-item">
          <p>Tags</p>
          <Dropdown list={sortOptions} pathName={pathName} />
        </div>
        <div className="input-item">
          <p>Color</p>
          <Dropdown list={sortOptions} pathName={pathName} />
        </div>
        <div className="input-item">
          <p>Made With</p>
          <Dropdown list={sortOptions} pathName={pathName} />
        </div>
        <div className="input-item">
          <p>Downloads</p>
          <Dropdown list={sortOptions} pathName={pathName} />
        </div>
      </div>
    </div>
  );
};

export default Filter;
