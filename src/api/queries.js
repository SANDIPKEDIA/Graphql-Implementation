export const GET_SONGS_BY_TYPE = (songType) => {
  return `query {
        getSongs(songType:${songType} ) {
            id
            photoUrl
            audioUrl
            duration
            title
            artist
        }
      }
    `;
};

export const GET_SONGS_BY_TYPE_WITH_SEARCH = (searchKey,songType) => {
  return `query {
        getSongs(search:"${searchKey}",songType:${songType} ) {
            id
            photoUrl
            audioUrl
            duration
            title
            artist
        }
      }
    `;
};
export const GET_ALL_SONGS = () => {
  return `query {
        getSongs {
            id
            photoUrl
            audioUrl
            duration
            title
            artist
        }
      }
    `;
};

export const ADD_SONG_INTO_RECENT = (songId) => {
  return ` mutation UpdateRecentlyPlayed {
        updateRecentlyPlayed(songId: ${songId}) {
        ok
        }
        }
      `;
};
