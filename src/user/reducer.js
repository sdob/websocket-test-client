const INITIAL_STATE = {
  characterId: undefined,
};

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'user/FETCH_USER_SUCCESS':
      return {
        ...state,
        characterId: payload.id,
      };
    default:
      return state;
  }
}