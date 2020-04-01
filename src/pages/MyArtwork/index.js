import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useDispatch } from "react-redux";
import { postArtwork } from "../../store/user/actions";

export default function MyArtwork() {
  const [title, setTitle] = useState("");
  const [minimumBid, setMinimumBid] = useState(0);
  const [imageUrl, setImageUrl] = useState(
    "https://source.unsplash.com/1600x900/?"
  );
  const dispatch = useDispatch();

  function submitForm(event) {
    event.preventDefault();

    //console.log(title, minimumBid, imageUrl);
    dispatch(postArtwork(title, minimumBid, imageUrl));
  }

  return (
    <Form as={Col} md={{ span: 6, offset: 3 }}>
      <h1 className="mt-5 mb-5">Post an Artwork for auctions</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={event => setTitle(event.target.value)}
          type="text"
          placeholder="Title of your artwork"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Minimum Bid</Form.Label>
        <Form.Control
          value={minimumBid}
          onChange={event => setMinimumBid(event.target.value)}
          type="integer"
          placeholder="Minimum bid to start"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image url</Form.Label>
        <Form.Control
          value={imageUrl}
          onChange={event => setImageUrl(event.target.value)}
          type="text"
          placeholder="An image Url to display your artwork"
        />
        {imageUrl ? (
          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={imageUrl} alt="preview" thumbnail />
          </Col>
        ) : null}
      </Form.Group>

      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Post!
        </Button>
      </Form.Group>
    </Form>
  );
}
