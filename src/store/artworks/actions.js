import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_ARTWORKS_SUCCESS = "FETCH_ARTWORKS_SUCCESS";

export const fetchArtworksSuccess = artworks => ({
  type: FETCH_ARTWORKS_SUCCESS,
  payload: artworks
});

export const fetchArtworks = () => {
  return async (dispatch, getState) => {
    const artworksCount = getState().artworks.length;
    const response = await axios.get(
      `${apiUrl}/artworks?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${artworksCount}`
    );

    //console.log("Response", response.data.artworks.rows);
    dispatch(fetchArtworksSuccess(response.data.artworks.rows));
  };
};
