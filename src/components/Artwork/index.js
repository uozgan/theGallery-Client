import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Artwork(props) {
  return (
    <Jumbotron>
      <h1>{props.title}</h1>
      <img
        src={props.imageUrl}
        alt={props.title}
        height="150px"
        //width="150px"
      />{" "}
      <br />
      <p>Likes: {props.hearts}</p>
      <p>Bids: {props.bidCount}</p>
      {props.showLink ? (
        <Link to={`/artworks/${props.id}`}>
          <Button>See Details</Button>
        </Link>
      ) : null}
    </Jumbotron>
  );
}
