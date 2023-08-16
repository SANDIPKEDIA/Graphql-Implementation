import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../asset/css/home.css";
import MusicList from "../components/MusicList";
import MainPlayList from "../components/MainPlayList";

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
const [isAudioPlayingLoader, setisAudioPlayingLoader] = useState(false)
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
    if (currentPlayList?.length  === currentSongIndex+1 && isNext) {
      console.log(currentPlayList[0])
      nextorPrevSong = currentPlayList[1];
    }
    if (currentSongIndex==0 && !isNext) {
      nextorPrevSong = currentPlayList[currentPlayList?.length-1];
    }
    else if(currentPlayList?.length  !== currentSongIndex+1 && isNext  || currentSongIndex!==0 && !isNext){
      nextorPrevSong =
        currentPlayList[isNext ? currentSongIndex + 1 : currentSongIndex - 1];
    }
    setcurrentSong(nextorPrevSong);
    localStorage.setItem("currentSong", JSON.stringify(nextorPrevSong));

  };

  const handlePlayOrPauseMusic = () => {
    setisPlaying(!isPlaying);
  };
  useEffect(() => {
    if (currentSong) {
      setisAudioPlayingLoader(true)
      !isPlaying &&      setisAudioPlayingLoader(false)
      isPlaying && 
      setTimeout(() => {
        audioUrll.play();
        setisAudioPlayingLoader(false)
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

  useEffect(() => {
    const fetchData = async () => {
      const query = `query {getSongs{id
            photoUrl
            audioUrl
            duration
            title
            artist}}`;

      const url = "https://song-tc.pixelotech.com/graphql";
      const headers = {
        "Content-Type": "application/json",
      };
      const requestBody = {
        query: query,
        variables: null,
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        setallSongs(responseData?.data?.getSongs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let withSearchValue = ` search:"${
        searchSongNameKey ? searchSongNameKey : " "
      }",songType: ${currentSongType}`;
      let withOutSearchValue = `songType: ${currentSongType}`;
      const query = `query {getSongs(${
        currentSongType !== "RECENTLY_PLAYED"
          ? withSearchValue
          : withOutSearchValue
      } ) {id
            photoUrl
            audioUrl
            duration
            title
            artist}}`;

      const url = "https://song-tc.pixelotech.com/graphql";

      const headers = {
        "Content-Type": "application/json",
      };
      const requestBody = {
        query: query,
        variables: null,
      };
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        });
        const responseData = await response.json();
        setgetSongs(responseData?.data?.getSongs);
        if (!currentSong && !currentSongLocal) {
          setcurrentSong(responseData?.data?.getSongs?.[0]);
        }
        if (!currentPlayList && !currentPlayListLocal) {
          setcurrentPlayList(responseData?.data?.getSongs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentSongType, searchSongNameKey]);

  const addToRecentSong = async (songId) => {
    const query = `
    mutation UpdateRecentlyPlayed {
      updateRecentlyPlayed(songId: ${songId}) {
      ok
      }
      }
            `;

    const url = "https://song-tc.pixelotech.com/graphql";

    const headers = {
      "Content-Type": "application/json",
    };
    const requestBody = {
      query: query,
      variables: null,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="home">
      <Sidebar
        handleChangeSongCategory={handleChangeSongCategory}
        currentSongType={currentSongType}
      />
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
  );
};

export default AudioHome;
