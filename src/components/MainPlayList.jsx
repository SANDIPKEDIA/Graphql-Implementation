import React, { useState } from "react";
import { DOMAIN_URL } from "../api/base";
import "../asset/css/home.css";
import {
  MUTED_SVG,
  UNMUTED_SVG,
  MORE_SVG,
  PREV_SVG,
  NEXT_SVG,
  PLAY_SVG,
  PAUSE_SVG,
} from "../utils/svg";
import Loader from "./Loader";

const MainPlayList = (props) => {
  const {
    currentSong,
    isPlaying,
    setisPlaying,
    audioUrll,
    isAudioPlayingLoader,
    currentPlayList,
    setcurrentSong,
  } = props;

  //* ******* DEFINE STATES ******* */

  const [isMuted, setisMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  //* ******* FUNCTION FOR CHANGE SONG PREV OR NEXT ******* */
  const handleChangeSong = (isNext, songId) => {
    let currentSongIndex = currentPlayList.findIndex((x) => x.id === songId);
    let nextorPrevSong;
    if (currentPlayList?.length === currentSongIndex + 1 && isNext) {
      console.log(currentPlayList[0]);
      nextorPrevSong = currentPlayList[1];
    }
    if (currentSongIndex === 0 && !isNext) {
      nextorPrevSong = currentPlayList[currentPlayList?.length - 1];
    } else if (
      (currentPlayList?.length !== currentSongIndex + 1 && isNext) ||
      (currentSongIndex !== 0 && !isNext)
    ) {
      nextorPrevSong =
        currentPlayList[isNext ? currentSongIndex + 1 : currentSongIndex - 1];
    }
    setcurrentSong(nextorPrevSong);
    localStorage.setItem("currentSong", JSON.stringify(nextorPrevSong));
  };

  //* ******* FUNCTION FOR PLAY MUSIC ******* */
  const onMusicPlay = () => {
    setisPlaying(true);
    audioUrll.current.play();
  };

  //* ******* FUNCTION FOR PAUSE MUSIC ******* */
  const onMusicPause = () => {
    setisPlaying(false);
    audioUrll.current.pause();
  };

  //* ******* NEXT FOLLOWING 4 FUNCTIONS ARE FOR THAT PROGRESS BAR HANDLING ******* */
  const handleTimeUpdate = () => {
    setCurrentTime(audioUrll.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioUrll.current.duration);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  const handleSeek = (event) => {
    const seekTime = parseFloat(event.target.value);
    audioUrll.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="play ">
      <div className="play_header">
        <h4>{currentSong?.title}</h4>
        <p className="custom_title">{currentSong?.artist}</p>
      </div>

      <div className="responsive_div">
        <img
          className="my-3"
          src={`${DOMAIN_URL}${currentSong?.photoUrl}/`}
          alt="song"
        />
      </div>
      <div className="progress-container my-2">
        <input
          className="progress-bar-input pointer"
          type="range"
          value={currentTime}
          max={duration}
          step="0.1"
          onChange={handleSeek}
        />

        <div className="d-flex justify-content-between">
          <p>{formatTime(currentTime)}</p>
          <p>{formatTime(duration)}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="my_btn bg_glass">
          <MORE_SVG />
        </button>

        <div className="d-flex gap-4 align-items-center">
          <button
            onClick={() => {
              handleChangeSong(false, currentSong?.id);
            }}
            disabled={isAudioPlayingLoader}
            className={
              isAudioPlayingLoader ? "my_btn_2 custom_title" : "my_btn_2"
            }
          >
            <PREV_SVG />
          </button>

          {isAudioPlayingLoader && <Loader />}
        {  !isAudioPlayingLoader &&<button
            onClick={!isPlaying ? onMusicPlay : onMusicPause}
            className="my_btn_3"
          >
           
            {isPlaying && !isAudioPlayingLoader ? <PAUSE_SVG /> : <PLAY_SVG />}
          </button>}

          <button
            disabled={isAudioPlayingLoader}
            onClick={() => {
              handleChangeSong(true, currentSong?.id);
            }}
            className={
              isAudioPlayingLoader ? "my_btn_2 custom_title" : "my_btn_2"
            }
          >
            <NEXT_SVG />
          </button>
        </div>

        <button
          className="my_btn bg_glass"
          onClick={() => {
            setisMuted(!isMuted);
          }}
        >
          {!isMuted ? <UNMUTED_SVG /> : <MUTED_SVG />}
        </button>

        <audio
          id="music"
          style={{ color: "border:1px solid red" }}
          muted={isMuted}
          src={`${DOMAIN_URL}${currentSong?.audioUrl}/`}
          ref={(ref) => {
            audioUrll.current = ref;
          }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          My Music
        </audio>
      </div>
    </div>
  );
};

export default MainPlayList;
