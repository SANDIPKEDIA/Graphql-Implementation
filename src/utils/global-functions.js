import apiCall from "../api/apiCall";
import { ADD_SONG_INTO_RECENT, GET_ALL_SONGS } from "../api/queries";

//******* START API CALL ********/
export const startApiCall = (setLoader) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 50000);
  };
  
  //********* GET ALL SONGS ***********/
  export const getAllSongs = async() => {
    const res = await apiCall(GET_ALL_SONGS());
    return res.success ? res?.response?.getSongs ?? [] : [];
  };

