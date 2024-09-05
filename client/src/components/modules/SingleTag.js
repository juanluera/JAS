import React, { Component } from "react";

import { post } from "../../utilities";
import {get} from "../../utilities";
import "./SingleTag.css";
import TagDesign from "./TagDesign.js";
import NewPostInput from "./NewPostInput.css"
/**
 * Single Tags - is renders the tags, adds, deletes, gets 
 * 
 * Proptypes
 * 
 * @param {String} userId : id of the user 
 * 
 */



class SingleTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            content : "",
            suggestions: [
                { id: 'EECS', text: 'EECS' },
                { id: 'German', text: 'German' },
                { id: 'Physics', text: 'Physics' },
                { id: 'Vibing', text: 'Vibing' },
                { id: 'Professional', text: 'Professional' },
                { id: 'misti', text: 'misti' }
             ]
        };
    }
    
    componentDidMount(){
        console.log(this.props.userId);
        this.getTags();
    }

    


    handleAddition=(tag)=> {
        tag.preventDefault();
        //console.log(this.props.userId)
        let body = {userId : this.props.userId, tags : this.state.content};
        post("/api/tags",body).then((tagObj)=>{
            console.log(tagObj);
            if(tagObj){
                this.setState(state => ({ 
                    tags: state.tags.concat( tagObj), 
                    content:"" }));
            }
            
        })
    }
    getTags = () => {
        let tempArr = [];
        let prevState = this.state.tags;
        let body = {userId: this.props.userId }
        get("/api/tags",body).then((returnObj)=>{
         console.log(returnObj);
         if(returnObj){
            tempArr =returnObj;
            this.setState({
                tags: prevState.concat(tempArr)
            });
         }
         
        });
        
      }
      handleChange = (event) => {
        this.setState({
          content: event.target.value,
          
        });
      };

      deleteTag = (Obj) =>{
          //console.log(Obj)
          let body = Obj
          let prevState = [...this.state.tags];
          post("/api/deleteTag", body).then((thrash)=>{
            for(let i =0; i < this.state.tags.length; i ++){
                console.log("in for loop")
                if(prevState[i]._id === Obj._id){
                    console.log("in precs")
                    prevState.splice(i,1)
                    break;
                }
                console.log("in for loop")
              }
              this.setState({
                tags: prevState
            })
          })
          
      }
      

    render() {
        let tagList = "Loading...";
        if(this.state.tags ){
            //console.log(this.state.tags);
            tagList = this.state.tags.map((tagObj)=>(
                
                <TagDesign Tag = {tagObj} key = {`${tagObj._id}`} onDelete={this.deleteTag} />
                
            ))
            
            return(
                <>
                {tagList}
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
          onClick={this.handleAddition}
        >
          Submit
        </button>
      </div>
              </>
            )
        }
            return (
                <div>
                    {tagList}
                </div>
            ) 
        
        
    }
}

export default SingleTag