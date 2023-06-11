import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import { Avatar as ProfAvatar } from "@chakra-ui/react";

export default function Avatar({ user, size = "xl", overrideAvatar = null }) {
  if (!user) {
    return "loading..";
  }
  return (
    <ProfAvatar
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      name={user.username}
      size={size}
      src={overrideAvatar || user.avatar}
      _hover={{
        cursor: "pointer",
        opacity: "0.8",
      }}
    />
  );
}
