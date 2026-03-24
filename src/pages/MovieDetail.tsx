import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReviewForm } from "../components/ReviewForm";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ja-JP`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError("映画の情報の取得に失敗しました。");
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div>読み込み中...</div>;

  return (
    <div>
      {error && <p>{error}</p>}
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
      <p>評価: {movie.vote_average}</p>
      <p>概要: {movie.overview}</p>
      <p>公開日: {movie.release_date}</p>

      <ReviewForm id={id} />
    </div>
  );
}
