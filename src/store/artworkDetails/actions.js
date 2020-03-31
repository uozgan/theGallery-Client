import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectArtworkDetails } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout
} from "../appState/actions";
import { selectUser } from "../user/selectors";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";
//export const HEARTS_UPDATED = "HEARTS_UPDATED";
export const BID_POST_SUCCESS = "BID_POST_SUCCESS";

const artworkDetailsFetched = artwork => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork
});

const bidPostSuccess = bid => ({
  type: BID_POST_SUCCESS,
  payload: bid
});

// const heartsUpdated = hearts => ({
//   type: HEARTS_UPDATED,
//   payload: hearts
// });

export const fetchArtworkById = id => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artworks/${id}`);
    console.log("Response", response);
    dispatch(artworkDetailsFetched(response.data.artwork));
  };
};

export const increaseHeart = hearts => {
  return async (dispatch, getState) => {
    const { id } = selectArtworkDetails(getState());
    dispatch(appLoading());

    // console.log("ID", id);
    // console.log("hearts", hearts);

    const result = await axios.patch(`${apiUrl}/artworks/${id}`, {
      hearts
    });
    console.log("Result", result.data.artwork);

    dispatch(
      showMessageWithTimeout("success", false, "update successfull", 3000)
    );

    //dispatch(heartsUpdated(result.data.artwork.hearts));
    dispatch(appDoneLoading());
  };
};

export const postBid = (amount, email, artworkId) => {
  return async (dispatch, getState) => {
    const { id } = selectArtworkDetails(getState());
    const { token } = selectUser(getState());

    dispatch(appLoading());

    const response = await axios.post(
      `${apiUrl}/artworks/${id}/bids`,
      {
        amount,
        email,
        artworkId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Yep!", response);
    dispatch(
      showMessageWithTimeout("success", false, response.data.message, 3000)
    );
    dispatch(bidPostSuccess(response.data.bid));
    //dispatch(console.log("Yep!", response));
    dispatch(appDoneLoading());
  };
};
