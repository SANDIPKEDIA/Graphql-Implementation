import React from "react";
import "../asset/css/home.css";
import { SONG_PLAYLIST_TYPE } from "../utils/reserved-values";
import { SEARCH_SVG } from "../utils/svg";

const MusicList = (props) => {
  const {
    getSongs,
    searchSongNameKey,
    setsearchSongNameKey,
    currentSong,
    currentSongType,
    addToRecentSong,
    setisPlaying,
    setcurrentPlayList,
    setcurrentSong,
  } = props;

  const handleCurrentSong = (song) => {
    setcurrentSong(song);
    setcurrentPlayList(getSongs);
    localStorage.setItem("currentPlayList", JSON.stringify(getSongs));
    localStorage.setItem("currentSong", JSON.stringify(song));
  };
 
  return (
    <div className="mid_section">
      <h2
        className={
          currentSongType !== "RECENTLY_PLAYED"
            ? "mid_header"
            : "mid_header mb-5"
        }
      >
        {SONG_PLAYLIST_TYPE
          .filter((sg) => sg.value === currentSongType)
          .map(({ name }) => name)}
        {SONG_PLAYLIST_TYPE?.filter}
      </h2>
      {currentSongType !== "RECENTLY_PLAYED" && (
        <div className="input my-4 bg_glass d-flex justify-content-between align-items-center">
          <input
            style={{ color: "#fff" }}
            type="text"
            placeholder="Search song / Artist"
            value={searchSongNameKey}
            onChange={(e) => {
              setsearchSongNameKey(e.target.value);
            }}
          />
          <SEARCH_SVG />
        </div>
      )}
      <div className="midSection_scroll">
        {getSongs?.map((song, index) => {
          return (
            <div
              onClick={() => {
                addToRecentSong(song?.id);
                handleCurrentSong(song);
                setisPlaying(true);
              }}
              className={
                currentSong?.id === song?.id
                  ? "item mb-3 bg_glass d-flex justify-content-between align-items-center "
                  : "item mb-3 d-flex justify-content-between align-items-center pointer "
              }
              key={index}
            >
              <div className="d-flex">
                <img
                  src={`https://song-tc.pixelotech.com${song?.photoUrl}/`}
                  alt="song image"
                />
                <span className="ms-2">
                  <h6>{song?.title}</h6>
                  <p className="text-secondary">{song?.artist}</p>
                </span>
              </div>
              <p className="text-secondary">
                {song?.duration?.toString()?.slice(0, 1) +
                  ":" +
                  song?.duration?.toString()?.slice(1, 7)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicList;
