import React, { Component } from "react";
import { Link } from "@reach/router";
import "../../public/bootstrap.css";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the room
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} tag of the story
 * @param {string} people_limit of the story
 * @param {string} room_name of the room
 * @param {string} location of the room
 */
class SingleRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Card-room">
        <Link to={`meet.jit.si/${this.props.room_name}`} className="u-link u-bold">
          {this.props.room_name}
        </Link>
        <p className="Card-roomContent">{this.props.creator_name}</p>
        <p className="Card-roomContent">{this.props.tag}</p>
      </div>
    );
  }
}

export default SingleRoom;