import { ARTWORK_DETAILS_FETCHED, BID_POST_SUCCESS } from "./actions";
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

    case BID_POST_SUCCESS:
      console.log("Payload", payload);
      console.log("Artwork Details", state);

      return {
        ...state,
        bids: [payload, ...state.bids]
      };

    default:
      return state;
  }
};
