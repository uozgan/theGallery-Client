import { ARTWORK_DETAILS_FETCHED } from "./actions";
//import { HEARTS_UPDATED } from "./actions";

const initialState = {
  bids: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTWORK_DETAILS_FETCHED:
      return { ...state, ...payload };

    // case HEARTS_UPDATED:
    //   return { ...state, hearts: payload };

    default:
      return state;
  }
};
