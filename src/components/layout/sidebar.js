import { Box, Button, Code, Stack } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { PROTECTED, USERS } from "lib/routes";
import { Link } from "react-router-dom";
import Avatar from "components/profile/avatar";
import UsernameButton from "components/profile/usernameButton";

function ActiveUser() {
  const { user, isLoading } = useAuth();
  if (isLoading) return "Loading..";
  // console.log(user);

  return (
    <Stack align="center" spacing="5" my="8">
      <Avatar user={user} />
      <Code>
        <UsernameButton user={user} />
      </Code>
      <Button
        colorScheme="teal"
        w="full"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      borderLeft="1px solid"
      borderLeftColor="teal.100"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
      bg="#afccac"
    >
      {/* {Active User Component} */}
      <ActiveUser />
      <Box align="center">
        <Box as="ul" borderBottom="2px solid" borderColor="teal.200" />
        <Button
          variant="outline"
          colorScheme="teal"
          as={Link}
          to={USERS}
          mt="4"
          size="sm"
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
}
