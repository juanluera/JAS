import React, { Component } from "react";

import "./NewRoom.css";
import { post } from "../../utilities";

/**
 * New Room is a parent component for all input rooms
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({storyId, value}) => void} onSubmit: (function) triggered when this post is submitted, takes {storyId, value} as parameters
 */


class NewRoomInput extends Component{ 
    constructor(props){ 
      super(props) 
      this.state = { 
          room_name: "",
          tag: "",
        } 
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    } 
    
    // Form submitting logic, prevent default page refresh  
    handleSubmit(event) {
      event.preventDefault();
      this.props.onSubmit && this.props.onSubmit(
          this.state.room_name,
          this.state.tag);
      
      const { room_name, tag} = this.state 
      alert(` 
        ____Your Details____\n 
        Room name : ${room_name} 
        Tag : ${tag} 
      `) 
      this.setState({
        room_name: "",
        tag: "",
      }); 
    } 
    
    handleChange(event){ 
      console.log(event.target.name);
      this.setState({ 
        
        [event.target.name] : event.target.value 
      }) 
    } 
    
    // Return a controlled form i.e. values of the  
    // input field not stored in DOM values are exist  
    // in react component itself as state 
    render(){ 
      return( 

<form>

  
  <label>
    <input type="text" ClassName= 'room_name' placeholder="Room Name"   value = {this.state.room_name} onChange={this.handleChange} />
  </label>   
  <label>
    <input type="text" ClassName='tag' placeholder="Tag" value={this.state.tag} onChange={this.handleChange}   />
  </label>
  <button className="red" type="button" value="Submit" onClick={this.handleSubmit}><i class="icon ion-md-lock" ></i> Create Room</button>
  

  

  
</form>

      ) 
    } 
} 
    
class NewRoom extends Component {
    addRoom = (room_value, tag_value) => {
      const body = { room_name: room_value, tag: tag_value };
      post("/api/room", body).then((room) => {
        // display this story on the screen
        this.props.addNewRoom(room);
      });
    };
  
    render() {
      return <NewRoomInput defaultText="New Story" onSubmit={this.addRoom} />;
    }
  }
  
  export { NewRoom };