import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        error.code === "auth/user-not-found" ? setError("ユーザーが見つかりません。") : error.code === "auth/wrong-password" ? setError("パスワードが間違っています。") : setError("ログインに失敗しました。");
      }
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      <input type="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>ログイン</button>
      {error && <p>{error}</p>}
    </div>
  );
}
