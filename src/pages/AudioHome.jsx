import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../asset/css/home.css";
import MusicList from "../components/MusicList";
import MainPlayList from "../components/MainPlayList";
import apiCall from "../api/apiCall";
import { ADD_SONG_INTO_RECENT, GET_SONGS_BY_TYPE } from "../api/queries";
import {
  getAllSongs,
} from "../utils/global-functions";

const AudioHome = () => {
  const [allSongs, setallSongs] = useState(null);
  const [getSongs, setgetSongs] = useState(null);
  const [currentSongType, setcurrentSongType] = useState("FAVOURITES");
  const [searchSongNameKey, setsearchSongNameKey] = useState("");
  const [currentSong, setcurrentSong] = useState(null);
  const currentSongLocal = localStorage.getItem("currentSong");
  const currentSongCategoryLocal = localStorage.getItem("currentSongCategory");
  const currentPlayListLocal = localStorage.getItem("currentPlayList");

  const [isPlaying, setisPlaying] = useState(false);
  const [audioUrll, setaudioUrll] = useState();

  const [currentPlayList, setcurrentPlayList] = useState(null);
  const [isAudioPlayingLoader, setisAudioPlayingLoader] = useState(false);

  const [currentBackgroumdImage, setCurrentBackgroumdImage] = useState(null);

  const handleCurrentSong = (song) => {
    setcurrentSong(song);
    setcurrentPlayList(getSongs);
    localStorage.setItem("currentPlayList", JSON.stringify(getSongs));
    localStorage.setItem("currentSong", JSON.stringify(song));
  };

  const handleChangeSong = (isNext, songId) => {
    //IF I WANT CIRCULATE ALL SONGS
    // if (isNext) {
    //   console.log(songId, allSongs?.length);
    //   let nextSong = allSongs[songId];
    //   setcurrentSong(nextSong);
    // } else {
    //   let prevSong = allSongs[songId - 2];
    //   setcurrentSong(prevSong);
    // }
    //IF I WANT CIRCULATE ONLY PLAYLIST SONGS

    let currentSongIndex = currentPlayList.findIndex((x) => x.id === songId);
    let nextorPrevSong;
    if (currentPlayList?.length === currentSongIndex + 1 && isNext) {
      console.log(currentPlayList[0]);
      nextorPrevSong = currentPlayList[1];
    }
    if (currentSongIndex == 0 && !isNext) {
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

  const handleGetAllSongs = async () => {
    const res = await getAllSongs();
    setallSongs(res);
  };

  const handlePlayOrPauseMusic = () => {
    setisPlaying(!isPlaying);
  };

  useEffect(() => {
    if (currentSong) {
      setCurrentBackgroumdImage(
        `https://song-tc.pixelotech.com${currentSong?.photoUrl}/`
      );
      setisAudioPlayingLoader(true);
      !isPlaying && setisAudioPlayingLoader(false);
      isPlaying &&
        setTimeout(() => {
          audioUrll.play();
          setisAudioPlayingLoader(false);
        }, 1000);
    }
  }, [currentSong]);

  const handleChangeSongCategory = (value) => {
    localStorage.setItem("currentSongCategory", value);
    setcurrentSongType(value);
  };

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

  const handleGetSongsByType = async () => {
    const res = await apiCall(GET_SONGS_BY_TYPE(currentSongType));
    console.log(res);
    if (res.success) {
      setgetSongs(res?.response?.getSongs);
      if (!currentSong && !currentSongLocal) {
        setcurrentSong(res?.response?.getSongs?.[0]);
      }
      if (!currentPlayList && !currentPlayListLocal) {
        setcurrentPlayList(res?.response?.getSongs);
      }
    } else {
      console.log("erorrrr---", res.error);
    }
  };

  useEffect(() => {
    handleGetSongsByType();
  }, [currentSongType, searchSongNameKey]);

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
        <Sidebar
          handleChangeSongCategory={handleChangeSongCategory}
          currentSongType={currentSongType}
        />
        <div className="body_wrapper d-flex">
          <MusicList
            getSongs={getSongs}
            searchSongNameKey={searchSongNameKey}
            setsearchSongNameKey={setsearchSongNameKey}
            currentSong={currentSong}
            handleCurrentSong={handleCurrentSong}
            currentSongType={currentSongType}
            addToRecentSong={addToRecentSong}
            setisPlaying={setisPlaying}
            audioUrll={audioUrll}
          />
          <MainPlayList
            currentSong={currentSong}
            isPlaying={isPlaying}
            handlePlayOrPauseMusic={handlePlayOrPauseMusic}
            setaudioUrll={setaudioUrll}
            handleChangeSong={handleChangeSong}
            allSongsLength={allSongs?.length}
            setisPlaying={setisPlaying}
            audioUrll={audioUrll}
            isAudioPlayingLoader={isAudioPlayingLoader}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioHome;
