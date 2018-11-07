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
  const { qualityId, qualityValue } = payload;
  const newQualities = [...state.qualities];
  const idx = newQualities.findIndex(q => q.id === qualityId);
  if (idx < 0) {
    return state;
  }
  return {
    ...state,
    qualities: [
      ...newQualities.slice(0, idx),
      { ...newQualities[idx], level: qualityValue },
      ...newQualities.slice(idx + 1),
    ],
  }
}