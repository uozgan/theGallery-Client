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
import Alert from "react-bootstrap/Alert";
import { Col } from "react-bootstrap";
import { fetchArtworkById } from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";
import { increaseHeart } from "../../store/artworkDetails/actions";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { postBid } from "../../store/artworkDetails/actions";

export default function ArtworkDetails() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const { token, email } = useSelector(selectUser);
  const [alertShow, setAlertShow] = useState(false);
  console.log("Artwork bids", artwork.bids);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  const allBids = artwork.bids.map(bid => {
    return bid.amount;
  });

  const [currentBid, setCurrentBid] = useState(Math.max(...allBids) + 1);

  function heartIncreaser(event) {
    event.preventDefault();

    artwork.hearts++;
    //console.log("artwork?", artwork);
    dispatch(increaseHeart(artwork.hearts));
  }

  function submitBid(event) {
    event.preventDefault();

    // console.log("current bid", currentBid);
    // console.log("Email", email);
    // console.log("Id", id);

    if (artwork.bids === [] && currentBid > artwork.minimumBid) {
      dispatch(postBid(currentBid, email, id));
      setAlertShow(false);
    } else if (currentBid > Math.max(...allBids)) {
      dispatch(postBid(currentBid, email, id));
      setAlertShow(false);
    } else {
      setAlertShow(true);
    }
  }

  if (allBids === []) return <Loading />;
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
            <Alert show={alertShow} variant="danger">
              Please enter a higher amount!
            </Alert>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Amount (€)</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Amount (to the nearest dollar)"
                placeholder={Math.max(...allBids) + 1}
                onChange={event => setCurrentBid(parseInt(event.target.value))}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" onClick={submitBid}>
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
