import { useState } from "react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ja-JP`);
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      setError("映画の検索に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>映画検索</h1>
      <input type="text" placeholder="映画のタイトルを入力" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={searchMovies}>検索</button>
      {loading && <p>検索中...</p>}
      {error && <p>{error}</p>}
      <ul>
        {results.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <li>
              <img src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
              {movie.title}
              {movie.vote_average}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
