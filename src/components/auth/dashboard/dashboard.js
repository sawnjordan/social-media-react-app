import { Box, Button, HStack, Heading, Textarea } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import useAddPost, { usePosts } from "hooks/posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import PostsList from "components/post/posts";

function AddNewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handleAddPost(data) {
    // console.log(data);
    addPost({
      uid: user.id,
      text: data.post,
    });
    reset();
  }
  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button
            colorScheme="teal"
            size="sm"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows="6"
          {...register("post", { required: true })}
        />
      </form>
    </Box>
  );
}

export default function Dashboard() {
  const { posts, isLoading } = usePosts();
  if (isLoading) return "loading posts";
  return (
    <>
      <AddNewPost />
      <PostsList posts={posts} />
    </>
  );
}
