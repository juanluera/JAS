import React, { Component } from "react";
import NewPostInput from "./NewPostInput.css"

import { post } from "../../utilities";

/**
 * Bios: profile bios and info input
 * 
 * prop types:
 * @param{function} onSubmit() This function automatically renders what you submitted
 */

 class NewTags extends Component {
     constructor(props){
        super(props);
        this.state = {
            content: "",
        }
     }
     
     handleChange = (event) => {
        this.setState({
          content: event.target.value,
        });
      };

      handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit && this.props.onSubmit(this.state.content);
        this.setState({
          content: "",
        });
      };

      
      
      render(){
          return(
              <>
              <div className="u-flex">
        <input
          type="text"
          placeholder="Enter Tag"
          value={this.state.content}
          onChange={this.handleChange}
          className="NewPostInput-input"
        />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
              </>
          )
      }
 }

 export default NewTags;
