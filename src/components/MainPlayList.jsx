import React, { useState } from "react";
import "../asset/css/home.css";

const MainPlayList = (props) => {
  const {
    currentSong,
    isPlaying,
    setaudioUrll,
    handlePlayOrPauseMusic,
    handleChangeSong,
    allSongsLength,
    setisPlaying,
    audioUrll,
    isAudioPlayingLoader
  } = props;
  const [isMuted, setisMuted] = useState(false);

 const onMusicPlay = () =>{
   console.log("called play--")
  setisPlaying(true)
  audioUrll.play()
 } 
 const onMusicPause = () =>{
  console.log("called pause--")
  setisPlaying(false)
  audioUrll.pause()
} 
  return (
    <div className="play">

      <div className="play_header">
        <h4>{currentSong?.title}</h4>
        <p className="text-secondary">{currentSong?.artist}</p>
      </div>

      <div className="responsive_div">
          <img
          className="my-3"
            src={`https://song-tc.pixelotech.com${currentSong?.photoUrl}/`}
            alt="song"
          />
      </div>

      <div className="progress-container my-3">
        <progress
          className="progress-bar bg_glass"
          value="50"
          max="100"
        ></progress>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="my_btn bg_glass">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-three-dots"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </svg>
        </button>

        <div className="d-flex gap-4 align-items-center">
          <button
            onClick={() => {
              handleChangeSong(false, currentSong?.id);
            }}
            disabled={isAudioPlayingLoader}

            // disabled={currentSong?.id-1===0}
            // className={currentSong?.id-1===0?"my_btn_2 text-secondary":"my_btn_2 "}
            className={isAudioPlayingLoader?"my_btn_2 text-secondary":"my_btn_2"}

         >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-skip-backward-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z" />
            </svg>
          </button>

          <button 
          onClick={!isPlaying?onMusicPlay:onMusicPause} className="my_btn_3">
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-pause-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
              </svg>
            )}

            <audio
              id="music"
              style={{ color: "border:1px solid red" }}
              muted={isMuted}
              src={`https://song-tc.pixelotech.com${currentSong?.audioUrl}/`}
              ref={(ref) => {
                setaudioUrll(ref);
              }}
            >
              My Music
            </audio>

          </button>

          <button
          disabled={isAudioPlayingLoader}
          // disabled={allSongsLength?.toString() === currentSong?.id}
            onClick={() => {
              handleChangeSong(true, currentSong?.id);
            }}
            // className={allSongsLength?.toString() === currentSong?.id?"my_btn_2 text-secondary":"my_btn_2 "}
            className={isAudioPlayingLoader?"my_btn_2 text-secondary":"my_btn_2"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-skip-forward-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>

        <button
          className="my_btn bg_glass"
          onClick={() => {
            setisMuted(!isMuted);
          }}
        >
          {!isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-volume-up-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
              <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
              <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-volume-mute-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
            </svg>
          )}
        </button>

      </div>

    </div>
  );
};

export default MainPlayList;
