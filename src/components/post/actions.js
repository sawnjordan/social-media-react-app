import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { useDeletePost, useToggleLike } from "hooks/posts";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegComment, FaComment, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import { useComments } from "hooks/comment";

export default function Actions({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();

  const isLiked = likes.includes(user?.id);
  const toggleConfig = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { toggleLike, isLoading: likeLoading } = useToggleLike(toggleConfig);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentLoading } = useComments(id);
  // console.log(comments);
  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          onClick={toggleLike}
          // size="md"
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FiHeart />}
          isRound
          isLoading={likeLoading || userLoading}
        />
        {likes?.length}
      </Flex>
      <Flex alignItems="center" ml="2">
        <IconButton
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          // size="md"
          colorScheme="teal"
          variant="ghost"
          icon={comments?.length ? <FaComment /> : <FaRegComment />}
          isRound
          // isLoading={likeLoading || userLoading}
        />
        {comments?.length}
      </Flex>
      {!userLoading && user.id == uid && (
        <IconButton
          ml="auto"
          onClick={deletePost}
          // size="md"
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
          isLoading={deleteLoading}
        />
      )}
    </Flex>
  );
}
