import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
//import Artwork from "../../components/Artwork";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { Col } from "react-bootstrap";
import { fetchArtworkById } from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";
import { increaseHeart } from "../../store/artworkDetails/actions";
import { selectUser } from "../../store/user/selectors";

export default function ArtworkDetails() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const { token } = useSelector(selectUser);
  console.log("Artwork", artwork.bids);

  const allBids = artwork.bids.map(bid => {
    return bid.amount;
  });

  const highestBid = Math.max(...allBids);

  const [currentBid, setCurrentBid] = useState(highestBid);
  //console.log("All Bids", allBids);
  //console.log("Highest Bid", highestBid);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  function heartIncreaser(event) {
    event.preventDefault();

    artwork.hearts++;
    console.log("artwork?", artwork);
    dispatch(increaseHeart(artwork.hearts));
  }

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
        <div>
          <p>
            Likes: {artwork.hearts}
            <Button type="submit" onClick={heartIncreaser}>
              Give Heart!
            </Button>
          </p>
        </div>
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
        {token ? (
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Amount (€)</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Amount (to the nearest dollar)"
                placeholder={highestBid + 1}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Bid
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        ) : null}
      </Container>
    </>
  );
}
