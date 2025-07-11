import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import axiosInstance from "../lib/axiosInstance";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else navigate("/");
  };

const handleSignup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  const token = data.session?.access_token;

  if (token) {
    try {
      await axiosInstance.get(
        '/auth/sync',
      );

      navigate('/');
    } catch (err) {
      console.error('Sync failed:', err);
    }
  }};

  useEffect(() => {
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (session) navigate('/');
    // });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm space-y-4">
        <h2 className="text-xl font-semibold text-center">AlgoArena Login</h2>
         <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-between gap-2">
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Log In
          </button>
          <button
            onClick={handleSignup}
            className="bg-gray-300 text-black px-4 py-2 rounded w-full"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
