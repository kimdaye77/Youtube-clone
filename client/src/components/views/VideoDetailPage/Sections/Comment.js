import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import Axios from 'axios'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const videoId = props.postId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("")
    
    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            //localStorage.getItem('userId')도 가능
            postId: videoId
        }
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.result)
                props.refreshFunction(response.data.result)
                setcommentValue("")
            }else{
                alert("코멘트를 저장하지 못했습니다.")
            }
        })
    }

  return (
      <div>
          <br />
          <p> Replies</p>
          <hr />

          {/* Comments Lists */}
          {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment commentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </>
                )
            ))}

          {/* Root Comment Form */}

          <form style={{ display : 'flex'}} onSubmit={onSubmit}>
              <textarea
                style={{width: '100%', borderRadius: '5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder="코멘트를 작성해 주세요"
            />
            <br />
            <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
          </form>
      </div>
  )
}

export default Comment