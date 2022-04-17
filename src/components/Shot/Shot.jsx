import React, { useEffect, useState } from "react";
import { AiFillHeart, AiFillFolderAdd, AiFillEye } from "react-icons/ai";
import { nanoid } from "nanoid";

import { urlFor, client } from "../../client";

import "./Shot.scss";

const Shot = ({ shot }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [updatedShot, setUpdatedShot] = useState(shot);

  const [savingShot, setSavingShot] = useState(false);
  const [likingShot, setLikingShot] = useState(false);

  let alreadySaved = !!updatedShot.save?.filter(
    (item) => item._ref === user?._id
  ).length;

  const saveShot = (id) => {
    if (!savingShot) {
      setSavingShot(true);
      if (!alreadySaved) {
        client
          .patch(id)
          .setIfMissing({ save: [] })
          .insert("after", "save[-1]", [
            {
              _key: nanoid(),
              _ref: user?._id,
            },
          ])
          .commit()
          .then((item) => {
            setUpdatedShot(item);
            setSavingShot(false);
          });
      } else {
        const reviewsToRemove = [`save[_ref == "${user?._id}"]`];
        client
          .patch(id)
          .unset(reviewsToRemove)
          .commit()
          .then((item) => {
            setUpdatedShot(item);
            setSavingShot(false);
          });
      }
    }
  };

  let alreadyLiked = !!updatedShot.like?.filter(
    (item) => item._ref === user?._id
  ).length;

  const likeShot = (id) => {
    if (!likingShot) {
      setLikingShot(true);
      if (!alreadyLiked) {
        client
          .patch(id)
          .setIfMissing({ like: [] })
          .insert("after", "like[-1]", [
            {
              _key: nanoid(),
              _ref: user?._id,
            },
          ])
          .commit()
          .then((item) => {
            setUpdatedShot(item);
            setLikingShot(false);
          });
      } else {
        const likesToRemove = [`like[_ref == "${user?._id}"]`];
        client
          .patch(id)
          .unset(likesToRemove)
          .commit()
          .then((item) => {
            setUpdatedShot(item);
            setLikingShot(false);
          });
      }
    }
  };

  return (
    <div className="app__shots-item">
      <a href="#" className="app__shot-item-content">
        <img src={urlFor(shot.image)} alt="" />
        <div className="app__shots-item-links">
          <p key={shot.title}> {shot.title}</p>
          <ul>
            <li>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  likeShot(shot._id);
                }}
                className={`${alreadyLiked ? "activeIcon" : ""}`}
              >
                <AiFillHeart fontSize={20} />
              </button>
            </li>

            <li>
              <button className={`${alreadySaved ? "activeIcon" : ""}`}>
                <AiFillFolderAdd
                  fontSize={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    saveShot(shot._id);
                  }}
                />
              </button>
            </li>
          </ul>
        </div>
      </a>
      <div className="app__shot-item-details">
        <a href="#">
          <img src={shot.postedBy.image} alt="" />
          {shot.postedBy.userName}
        </a>
        <div>
          <p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                likeShot(shot._id);
              }}
              className={`${
                likingShot ? "updatingIcon" : alreadyLiked ? "activeIcon" : ""
              }`}
            >
              <AiFillHeart fontSize={16} />
            </button>
            {updatedShot?.like?.length ? updatedShot.like.length : 0}
          </p>
          <p>
            <AiFillEye fontSize={16} />
            50.3k
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shot;
