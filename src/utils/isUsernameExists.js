import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "lib/firebase";

export async function isUsernameExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const queryShot = await getDocs(q);
  //   console.log(username);
  //   console.log(queryShot);
  return queryShot.size > 0;
}
