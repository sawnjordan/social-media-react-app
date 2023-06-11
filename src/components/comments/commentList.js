import { Box } from "@chakra-ui/react";
import { useComments } from "hooks/comment";
import Comment from "./comment";

export default function CommentList({ post }) {
  const { id: postID } = post;
  //   console.log(postID);
  const { comments, isLoading } = useComments(postID);

  if (isLoading) return "Loading...";
  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}
