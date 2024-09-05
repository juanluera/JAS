//each room will have an :
//id
//creator name
//tag
//link 

import React, { Component } from "react";
import { get } from "../../utilities";
import img1 from '../../assets/centralMap.jpg';
import "./Card.css";
import "../../public/bootstrap.css";
import SingleRoom from "./SingleRoom.js"


/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the room
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} room_name
 * @param {string} tag
 * @param {string} location
 */

class Card extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="Card-container">
        <SingleRoom
          _id={this.props._id}
          creator_name={this.props.creator_name}
          creator_id={this.props.creator_id}
          room_name={this.props.room_name}
          tag={this.props.tag}
        />
      </div>
    );
  }
}

export default Card;



