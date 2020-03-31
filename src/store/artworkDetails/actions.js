import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectArtworkDetails } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage
} from "../appState/actions";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";
//export const HEARTS_UPDATED = "HEARTS_UPDATED";

const artworkDetailsFetched = artwork => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork
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
