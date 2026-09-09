import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function AuthForm() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("sign-in"); // "sign-in" | "sign-up"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const isSignUp = mode === "sign-up";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;

        if (!data.session) {
          setMessage("Account created. Check your email to confirm before signing in.");
        }
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
      }
    } catch (authError) {
      setError(authError.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <div className="rounded-xl border border-amber-200/20 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
        <h1 className="mb-1 font-heading text-2xl text-amber-300">Smart Study Transformer</h1>
        <p className="mb-6 text-sm text-amber-100/80">
          {isSignUp ? "Create an account to get started." : "Sign in to your account."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-amber-100">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-amber-50 outline-none ring-amber-400 transition focus:ring-2"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-amber-100">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-amber-50 outline-none ring-amber-400 transition focus:ring-2"
              disabled={loading}
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-400/40 bg-red-500/10 p-2 text-sm text-red-200">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-2 text-sm text-emerald-200">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(isSignUp ? "sign-in" : "sign-up");
            setError("");
            setMessage("");
          }}
          className="mt-4 w-full text-center text-sm text-amber-200/80 hover:text-amber-200"
        >
          {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
