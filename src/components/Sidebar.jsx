import React, { useState } from "react";
import logo from "../asset/image/logo.png";
import "../asset/css/home.css";
import { CROSS_SVG, LIST_SVG } from "../utils/svg";

const Sidebar = ({ handleChangeSongCategory, currentSongType }) => {
  const [toggle, settoggle] = useState(false);
  const songCategories = [
    {
      name: "For You",
      value: "FOR_YOU",
    },
    {
      name: "Top Tracks",
      value: "TOP_TRACKS",
    },
    {
      name: "Favourites",
      value: "FAVOURITES",
    },
    {
      name: "Recently Played",
      value: "RECENTLY_PLAYED",
    },
  ];

  return (
    <>
      <button
        className="my_btn_2 responsive_btn "
        onClick={() => settoggle(!toggle)}
      >
        <LIST_SVG />
      </button>
      <nav>
        {toggle && (
          <div className="responsive_nav">
            <button
              className="my_btn bg_glass responsive_close_btn "
              onClick={() => settoggle(false)}
            >
              <CROSS_SVG />
            </button>
            <span className="nav_header">
              <img className="logo" src={logo} alt="" />
              Spotify
            </span>
            <ul className="ps-0 pointer">
              {songCategories?.map((cat, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      handleChangeSongCategory(cat?.value);
                    }}
                    className={
                      currentSongType === cat?.value
                        ? ""
                        : "text-secondary pointer"
                    }
                  >
                    {cat?.name}
                  </li>
                );
              })}
            </ul>
            <div className="avatar">
              <img
                src="https://images.unsplash.com/photo-1691349202760-b139b5238a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                alt=""
              />
            </div>
          </div>
        )}

        <div className="computer_nav">
          <span className="nav_header">
            <img className="logo" src={logo} alt="" />
            Spotify
          </span>
          <ul className="ps-0 pointer">
            {songCategories?.map((cat, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleChangeSongCategory(cat?.value);
                  }}
                  className={
                    currentSongType === cat?.value
                      ? ""
                      : "text-secondary pointer"
                  }
                >
                  {cat?.name}
                </li>
              );
            })}
          </ul>
          <div className="avatar">
            <img
              src="https://images.unsplash.com/photo-1691349202760-b139b5238a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
              alt=""
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
