import React, { Component } from 'react'

import { Jutsu } from 'react-jutsu'

class VideoChat extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      api: null,
    };
  }

  handleVideoJoined = () => {};

  componentDidMount() {
  }

  render() {
    return (
      <Jutsu
        roomName={this.props.room_name}
        displayName={this.props.display_name}
        onMeetingEnd={() => {
          console.log('Meeting has ended');
          this.props.endCall && this.props.endCall();
        }}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong</p>} />
    );
  }
}

export default VideoChat;