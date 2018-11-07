const INITIAL_STATE = {
  characterId: undefined,
  qualities: [],
};

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'user/FETCH_USER_SUCCESS':
      return {
        ...state,
        characterId: payload.id,
      };
    case 'user/FETCH_QUALITIES_SUCCESS':
      return {
        ...state,
        qualities: payload,
      };
    default:
      return state;
  }
}