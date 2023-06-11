import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { REGISTER } from "lib/routes";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import { DASHBOARD } from "lib/routes";

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //   console.log(errors);

  async function handleLogIn(data) {
    // console.log(data.email);
    // console.log(data.password);
    // console.log("asdlfjasdj");
    const success = await login(data.email, data.password, DASHBOARD);

    if (success) reset();
  }

  return (
    <Center w="100%" h="100vh">
      <Box
        // bg="#0D8AF0"
        mx="1"
        maxW="md"
        p="6"
        borderWidth="1px"
        borderRadius="lg"
      >
        <Heading mb="4" size="lg" textAlign="center">
          Log In
        </Heading>
        <form onSubmit={handleSubmit(handleLogIn)}>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            ></Input>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", passwordValidate)}
            ></Input>
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            type="submit"
            colorScheme="teal"
            size="md"
            w="100%"
            // isLoading={true}
            loadingText="Logging In"
          >
            Log In
          </Button>
        </form>
        <Text fontSize="lg">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to={REGISTER}
            color="teal.800"
            fontWeight="medium"
            textDecor="underline"
            _hover={{ background: "teal.100" }}
          >
            Register
          </Link>{" "}
          instead!
        </Text>
      </Box>
    </Center>
  );
}
