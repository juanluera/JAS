/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Room = require("./models/room");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();
//api bios enpoing
const Bios = require("./models/bios");
//initialize socket
const socketManager = require("./server-socket");
//tags api endopoint
const Tags = require("./models/tags");


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/rooms", (req, res) => {
  // empty selector means get all documents
  Room.find({}).then((rooms) => res.send(rooms));
});

router.post("/room", (req, res) => {
  const newRoom = new Room({
    creator_name: req.user.name,
    creator_id: req.user._id,
    room_name: req.body.room_name,
    tag: req.body.tag,
  });

  newRoom.save().then((room) => res.send(room));
});

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {

    res.send(user);
  });
});

router.get("/bios", (req,res) => {
  const filter = {"userId" : req.query.userId,};
  console.log(req.query)
  Bios.findOne(filter).then((value)=>{
    
    
    if(value!=null){
      res.send(value);}
      else{
        
        res.send({"bios": ""})
        
      }
  }).catch((err)=>console.log(err));
})


router.post("/bios",(req,res)=>{
  const filter = {"userId": req.body.userId};
  //console.log(filter)
  let exist = false;
  const prevBio = Bios.findOne(filter).then(()=>{});
  if(prevBio){
    console.log("frist shell")
    Bios.deleteOne(filter).then(()=>{
      console.log("im in ")
      const bio = new Bios({
        userId: req.body.userId,
        bios: req.body.bios,
      });
    bio.save().then((bios)=>{res.send(bios)});
    });
      
  }
    else{
      const bio = new Bios({
        userId: req.body.userId,
        bios: req.body.bios,
      });
      bio.save().then((bios)=>{res.send(bios)});
    }
})

router.post("/tags", (req, res) =>{
  console.log("here1")
  const tag = new Tags({
    userId: req.body.userId,
    tags: req.body.tags,
  })
  tag.save().then((tags)=>{res.send(tags)});
});
  

  router.get("/tags", async(req, res)=>{
    try{  
    console.log("get debugger")
    let filter = {"userId" : req.query.userId}; 
    console.log(req.query._id) ;
    let tag = await Tags.find(filter);
    if(tag){res.send(tag)};
      
    
    
  }
    catch(e){console.log("major error")}
  }); 
  
  router.post("/deleteTag", async(req,res) =>{
    try{
      let filter = {"_id": req.body._id}
      console.log("delete debugger")
    
      let tag = await Tags.deleteOne(filter);
      if(tag){console.log("success")}
      if(!tag){throw error}
      res.send({});
    }
    catch(error){console.log("e")}
  });



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
