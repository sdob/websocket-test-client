import axios from 'axios';

const { REACT_APP_POST_MESSAGE_URL: URL } = process.env;

export function refreshActions(actions) {
  return async (dispatch, getState) => {
    const { user: { characterId } } = getState();
    const { data } = await axios.post(URL, {
      characterId,
      message: {
        type: 'actions/REFRESH_ACTIONS',
        payload: actions,
      }
    });
    return data;
  }
}

export function updateQuality({ characterId, qualityId, qualityValue }) {
  return () => {
    axios.post(URL, {
      characterId,
      message: {
        type: 'myself/MYSELF_CHANGED',
        payload: { qualityId, qualityValue },
      },
    })
  };
}