import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout
} from "../appState/actions";
import { selectUser } from "../user/selectors";

export const FETCH_ARTWORKS_SUCCESS = "FETCH_ARTWORKS_SUCCESS";
export const ARTWORK_POST_SUCCESS = "ARTWORK_POST_SUCCESS";

export const fetchArtworksSuccess = artworks => ({
  type: FETCH_ARTWORKS_SUCCESS,
  payload: artworks
});

const artworkPostSuccess = artwork => ({
  type: ARTWORK_POST_SUCCESS,
  payload: artwork
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

export const postArtwork = (title, minimumBid, imageUrl) => {
  return async (dispatch, getState) => {
    const { token, id } = selectUser(getState());

    // console.log("Id", id);
    // console.log("User Id", userId);

    const userId = id;

    // console.log(title, minimumBid, imageUrl);
    dispatch(appLoading());

    const response = await axios.post(
      `${apiUrl}/artworks/auction`,
      {
        title,
        minimumBid,
        imageUrl,
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    //console.log("Yep!", response);
    dispatch(
      showMessageWithTimeout("success", false, response.data.message, 3000)
    );
    dispatch(artworkPostSuccess(response.data.artwork));
    dispatch(appDoneLoading());
  };
};
