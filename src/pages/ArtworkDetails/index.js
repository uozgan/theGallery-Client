import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Artwork from "../../components/Artwork";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { fetchArtworkById } from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";

export default function ArtworkDetails() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  console.log("artwork?", artwork);

  return (
    <>
      <Container>
        <h2>Artwork Details</h2>
        <p>{artwork.title}</p>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          height="250px"
          //width="150px"
        />
        <p>Likes: {artwork.hearts}</p>
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Bid (€)</th>
            </tr>
          </thead>
          <tbody>
            {artwork.bids.map(bid => {
              return (
                <tr key={bid.id}>
                  <td>{bid.email}</td>
                  <td>{bid.amount} €</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
