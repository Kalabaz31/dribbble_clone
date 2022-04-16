import React, { useState, useEffect } from "react";
import { Filter } from "../../components";
import { useParams } from "react-router-dom";

import "./Shots.scss";
import { client, urlFor } from "../../client";
import { Shot } from "../../components";

const Shots = ({ pathName }) => {
  const { type, category } = useParams();

  const [shots, setShots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const query = `*[_type == 'category']`;

    client.fetch(query).then((data) => {
      const foundItem = data.find(
        (item) => item.name.replaceAll(" ", "-").toLowerCase() === category
      );
      setSelectedCategory(foundItem);
    });
  }, [category]);

  useEffect(() => {
    let query;
    
    if(selectedCategory){
      query = `*[_type == 'shot' && '${selectedCategory?._id}' in category[]._ref]{title, about, image, 'postedBy': postedBy -> {userName, image} }`;
    }else{
      query = `*[_type == 'shot']{..., 'postedBy': postedBy -> {userName, image} }`;
    }

    client.fetch(query).then((data) => {
      console.log(data)
      setShots(data);
    });

  }, []);

  return (
    <div className="app__shots">
      <div className="app__shots-container">
        <Filter pathName={pathName} />

        <div className="app__shots-list">
          {shots.map((shot) => (
            
            <Shot shot={shot} key={shot._id} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default Shots;
