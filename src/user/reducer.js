const INITIAL_STATE = {
  characterId: undefined,
  name: undefined,
  qualities: [],
};

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'user/FETCH_USER_SUCCESS':
      return {
        ...state,
        characterName: payload.name,
        characterId: payload.id,
      };
    case 'user/FETCH_QUALITIES_SUCCESS':
      return {
        ...state,
        qualities: payload,
      };
    case 'myself/MYSELF_CHANGED':
      return myselfChanged(state, payload);
    default:
      return state;
  }
}

function myselfChanged(state, payload) {
  // const { qualityId, qualityValue } = payload;
  let newQualities = [...state.qualities];
  payload.forEach(({ id, level }) => {
    const idx = newQualities.findIndex(q => q.id === id);
    if (idx < 0) {
      return;
    }
    newQualities = [
      ...newQualities.slice(0, idx),
      { ...newQualities[idx], level },
      ...newQualities.slice(idx + 1),
    ];
  });
  return { ...state, qualities: newQualities };
}