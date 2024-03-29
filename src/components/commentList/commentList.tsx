import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Comment from "../comment/comment";
import { origin } from "../../App";
import styled from "styled-components";
export interface IComment {
  _id?: string;
  author: string;
  content: string;
  timestamp: Date;
  postId: string;
}
interface ICommentListProps {
  JWT: string;
}
const Container = styled.ul`
  margin: 0 auto;
  max-width: 70rem;
  max-height: 50rem;
`;
const CommentList = ({ JWT }: ICommentListProps) => {
  const [comments, setComments] = useState<[IComment] | null>(null);
  const { postId } = useParams();
  //fetch
  useEffect(() => {
    async function getComments() {
      let data = await fetch(`${origin}/posts/${postId}/comments`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await data.json();

      setComments(response.comments);
    }
    getComments();
  }, []);

  return comments ? (
    <Container>
      {comments.map((comment) => (
        <Comment
          author={comment.author}
          content={comment.content}
          timestamp={comment.timestamp}
          postId={comment.postId}
          id={comment._id}
          JWT={JWT}
        />
      ))}
    </Container>
  ) : (
    <div>there are no comments</div>
  );
};

export default CommentList;
