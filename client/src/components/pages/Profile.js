import React, { Component } from "react";

import { get } from "../../utilities";
import {post} from "../../utilities"
import Bios from "../modules/Bios.js";
import "../../utilities.css";
import "./Profile.css";

import SingleTag from "../modules/SingleTag.js"




class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      bio:"",
      tag: [],
    };
  }

 getUserData = () => {
    get(`/api/user`, { userId: this.props.userId }).then((user) => this.setState({ user: user }));
  };

  componentDidMount() {
    document.title = "Profile Page";
    this.getUserData();
    this.getbios();
    
  }
  addBios=(biosObj)=>{
    let body = {userId : this.props.userId , bios : biosObj};
    post("/api/bios",body).then((returnObj)=>{
        this.setState({
          bio: returnObj.bios,
        
      })
    })
  }
  getbios=() => {
    let body = {userId: this.props.userId , }
    get("/api/bios",body).then((returnObj)=>{
      console.log(returnObj);
      this.setState({
        bio:returnObj.bios,
      
      });
    });
  }
  



   componentDidUpdate(oldProps) {
    // this is called whenever the props change (call API again if the userId changes)
    
    if (oldProps.userId !== this.props.user) {
      this.getUserData();
    }
  }

  

  render() {
    
    if (!this.state.user) {
      return <div> Loading! </div>;
    }
    
    return (
      <>
        
        <div
          className="Profile-avatarContainer"
          
        >
          <div className="Profile-avatar" />
        </div>
        <h1 className="Profile-name u-textCenter">{this.state.user.name}</h1>
        <hr className="Profile-line" />
        <div className="u-flex">
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">About me</h4>
            <div id="profile-description">
            <p>{this.state.bio}</p>
            <Bios onSubmit = {this.addBios}/>
              
              
            </div>
          </div>
          
          <div className="Profile-subContainer u-textCenter">
            <h4 className="Profile-subTitle">Tags</h4>
            <SingleTag userId ={this.props.userId}/>
            <div ></div>
            
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
