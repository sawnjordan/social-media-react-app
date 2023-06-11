import { Box, Text } from "@chakra-ui/react";
import Post from "./post";

export default function PostsList({ posts }) {
  //   console.log(posts);
  return (
    <Box px="4">
      {posts?.length === 0 ? (
        <Text fontSize="sl" textAlign="center">
          No posts yet...
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}
