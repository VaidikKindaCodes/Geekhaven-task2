import React, {  useRef, useState } from "react";
import { AuthContextType, useAuth } from "@/context/AuthProvider";


export default function SignInSection({
  refProp,
}: {
  refProp?: React.RefObject<HTMLElement>;
}) {
const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const {setUser} = useAuth() as AuthContextType;
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${backendurl}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (data.success) {
        document.cookie = `token=${data.token}; path=/;`;
        setUser(data.user);
        document.cookie = `user=${encodeURIComponent(JSON.stringify(data.user))}; path=/;`;
        router.replace("/dashboard");
      } else {
        throw alert(data.message);
      }
    } catch (err) {
      alert("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-neutral-900 px-5 sm:px-10 py-16 min-h-screen flex items-center justify-center"
      id="signin"
      ref={refProp}
    >
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8 sm:p-10 border border-indigo-700/30">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 pb-5">
          Welcome back to Vaidik's Website
        </h1>
        <p className="text-center text-gray-300 text-lg mb-6">
          Sign in to continue
        </p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-white font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. xyz@gmail.com"
              required
              className="w-full bg-neutral-700 px-5 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-white font-semibold">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full bg-neutral-700 px-5 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 via-blue-700 to-purple-700 px-6 py-3 rounded-lg shadow-lg text-white font-bold flex justify-center items-center gap-2 hover:scale-105 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <button
            onClick={()=> router.replace("/auth/sign-up")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </section>
  );
}
