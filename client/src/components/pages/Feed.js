import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewRoom } from "../modules/NewRoom.js";

import { get } from "../../utilities";
import "./Feed.css";
import VideoChat from "../modules/VideoChat.js";
import { Jutsu } from 'react-jutsu';



class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      inCall: false,
      currCall: null,
      user: undefined
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    this.getUserData();
    document.title = "Room Feed";
    get("/api/rooms").then((roomObjs) => {
      let reversedRoomObjs = roomObjs.reverse();
      reversedRoomObjs.map((roomObj) => {
        this.setState({ rooms: this.state.rooms.concat([roomObj]) });
      });
    });
  }

  getUserData = () => {
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
  };
  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewRoom = (roomObj) => {
    this.setState({
      rooms: [roomObj].concat(this.state.rooms),
      inCall: true,
      currCall: roomObj.room_name,
    });
  }

  endCall = () => {
    this.setState({
      inCall: false,
      currCall: '',
    });
  }

  render() {
    let roomsList = null;
    const hasRooms = this.state.rooms.length !== 0;
    if (hasRooms) {
      roomsList = this.state.rooms.map((roomObj) => (
        <Card
          key={`Card_${roomObj._id}`}
          _id={roomObj._id}
          creator_name={roomObj.creator_name}
          creator_id={roomObj.creator_id}
          room_name={roomObj.room_name}
          tag={roomObj.tag}
        />
      ));
    } else {
      roomsList = <div>No rooms!</div>;
    }
    let currCall = null;
    if (this.state.inCall) {
      currCall = 
      <Jutsu
        roomName={this.state.currCall}
        displayName={this.state.user.name}
        onMeetingEnd={() => {
          console.log('Meeting has ended');
          this.endCall && this.endCall();
        }}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong</p>} />
    }
    return (
      <>
        {currCall}


        <div className="Page-container">

        <div className="Feed-container">
            {this.props.userId && <NewRoom addNewRoom={this.addNewRoom} />}

            </div>
        <div className="Map-container">
              <div className="Map" /> 
              
              
            </div>

            {roomsList} 
        </div>
        
      </>
    );
  }
}

export default Feed;


/*class Feed extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <>
        <div className="Map-container">
          <div className="Map"/> 
        </div>

        
        


        
      </>
    );
  }
}

export default Feed;*/
