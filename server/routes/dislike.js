const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Like } = require("../models/Like");
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


router.post("/upDislike", (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId : req.body.userId}
    } else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    //Dislike  클릭 정보를 넣어줌
    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if(err) return res.json({success: false, err})
        //만약 Like이 이미 클릭되었다면, like 1줄여준다
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success:true})
        })
    })

    
}); 

router.post("/unDislike", (req, res) => {
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId : req.body.userId}
    } else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true})
    })
    
}); 



module.exports = router;
