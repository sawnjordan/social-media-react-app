import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { useEffect, useState } from "react";
import { DASHBOARD, LOGIN } from "lib/routes";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { isUsernameExists } from "../utils/isUsernameExists";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fectchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) {
        fectchData();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  async function login(email, password, redirectTo = DASHBOARD) {
    setLoading(true);
    try {
      //   console.log(password);
      //   console.log(email);
      //   console.log("here");
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "You are logged in",
        //   description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Logging in failed",
        description: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
      return false; // Return false if login failed
    }

    return true; // Return true if login succeeded
  }

  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register(username, email, password, redirectTo = DASHBOARD) {
    // console.log(username, email, password);
    setLoading(true);
    // console.log(username);
    const usernameExists = await isUsernameExists(username);
    // console.log(usernameExists);
    if (usernameExists) {
      // console.log("hereherere");
      toast({
        title: "Username already exists",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      setLoading(false);
    } else {
      try {
        console.log("hererere");
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(res);
        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });
        toast({
          title: "Account created",
          description: "You are logged in",
          status: "success",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Signing Up failed",
          description: error.message,
          status: "error",
          isClosable: true,
          position: "top",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    // console.log("here");
    // const test = await signOut();
    if (await signOut()) {
      // console.log("what is this");
      toast({
        title: "Successfully Logged Out",
        status: "success",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      navigate(LOGIN);
    }
  }

  return { logout, isLoading };
}
