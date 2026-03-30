import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

interface Favorite {
  id: string;
  movieId: string;
  title: string;
  poster_path: string;
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      try {
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(data as Favorite[]);
      } catch (err) {
        setError("お気に入りの取得に失敗しました。");
      }
    };
    fetchFavorites();
  }, [user]);

  if (!user)
    return (
      <main className="page page-favorites">
        <p>ログインしてください</p>
      </main>
    );

  return (
    <main className="page page-favorites">
      <h1>お気に入り一覧</h1>
      {error && <p>{error}</p>}
      {favorites.length > 0 ? (
        <ul className="favorite-list">
          {favorites.map((favorite) => (
            <li key={favorite.id} className="favorite-item">
              <Link to={`/movie/${favorite.movieId}`}>
                <img src={`https://image.tmdb.org/t/p/w400${favorite.poster_path}`} alt={favorite.title} />
                <h3>{favorite.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>お気に入りがまだありません。</p>
      )}
    </main>
  );
}
