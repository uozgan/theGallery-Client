import { FETCH_ARTWORKS_SUCCESS, ARTWORK_POST_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTWORKS_SUCCESS:
      //console.log("Action payload", action.payload);

      return [...state, ...action.payload];

    case ARTWORK_POST_SUCCESS:
      return [...state, action.payload];

    default:
      return state;
  }
};
