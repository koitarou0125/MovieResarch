import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const ReviewForm = ({ id }: { id: string | undefined }) => {
  const [review, setReview] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const user = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!user) {
      setError("ログインしてください");
      return;
    }
    try {
      await addDoc(collection(db, "reviews"), {
        movieId: id,
        userId: user.uid,
        text: review,
        createdAt: serverTimestamp(),
      });
      setReview("");
      setSuccess("レビューを投稿しました！");
    } catch (error) {
      setError("レビューの投稿に失敗しました。");
    }
  };

  return (
    <div>
      <h2>レビューを書く</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <input type="text" placeholder="テキストを入力してください" value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={handleSubmit}>投稿</button>
    </div>
  );
};
