import axios from "axios";
import { apiUrl } from "../../config/constants";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";

const artworkDetailsFetched = artwork => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork
});

export const fetchArtworkById = id => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artworks/${id}`);
    console.log("Response", response);
    dispatch(artworkDetailsFetched(response.data.artwork));
  };
};
