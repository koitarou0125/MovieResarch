import { useState } from "react";
import { addDoc, collection,deleteDoc,query,where,getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const FavoriteButton = ({ movieId, title, poster_path }: { movieId?: string; title: string; poster_path: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useContext(AuthContext);

  const toggleFavorite = async () => {
  if (!user) {
    setError("ログインしてください");
    return;
  }
  if (!movieId) {
    setError("無効な映画IDです。");
    return;
  }
  if (!isFavorite) {
  try {
    await addDoc(collection(db, "favorites"), {
      userId: user.uid,
      movieId: movieId,
      title: title,
      poster_path: poster_path,
    });
    setIsFavorite(!isFavorite);
  } catch (error) {
    setError("お気に入りの登録に失敗しました。");
  }} else {
    try{
    const q = query(
  collection(db, "favorites"),
  where("userId", "==", user.uid),
  where("movieId", "==", movieId)
);
const snapshot = await getDocs(q);

for (const doc of snapshot.docs) {
  await deleteDoc(doc.ref)
}
setIsFavorite(!isFavorite);

} catch (error) {
    setError("お気に入りの削除に失敗しました。");
  }
  }
};

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={toggleFavorite}>{isFavorite ? "★ 登録済み" : "☆ お気に入り登録"}</button>
    </div>
  );
};
