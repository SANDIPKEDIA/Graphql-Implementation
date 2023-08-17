import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../asset/css/home.css";
import MusicList from "../components/MusicList";
import MainPlayList from "../components/MainPlayList";
import apiCall from "../api/apiCall";
import {
  ADD_SONG_INTO_RECENT,
  GET_SONGS_BY_TYPE,
  GET_SONGS_BY_TYPE_WITH_SEARCH,
} from "../api/queries";
import { startApiCall } from "../utils/global-functions";
import { DOMAIN_URL } from "../api/base";

const AudioHome = () => {
  // ******* DEFINE ALL STATES *******
  const [getSongs, setgetSongs] = useState(null);
  const [currentSongType, setcurrentSongType] = useState("TOP_TRACKS");
  const [searchSongNameKey, setsearchSongNameKey] = useState("");
  const [currentSong, setcurrentSong] = useState(null);
  const currentSongLocal = localStorage.getItem("currentSong");
  const currentSongCategoryLocal = localStorage.getItem("currentSongCategory");
  const currentPlayListLocal = localStorage.getItem("currentPlayList");
  const audioUrll = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [currentPlayList, setcurrentPlayList] = useState(null);
  const [isAudioPlayingLoader, setisAudioPlayingLoader] = useState(false);
  const [currentBackgroumdImage, setCurrentBackgroumdImage] = useState(null);
  const [loaderForApi, setLoaderForApi] = useState(false);

  // ******* USEFFECT FOR SET AUDIO TO PLAY WHENEVER CURRENT SONG CHANGED *******
  useEffect(() => {
    if (currentSong) {
      setCurrentBackgroumdImage(
        `${DOMAIN_URL}${currentSong?.photoUrl}/`
      );
      setisAudioPlayingLoader(true);
      !isPlaying && setisAudioPlayingLoader(false);
      // if(isPlaying){
      //   setTimeout(() => {
      //     audioUrll.current.play();
      //     setisAudioPlayingLoader(false);
      //   }, 1000);
      // }
      if(isPlaying){
        const playPromise = audioUrll.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setisAudioPlayingLoader(false);
            })
            .catch(error => {
              setisAudioPlayingLoader(false)
              console.error('Play error:', error);
            });
        }
      }
  
      
    }
  }, [currentSong]);

  // ******* FUNCTION FOR SET CATEGORY *******
  const handleChangeSongCategory = (value) => {
    localStorage.setItem("currentSongCategory", value);
    setcurrentSongType(value);
  };

  // ******* USEFFECT FOR SET CURRENT SONG /  CURRENT PLATLIST AT INITIAL TIME OF RENDERING*******
  useEffect(() => {
    if (!currentSong && currentSongLocal?.length > 0) {
      setcurrentSong(JSON.parse(currentSongLocal));
      setcurrentPlayList(JSON.parse(currentPlayListLocal));
    }
    if (!currentPlayList && currentPlayListLocal?.length > 0) {
      setcurrentPlayList(JSON.parse(currentPlayListLocal));
    }
    if (currentSongCategoryLocal?.length > 0) {
      setcurrentSongType(currentSongCategoryLocal);
    }
  }, []);

  // ******* API CALLED FUNCTION BY CATEGORY AND SEARCH *******
  const handleGetSongsByType = async () => {
    startApiCall(setLoaderForApi);
    const res = await apiCall(
      currentSongType === "RECENTLY_PLAYED"
        ? GET_SONGS_BY_TYPE(currentSongType)
        : GET_SONGS_BY_TYPE_WITH_SEARCH(searchSongNameKey, currentSongType)
    );
    if (res.success) {
      setgetSongs(res?.response?.getSongs);
      if (!currentSong && !currentSongLocal) {
        setcurrentSong(res?.response?.getSongs?.[0]);
      }
      if (!currentPlayList && !currentPlayListLocal) {
        setcurrentPlayList(res?.response?.getSongs);
      }
      setLoaderForApi(false);
    } else {
      setLoaderForApi(false);
      console.log("erorrrr---", res.error);
    }
  };

  // ******* USEFFECT CALLED WHENEVER CATEGORY AND SEARCH VALUE CHANGED*******

  useEffect(() => {
    handleGetSongsByType();
  }, [currentSongType, searchSongNameKey]);

  // ******* API CALLED FOR UPDATE RECENT SONG PLAYLIST*******

  const addToRecentSong = async (songId) => {
    const res = await apiCall(ADD_SONG_INTO_RECENT(songId));
    if (res.success) {
      //SUCCESSS
    } else {
      console.log("erorrrr---", res.error);
    }
  };

  return (
    <div
      className="dom"
      style={{ backgroundImage: `url(${currentBackgroumdImage})` }}
    >
      <div className="home d-flex">
        {/* ******* LEFT SIDEBAR ******* */}

        <Sidebar
          handleChangeSongCategory={handleChangeSongCategory}
          currentSongType={currentSongType}
          setsearchSongNameKey={setsearchSongNameKey}
        />
        <div className="body_wrapper d-flex">
          {/* ******* SONG AS PER PLAYLIST DIV ******* */}
          <MusicList
            getSongs={getSongs}
            searchSongNameKey={searchSongNameKey}
            setsearchSongNameKey={setsearchSongNameKey}
            currentSong={currentSong}
            currentSongType={currentSongType}
            addToRecentSong={addToRecentSong}
            setisPlaying={setisPlaying}
            audioUrll={audioUrll}
            setcurrentSong={setcurrentSong}
            setcurrentPlayList={setcurrentPlayList}
            loaderForApi={loaderForApi}
            isPlaying={isPlaying}
            isAudioPlayingLoader={isAudioPlayingLoader}
          />
          {/* ******* MAIN AUDIO PLAYER ******* */}
          <MainPlayList
            currentSong={currentSong}
            isPlaying={isPlaying}
            setisPlaying={setisPlaying}
            audioUrll={audioUrll}
            isAudioPlayingLoader={isAudioPlayingLoader}
            setcurrentSong={setcurrentSong}
            currentPlayList={currentPlayList}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioHome;
