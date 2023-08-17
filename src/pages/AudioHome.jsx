import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../asset/css/home.css";
import MusicList from "../components/MusicList";
import MainPlayList from "../components/MainPlayList";
import apiCall from "../api/apiCall";
import { ADD_SONG_INTO_RECENT, GET_SONGS_BY_TYPE } from "../api/queries";

const AudioHome = () => {
  const [getSongs, setgetSongs] = useState(null);
  const [currentSongType, setcurrentSongType] = useState("FAVOURITES");
  const [searchSongNameKey, setsearchSongNameKey] = useState("");
  const [currentSong, setcurrentSong] = useState(null);
  const currentSongLocal = localStorage.getItem("currentSong");
  const currentSongCategoryLocal = localStorage.getItem("currentSongCategory");
  const currentPlayListLocal = localStorage.getItem("currentPlayList");
  const audioUrll = useRef(null);

  const [isPlaying, setisPlaying] = useState(false);
  // const [audioUrll, setaudioUrll] = useState();

  const [currentPlayList, setcurrentPlayList] = useState(null);
  const [isAudioPlayingLoader, setisAudioPlayingLoader] = useState(false);

  const [currentBackgroumdImage, setCurrentBackgroumdImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const handlePlay = async () => {
    if (audioUrll.current) {
      setTimeout(() => {
        audioUrll.current.play().catch((error) => {
          console.error("Play error:", error);
        });
      }, 100);
    }
  };
  // useEffect(() => {
  //   if (currentSong) {
  //     setisAudioPlayingLoader(true);
  //     console.log(isPlaying,audioUrll.current)
  //     setCurrentBackgroumdImage(
  //       `https://song-tc.pixelotech.com${currentSong?.photoUrl}/`
  //     );

  //     !isPlaying && setisAudioPlayingLoader(false);

  //     if(isPlaying && audioUrll.current){
  //       setTimeout(() => {
  //         audioUrll.current.play().then(res=>{
  //           console.log("res----",res)
  //           setisAudioPlayingLoader(false)
  //         }).
  //         catch(error => {
  //           setisAudioPlayingLoader(false)
  //           console.error('Play error---:', error);
  //         });

  //       }, 100);
  //     }
  //   }
  // }, [currentSong]);

  useEffect(() => {
    if (currentSong) {
      setCurrentBackgroumdImage(
        `https://song-tc.pixelotech.com${currentSong?.photoUrl}/`
      );
      setisAudioPlayingLoader(true);
      !isPlaying && setisAudioPlayingLoader(false);
      isPlaying &&
        setTimeout(() => {
          audioUrll.current.play();
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
      className={loader ? "dom loading-skeleton" : "dom"}
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
            currentSongType={currentSongType}
            addToRecentSong={addToRecentSong}
            setisPlaying={setisPlaying}
            audioUrll={audioUrll}
            setcurrentSong={setcurrentSong}
            setcurrentPlayList={setcurrentPlayList}
          />
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
