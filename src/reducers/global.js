export default function reducer(state, action) {
    if (!action.type) {
      if (action.key instanceof Array) {
        return state.setIn(action.key, action.payload);
      }
      return state.set(action.key, action.payload);
    }
    return state;
  }  