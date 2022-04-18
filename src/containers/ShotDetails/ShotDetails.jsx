import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { nanoid } from "nanoid";

import { urlFor, client } from "../../client";

import "./ShotDetails.scss";

const ShotDetails = ({ href, setParentShot }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  let id =
    href?.split("/").at(-1).split("&").at(0) || window.location.pathname.split("/").at(-1).split("&").at(0);

  const [shot, setShot] = useState();

  const [savingShot, setSavingShot] = useState(false);
  const [likingShot, setLikingShot] = useState(false);

  const [alreadySaved, setAlreadySaved] = useState(
    !!shot?.save?.filter((item) => item._ref === user?._id).length
  );

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
            setShot((prev) => ({ ...prev, save: item.save }));
            setParentShot((prev) => ({ ...prev, save: item.save }));
            setAlreadySaved(
              !!item?.save?.filter((item) => item._ref === user?._id).length
            );
            setSavingShot(false);
          })
          .catch((err) => console.log(err.message));
      } else {
        const savesToRemove = [`save[_ref == "${user?._id}"]`];
        client
          .patch(id)
          .unset(savesToRemove)
          .commit()
          .then((item) => {
            setShot((prev) => ({ ...prev, save: item.save }));
            setParentShot((prev) => ({ ...prev, save: item.save }));
            setSavingShot(false);
            setAlreadySaved(
              !!item?.save?.filter((item) => item._ref === user?._id).length
            );
          })
          .catch((err) => console.log(err.message));
      }
    }
  };


  const [alreadyLiked, setAlreadyLiked] = useState(
    !!shot?.like?.filter((item) => item._ref === user?._id).length
  );

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
            setShot((prev) => ({ ...prev, like: item.like }));
            setParentShot((prev) => ({ ...prev, like: item.like }));
            setAlreadyLiked(
              !!item?.like?.filter((item) => item._ref === user?._id).length
            );
            setLikingShot(false);
          })
          .catch((err) => console.log(err.message));
      } else {
        const likesToRemove = [`like[_ref == "${user?._id}"]`];
        client
          .patch(id)
          .unset(likesToRemove)
          .commit()
          .then((item) => {
            setShot((prev) => ({ ...prev, like: item.like }));
            setParentShot((prev) => ({ ...prev, like: item.like }));
            setLikingShot(false);
            setAlreadyLiked(
              !!item?.like?.filter((item) => item._ref === user?._id).length
            );
          })
          .catch((err) => console.log(err.message));
      }
    }
  };

  useEffect(() => {
    window.history.pushState("modal", "ShotDetails Modal", href);

    let query = `*[_type == 'shot' && _id =='${id}']{..., 'postedBy': postedBy -> {userName, image}}`;

    client.fetch(query).then((item) => {
      setAlreadySaved(
        !!item[0]?.save?.filter((item) => item._ref === user?._id).length
      );
      setAlreadyLiked(
        !!item[0]?.like?.filter((item) => item._ref === user?._id).length
      );
      setShot(item[0]);
    });
  }, [id, user?._id, href]);

  return (
    <div className="app__shotDetails">
      <div className="app__shotDetails-container">
        <div className="header">
          <div className="shot-info">
            <img src={shot?.postedBy?.image} alt="" />
            <div>
              <h4 className="shot-header-title">{shot?.title}</h4>
              <p>{shot?.postedBy?.userName}</p>
            </div>
          </div>
          <div className="shot-actions">
            <button 
              className={`bntSave ${alreadySaved ? "btnSaveActive" : ""}`}
             onClick={(e) => {
               e.preventDefault();
              e.stopPropagation();
              saveShot(shot._id);
            }}
            >
              {savingShot && (
                <AiOutlineLoading3Quarters className="spinner" />
              ) }
              {alreadySaved ? "Saved" : "Save"}

            </button>
            <button
              className={`btnLike ${alreadyLiked ? "btnLikeActive" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                likeShot(shot._id);
              }}
            >
              {likingShot ? (
                <AiOutlineLoading3Quarters className="spinner" />
              ) : (
                <AiFillHeart />
              )}
              {alreadyLiked ? shot.like.length : "Like"}
            </button>
          </div>
        </div>

        <div className="shot-content">
          {shot && (
            <>
              <img src={urlFor(shot.image)} alt="" />

              <p>{shot.about}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShotDetails;
