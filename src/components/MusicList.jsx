import React from "react";
import "../asset/css/home.css";

const MusicList = (props) => {
  const {
    getSongs,
    searchSongNameKey,
    setsearchSongNameKey,
    currentSong,
    handleCurrentSong,
    currentSongType,
    addToRecentSong,
    setisPlaying,
    audioUrll
  } = props;

  return (
    <div className="mid_section">
      <h2
        className={
          currentSongType !== "RECENTLY_PLAYED"
            ? "mid_header"
            : "mid_header mb-5"
        }
      >
        Recently Played
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search text-secondary"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      )}
      {getSongs?.map((song, index) => {
        return (
          <div
            onClick={() => {
              addToRecentSong(song?.id);
              handleCurrentSong(song);
              setisPlaying(true)
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
  );
};

export default MusicList;
