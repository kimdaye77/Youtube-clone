import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    
    useEffect(() => {
        let commentNumber = 0;
    
        props.commentLists&&props.commentLists.map((comment, index) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentLists, props.parentCommentId])
    

    let renderReplyComment = (parentCommentId) =>
        props.commentLists&&props.commentLists.map((comment, index) => (
            <>
                {comment.responseTo&&comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </>
        ))


    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

  return (
      <div>
          {ChildCommentNumber > 0 &&
            <p style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                View {ChildCommentNumber} more Comments(s)
            </p>
        }
        {OpenReplyComments&&
          renderReplyComment(props.parentCommentId)}
      </div>
  )
}

export default ReplyComment