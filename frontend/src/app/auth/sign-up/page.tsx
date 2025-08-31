import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpSection({ refProp }: { refProp?: React.RefObject<HTMLElement> }) {
  const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${backendurl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({} as any));

      if (data && data.success) {
        formRef.current?.reset();
        setForm({ name: "", email: "", password: "" });
        router.replace("/auth/sign-in");
        
        return;
      }
      const msg = data?.message || "Unable to sign up. Please try again.";
      alert(msg);
    } catch (err) {
      console.error(err);
      alert("Unable to sign up at the moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-neutral-900 px-5 sm:px-10 py-16 min-h-screen flex items-center justify-center"
      id="signup"
      ref={refProp}
    >
      <div className="w-full max-w-md bg-neutral-800 rounded-2xl shadow-2xl p-8 sm:p-10 border border-indigo-700/30">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 pb-5">
          Join Vaidik's Website
        </h1>
        <p className="text-center text-gray-300 text-lg mb-6">Create your account</p>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-white font-semibold">Username</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="eg. Sanni Dancer"
              required
              className="w-full bg-neutral-700 px-5 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-white font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. sannidancer@gmail.com"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={()=> router.replace("/auth/sign-in")}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
}
