import React, { useState } from "react";
import logo from "../asset/image/logo.png";
import "../asset/css/home.css";
import { CROSS_SVG, LIST_SVG } from "../utils/svg";
import { SONG_PLAYLIST_TYPE } from "../utils/reserved-values";

const Sidebar = (props) => {
  const { handleChangeSongCategory, currentSongType, setsearchSongNameKey } =
    props;
  const [toggle, settoggle] = useState(false);

 const handleToogleForComputerView  = () =>{
  settoggle(false);
  setsearchSongNameKey("");
 } 
 const handleToogleForMobileView  = () =>{
  setsearchSongNameKey("");
  let idView = document.getElementById("playlist_view");
  idView.scrollIntoView();
  settoggle(false);

} 
  return (
    <>
      <button
        className="my_btn_2 responsive_btn burger_btn"
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
              {SONG_PLAYLIST_TYPE?.map((cat, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      handleChangeSongCategory(cat?.value);
                      handleToogleForMobileView()
                    }}
                    className={
                      currentSongType === cat?.value
                        ? "fw-bold"
                        : "custom_title pointer"
                    }
                  >
                    {cat?.name}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="responsive_avatar">
          <img
            src="https://lh3.googleusercontent.com/ogw/AGvuzYYjmW_dqxqvFTEZaQuTM4LDuc1vsmnmENgG1SIdq10=s64-c-mo"
            alt=""
          />
        </div>

        <div className="computer_nav">
          <span className="nav_header">
            <img className="logo" src={logo} alt="" />
            Spotify
          </span>
          <ul className="ps-0 pointer">
            {SONG_PLAYLIST_TYPE?.map((cat, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    handleChangeSongCategory(cat?.value);
                    handleToogleForComputerView()
                  }}
                  className={
                    currentSongType === cat?.value
                      ? "fw-bold"
                      : "custom_title pointer"
                  }
                >
                  {cat?.name}
                </li>
              );
            })}
          </ul>
          <div className="avatar">
            <img
              src="https://lh3.googleusercontent.com/ogw/AGvuzYYjmW_dqxqvFTEZaQuTM4LDuc1vsmnmENgG1SIdq10=s64-c-mo"
              alt=""
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
