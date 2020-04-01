import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { selectArtworks } from "../../store/artworks/selectors";
import { fetchArtworks } from "../../store/artworks/actions";
import Artwork from "../../components/Artwork";

export default function ArtworkList() {
  const dispatch = useDispatch();
  const artworks = useSelector(selectArtworks);

  console.log("Artworks", artworks);

  useEffect(() => {
    dispatch(fetchArtworks());
  }, [dispatch]);

  return artworks == [] ? null : (
    <>
      <Jumbotron>
        <h1>Artwork List</h1>
      </Jumbotron>
      <Container>
        {artworks.map(artwork => {
          return (
            <Artwork
              key={artwork.id}
              id={artwork.id}
              title={artwork.title}
              imageUrl={artwork.imageUrl}
              hearts={artwork.hearts}
              minimumBid={artwork.minimumBid}
              showLink={true}
              bidCount={artwork.bids ? artwork.bids.length : 0}
            />
          );
        })}
      </Container>
    </>
  );
}
