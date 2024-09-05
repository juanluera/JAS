import React, { Component } from "react";
import "./SingleTag.css";
import NewPostInput from "./NewPostInput.css"

/**
 * 
 * TagDesign - handles the render of the tag
 * 
 * Proptypes 
 * @param {String} Tag: the string that was sent
 * @param {icon} icon: optional logo of the input
 */

 class TagDesign extends Component {
     constructor(props){
         super(props);
     }

     handleDelete=(event)=> {
        event.preventDefault();
         //console.log(this.props.Tag._id)
         this.props.onDelete(this.props.Tag);
    }
     render(){
         
         return(
            <span className="u-flex">
                <p
                type ="text"
                className="NewPostInput-input"
                >#{this.props.Tag.tags}</p>
                <button 
                type = "Submit"
                onClick={this.handleDelete}
                className="NewPostInput-button u-pointer"
                value="Submit"
                >x</button>
         
            </span>
         )   
    }
 }
 export default TagDesign;