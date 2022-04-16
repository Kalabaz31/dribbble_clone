import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { wrap } from "popmotion";

import {
  AiOutlineAppstore,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";

import { yz_logo } from "../../assets";
import { links, profileLink } from "../../constants/data";

import "./Navbar.scss";

const bgColors = ["#724e91", "#e54f6d", "#74c4ba", "#f8c630"];

const Navbar = ({ setNoScroll }) => {
  var user = JSON.parse(localStorage.getItem("user"));

  const [hoveredLink, setHoveredLink] = useState(null);
  const [clickedLink, setClickedLink] = useState(null);
  const iconsRef = useRef([]);
  const [searchValue, setSearchValue] = useState("");
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const colorIndex = (index) => {
    return wrap(0, bgColors.length, index);
  };

  return (
    <div className="app__navbar">
      <div className="app__navbar-container">
        <div className="mobile-menu">
          <button
            onClick={() => {
              setMobileMenuActive(!mobileMenuActive);
              setNoScroll(!mobileMenuActive);
            }}
          >
            {!mobileMenuActive ? (
              <AiOutlineMenu fontSize={24} />
            ) : (
              <AiOutlineClose fontSize={24} />
            )}
          </button>

          <nav className={mobileMenuActive ? "" : "hidden"}>
            <div className="search">
              <button>
                <AiOutlineSearch fontSize={24} color="gray" />
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={handleSearchChange}
              />
              {searchValue.length > 0 && (
                <button>
                  <AiOutlineClose
                    fontSize={16}
                    color="gray"
                    onClick={() => setSearchValue("")}
                  />
                </button>
              )}
            </div>

            <ul className="links">
              {links.map((link, index) => (
                <li key={link.name}>
                  {link.sublinks.length > 0 ? (
                    <>
                      <label
                        name="link"
                        onClick={() =>
                          setClickedLink(clickedLink === index ? null : index)
                        }
                        className={`link ${
                          clickedLink === index ? "clicked" : ""
                        }`}
                      >
                        {link.name}
                      </label>
                      <ul
                        className={`sublinks ${
                          clickedLink === index ? "" : "hidden"
                        }`}
                      >
                        {link.sublinks.map((sublink) => (
                          <li key={sublink.title}>
                            <a href={sublink.url}>{sublink.title}</a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <a href={link.url} className="link">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {user && (
              <ul className="profile">
                <a href={profileLink.url}>
                  <img src={user.image} alt="" />

                  {user.userName}
                </a>

                <ul
                  className={`${
                    hoveredLink === profileLink.name ? "" : "hidden"
                  }`}
                >
                  {profileLink.sublinks.length > 0 &&
                    profileLink.sublinks.map((sublink) => (
                      <li key={sublink.title}>
                        <a href={sublink.url}>{sublink.title}</a>
                      </li>
                    ))}
                </ul>
              </ul>
            )}
          </nav>
        </div>

        <div className="app__navbar-left-nav">
          <div className="app__navbar-logo">
            <img src={yz_logo} alt="" />
          </div>

          <nav className="app__navbar-nav">
            <ul>
              {links.map((link, index) => (
                <li
                  key={index}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <a href={link.url}> {link.name} </a>

                  {link.sublinks.length > 0 && (
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.2 }}
                      className={`sublinks ${
                        hoveredLink === link.name ? "" : "hidden"
                      }`}
                    >
                      <ul>
                        {link.sublinks.map((sublink, indx) => (
                          <li
                            key={sublink.title}
                            onMouseEnter={() => {
                              iconsRef.current[
                                index * 7 + indx
                              ].style.background = `${
                                bgColors[colorIndex(indx)]
                              }20`;
                            }}
                            onMouseLeave={() => {
                              iconsRef.current[
                                index * 7 + indx
                              ].style.background = "";
                            }}
                          >
                            <a href={sublink.url}>
                              <div
                                className="icon"
                                ref={(el) => {
                                  iconsRef.current[index * 7 + indx] = el;
                                }}
                              >
                                {sublink.icon === "" ? (
                                  <AiOutlineAppstore
                                    fontSize={24}
                                    color={bgColors[colorIndex(indx)]}
                                  />
                                ) : (
                                  <sublink.icon
                                    fontSize={24}
                                    color={bgColors[colorIndex(indx)]}
                                  />
                                )}
                              </div>
                              <div className="sublink-text">
                                <h3>{sublink.title}</h3>
                                <h4>{sublink.desc}</h4>
                              </div>
                              <div className="right-icon">
                                <BsArrowRightShort
                                  color={bgColors[colorIndex(indx)]}
                                  fontSize={28}
                                />
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="app__navbar-right-nav">
          <div className="search">
            <button>
              <AiOutlineSearch fontSize={24} color="gray" />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {searchValue.length > 0 && (
              <button>
                <AiOutlineClose
                  fontSize={16}
                  color="gray"
                  onClick={() => setSearchValue("")}
                />
              </button>
            )}
          </div>
          {user ? (
            <>
              <div
                className="profile"
                onMouseEnter={() => setHoveredLink("profile")}
                onMouseLeave={() => setHoveredLink("")}
              >
                <a href={profileLink.url}>
                  <img src={user.image} alt="" />
                </a>

                <motion.ul
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 0.2 }}
                  className={`${
                    hoveredLink === profileLink.name ? "" : "hidden"
                  }`}
                >
                  {profileLink.sublinks.length > 0 &&
                    profileLink.sublinks.map((sublink) => (
                      <li key={sublink.title}>
                        <a href={sublink.url}>
                          {sublink.icon && (
                            <sublink.icon
                              fontSize={18}
                              color={`${
                                sublink.title === "Go Pro"
                                  ? bgColors[1]
                                  : "rgba(0,0,0,0.2)"
                              }`}
                            />
                          )}
                          {sublink.title}
                        </a>
                      </li>
                    ))}
                </motion.ul>
              </div>
              <div className="button">
                <button>Upload</button>
              </div>
            </>
          ) : (
            <>
            <div className="button">
              <a href="/login">Sign in</a>
            </div>

            <div className="button">
              <button>Sign up</button>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
