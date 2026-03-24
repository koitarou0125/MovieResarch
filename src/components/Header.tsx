import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Header = () => {
  const user = useContext(AuthContext);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header>
      <Link to="/">
        <h1>映画検索サイト</h1>
      </Link>
      {user ? (
        <button onClick={handleSignOut}>ログアウト</button>
      ) : (
        <Link to="/login">
          <button>ログイン</button>
        </Link>
      )}
    </header>
  );
};
