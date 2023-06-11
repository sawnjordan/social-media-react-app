import { useToast } from "@chakra-ui/react";
import { collection, doc, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "lib/firebase";
import { useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";
// import { FaArchway } from "react-icons/fa";

export default function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);
  return { user, isLoading };
}

export function useUpdateAvatar(uid) {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState();
  const toast = useToast();
  const navigate = useNavigate();

  async function updateAvatar() {
    if (!file) {
      toast({
        title: "No file selected",
        status: "error",
        isClosable: true,
        position: "top",
        duration: 5000,
      });
      return;
    }
    setLoading(true);
    const fileRef = ref(storage, "avatars/" + uid);

    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast({
      title: "Profile updated",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });

    setLoading(false);

    navigate(0);
  }
  return {
    setFile,
    updateAvatar,
    isLoading,
    fileURL: file && URL.createObjectURL(file),
  };
}

export function useUsers() {
  const [users, isLoading] = useCollectionData(collection(db, "users"));
  return { users, isLoading };
}
