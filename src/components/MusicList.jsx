import React from "react";
import { DOMAIN_URL } from "../api/base";
import "../asset/css/home.css";
import { SONG_PLAYLIST_TYPE } from "../utils/reserved-values";
import { SEARCH_SVG } from "../utils/svg";
import Loader from "./Loader";
import PlayingEffect from "./PlayingEffect";

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
    loaderForApi,
    isPlaying,
    isAudioPlayingLoader,
  } = props;

  //* ******* FUNCTION FOR CHANGE THE CURRENT SONG ******* */
  const handleCurrentSong = (song) => {
    setcurrentSong(song);
    setcurrentPlayList(getSongs);
    localStorage.setItem("currentPlayList", JSON.stringify(getSongs));
    localStorage.setItem("currentSong", JSON.stringify(song));
  };

  return (
    <div className="mid_section" id="playlist_view">
      <h2
        className={
          currentSongType !== "RECENTLY_PLAYED"
            ? "mid_header"
            : "mid_header mb-5"
        }
      >
        {SONG_PLAYLIST_TYPE.filter((sg) => sg.value === currentSongType).map(
          ({ name }) => name
        )}
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
      <div
        className={
          loaderForApi
            ? "midSection_scroll loading-skeleton"
            : "midSection_scroll"
        }
      >
        {getSongs?.map((song, index) => {
          return (
            <div
              onClick={() => {
                if (!isAudioPlayingLoader) {
                  addToRecentSong(song?.id);
                  handleCurrentSong(song);
                  setisPlaying(true);
                }
              }}
              style={{ cursor: isAudioPlayingLoader && "wait" }}
              className={
                currentSong?.id === song?.id
                  ? "item mb-3 bg_glass d-flex justify-content-between align-items-center "
                  : "item mb-3 d-flex justify-content-between align-items-center pointer "
              }
              key={index}
            >
              <div className="d-flex">
                <img
                  src={
                    song?.photoUrl !== undefined || song?.photoUrl
                      ? `${DOMAIN_URL}${song?.photoUrl}/`
                      : "https://cdn.pixabay.com/photo/2023/02/16/03/43/music-player-7792956_1280.jpg"
                  }
                />

                <span className="ms-2">
                  <h6>{song?.title}</h6>
                  <p className="custom_title">{song?.artist}</p>
                </span>
              </div>
              {isPlaying &&
                currentSong?.id === song?.id &&
                !isAudioPlayingLoader && <PlayingEffect />}
              {isPlaying &&
                currentSong?.id === song?.id &&
                isAudioPlayingLoader && <Loader />}
              <p className="custom_title">
                {song?.duration?.toString()?.slice(0, 1) +
                  ":" +
                  song?.duration?.toString()?.slice(1, 7)}
              </p>
            </div>
          );
        })}
      </div>
      {getSongs?.length === 0 && !loaderForApi && (
        <>
          <p className="fw-bold">Couldn't find any song.</p>
          <p className="text-secondary">
            Try searching again using a different spelling or keyword.
          </p>
        </>
      )}
    </div>
  );
};

export default MusicList;
