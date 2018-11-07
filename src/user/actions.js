import axios from 'axios';

export function fetchUser() {
  return async (dispatch) => {
    const { access_token } = window.localStorage;
    const authorizationHeader = `Bearer ${access_token}`;
    const url = `https://staging.api.fallenlondon.com/api/character/myself`;
    const { data: { character, possessions } } = await axios.get(
      url,
      { headers: { Authorization: authorizationHeader } },
    );
    dispatch({
      type: 'user/FETCH_USER_SUCCESS',
      payload: character,
    });

    dispatch({
      type: 'user/FETCH_QUALITIES_SUCCESS',
      payload: possessions.reduce((acc, c) => [...acc, ...c.possessions], []),
    });
  }
}