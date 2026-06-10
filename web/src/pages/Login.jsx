import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import { useLogin } from "../hooks/useLogin";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { mutate: login, isPending } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = {
      email: loginData.email.trim().toLowerCase(),
      password: loginData.password,
    };

    if (!payload.email || !payload.password) {
      return toast.error("All fields are required.");
    }

    login(payload);
  };

  return (
    <section
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <article className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE */}
        <section className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <header className="mb-4">
            <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Lun'ri
            </h1>
          </header>

          <form onSubmit={handleLogin}>
            <fieldset
              className="space-y-4"
              disabled={isPending}
            >
              <header>
                <h2 className="text-xl font-semibold">
                  Welcome Back
                </h2>

                <p className="text-sm opacity-70">
                  Sign in to continue connecting with your communities.
                </p>
              </header>

              <section className="space-y-3">
                {/* EMAIL */}
                <section className="form-control w-full">
                  <label htmlFor="email" className="label">
                    <span className="label-text pb-1">
                      Email
                    </span>
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="abhas@gmail.com"
                    className="input input-bordered w-full"
                    value={loginData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </section>

                {/* PASSWORD */}
                <section className="form-control w-full">
                  <label htmlFor="password" className="label">
                    <span className="label-text pb-1">
                      Password
                    </span>
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    className="input input-bordered w-full"
                    value={loginData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />
                </section>
              </section>

              <button
                className="btn btn-primary w-full"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <footer className="text-center mt-4">
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </footer>
            </fieldset>
          </form>
        </section>

        {/* RIGHT SIDE */}
        <aside className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <section className="max-w-md p-8">
            <figure className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/video-call.png"
                alt="People connecting on Lun'ri"
                className="w-full h-full"
                loading="lazy"
              />
            </figure>

            <section className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Reconnect with your world
              </h2>

              <p className="opacity-70">
                Catch up with conversations, communities, and friends waiting
                for you on Lun'ri.
              </p>
            </section>
          </section>
        </aside>
      </article>
    </section>
  );
}

export default Login;