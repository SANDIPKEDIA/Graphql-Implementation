import React, { useState } from "react";
import logo from "../asset/image/logo.png";
import "../asset/css/home.css";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <nav>
        {toggle && (
          <div className="responsive_nav">
            <button
              className="my_btn bg_glass responsive_close_btn "
              onClick={() => settoggle(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
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
