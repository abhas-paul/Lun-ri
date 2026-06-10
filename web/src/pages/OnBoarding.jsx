import React from "react";
import { CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

function OnBoarding() {
  return (
    <section className="min-h-[100%] w-full flex items-center justify-center p-4 sm:p-6" data-theme="calmpizza">
      <article className="w-full max-w-xl bg-[#222222] rounded-2xl flex flex-col items-center py-6 sm:py-8">
        <header>
          <h1 className="pt-2 text-xl sm:text-2xl tracking-wide text-center">
            Complete Your Profile
          </h1>
        </header>

        <label
          htmlFor="profilePic"
          className="cursor-pointer group mt-6 sm:mt-8"
        >
          <figure className="size-28 sm:size-32 rounded-full bg-base-300 border border-base-content/10 overflow-hidden flex items-center justify-center transition-all group-hover:scale-[1.02] group-hover:border-primary">
            <CameraIcon className="size-10 opacity-50 group-hover:opacity-80 transition-opacity" />
          </figure>
        </label>

        <input
          id="profilePic"
          name="profilePic"
          type="file"
          accept="image/*"
          className="hidden"
        />

        <p className="text-xs opacity-70 text-center mt-3">
          Upload a profile picture
        </p>

        <form className="w-full flex flex-col items-center">
          <section className="form-control w-[85%] sm:w-[80%] mt-4">
            <label htmlFor="name" className="label">
              <span className="label-text font-medium pb-2">
                Full Name
              </span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Abhas Paul"
              className="input input-bordered w-full"
            />
          </section>

          <section className="form-control w-[85%] sm:w-[80%] mt-4">
            <label htmlFor="bio" className="label">
              <span className="label-text font-medium pb-2">
                Bio
              </span>
            </label>

            <textarea
              id="bio"
              name="bio"
              placeholder="Tell people a little about yourself, your interests, and what you're passionate about..."
              className="textarea textarea-bordered w-full h-24 sm:h-28 resize-y"
            />
          </section>

          <section className="form-control w-[85%] sm:w-[80%] mt-4">
            <label
              htmlFor="nativeLanguage"
              className="label"
            >
              <span className="label-text font-medium pb-2">
                Native Language
              </span>
            </label>

            <select
              id="nativeLanguage"
              name="nativeLanguage"
              className="select select-bordered w-full"
            >
              <option value="">
                Select your native language
              </option>

              {LANGUAGES.map((language) => (
                <option
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}
            </select>
          </section>

          <section className="form-control w-[85%] sm:w-[80%] mt-4">
            <label
              htmlFor="location"
              className="label"
            >
              <span className="label-text font-medium pb-2">
                Location
              </span>
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Kolkata, India"
              className="input input-bordered w-full"
            />
          </section>

          <footer className="w-[85%] sm:w-[80%] mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Complete Profile
            </button>
          </footer>
        </form>
      </article>
    </section>
  );
}

export default OnBoarding;