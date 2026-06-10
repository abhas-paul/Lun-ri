import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";

import { useSignup } from "../hooks/useSignup";

function SignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { mutate: signup, isPending } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const payload = {
      name: signupData.name.trim(),
      email: signupData.email.trim().toLowerCase(),
      password: signupData.password,
    };

    if (!payload.name || !payload.email || !payload.password) {
      return toast.error("All fields are required.");
    }

    if (payload.password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters long."
      );
    }

    signup(payload);
  };

  return (
    <section
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="calmpizza"
    >
      <article className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* LEFT SIDE */}
        <section className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <header className="mb-4">
            <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Lun'ri
            </h1>
          </header>

          <form onSubmit={handleSignup}>
            <fieldset
              className="space-y-4"
              disabled={isPending}
            >
              <header>
                <h2 className="text-xl font-semibold">
                  Create an Account
                </h2>

                <p className="text-sm opacity-70">
                  Join Lun'ri and connect with people who share your interests.
                </p>
              </header>

              <section className="space-y-3">
                {/* FULL NAME */}
                <section className="form-control w-full">
                  <label htmlFor="fullName" className="label">
                    <span className="label-text pb-1">
                      Full Name
                    </span>
                  </label>

                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    placeholder="Abhas Paul"
                    className="input input-bordered w-full"
                    value={signupData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </section>

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
                    value={signupData.email}
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
                    value={signupData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <p className="text-xs opacity-70 mt-1">
                    Password must be at least 8 characters long
                  </p>
                </section>

                {/* TERMS */}
                <section className="form-control">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      required
                    />

                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                      >
                        terms of service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                      >
                        privacy policy
                      </button>
                    </span>
                  </label>
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <footer className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline"
                  >
                    Sign in
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
                Connect with people worldwide
              </h2>

              <p className="opacity-70">
                Build friendships, share experiences, and discover communities
                that match your interests.
              </p>
            </section>
          </section>
        </aside>
      </article>
    </section>
  );
}

export default SignUp;