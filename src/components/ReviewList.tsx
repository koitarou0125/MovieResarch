import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

interface Review {
  id: string;
  movieId: string;
  userId: string;
  text: string;
  createdAt: Timestamp;
}

export const ReviewList = ({ movieId }: { movieId: string | undefined }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), where("movieId", "==", movieId));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data as Review[]);
      } catch (err) {
        setError("レビューの取得に失敗しました。");
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <section className="review-list">
      <h2>レビュー一覧</h2>
      {error && <p>{error}</p>}
      {reviews.map((review) => (
        <article key={review.id} className="review-item">
          <p>{review.text}</p>
          <p>投稿日: {review.createdAt?.toDate().toLocaleString()}</p>
        </article>
      ))}
    </section>
  );
};
