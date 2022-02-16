const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Dislike } = require("../models/Dislike");

//=================================
//           Dislike
//=================================

router.post("/getDislikes", (req, res) => {
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    } else{
        variable = {commentId: req.body.commentId}
    }
    Dislike.find(variable)
    .exec((err, dislikes) => {
         if(err) return res.status(400).send(err)
         res.status(200).json({success:true, dislikes})
    })

}); 


module.exports = router;
