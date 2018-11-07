const INITIAL_STATE = {
  actions: 0,
};

export default function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'actions/REFRESH_ACTIONS':
      return {
        ...state,
        actions: payload,
      };
    default:
      return state;
  }
}