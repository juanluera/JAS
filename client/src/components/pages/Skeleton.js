import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import { NewRoom } from "../modules/NewRoom.js";

import "../../utilities.css";
import "./Skeleton.css";
import "../../public/bootstrap.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "443787533713-gl7npn20to1874psma3ittu2882rj3a4.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};



  }




  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Feed";
    
  }

  // this gets called when the user pushes "Submit", so their
  // room gets added to the screen right away
  


  render() {
    return (
      <>


<div className="main-content">
  <div className="concept concept-one">
    <div className="hover hover-1"></div>
    <div className="hover hover-2"></div>
    <div className="hover hover-3"></div>
    <div className="hover hover-4"></div>
    <div className="hover hover-5"></div>
    <div className="hover hover-6"></div>
    <div className="hover hover-7"></div>
    <div className="hover hover-8"></div>
    <div className="hover hover-9"></div>
    <h1>Welcome to Fiesta!</h1>
  </div>

  <div className="concept concept-four">
    <h1>Meet People Near You</h1>
  </div>
  

  <div className="concept concept-seven">
    <h1>login to create profile</h1>
  </div>
</div>



          




  


        
      </>
    );
  }
}


export default Skeleton;