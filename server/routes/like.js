const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

//=================================
//           Like
//=================================

router.post("/getLikes", (req, res) => {
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId}
    } else{
        variable = {commentId: req.body.commentId}
    }
    Like.find(variable)
    .exec((err, likes) => {
         if(err) return res.status(400).send(err)
         res.status(200).json({success:true, likes})
    })

}); 

router.post("/upLike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId : req.body.userId}
    } else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    //Like  클릭 정보를 넣어줌
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err) return res.json({success: false, err})
        //만약 Dislike이 이미 클릭되었다면, Dislike 1줄여준다
        Dislike.findOneAndDelete(variable)
        .exec((err, dislikeResult) => {
            if(err) return res.json({success: false, err})
            res.status(200).json({success:true})
        })
    })

    
}); 

router.post("/unLike", (req, res) => {
    
    let variable = {}

    if(req.body.videoId){
        variable = {videoId: req.body.videoId, userId : req.body.userId}
    } else{
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    Like.findOneAndDelete(variable)
    .exec((err, result) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true})
    })
    
}); 



module.exports = router;
