import { useState } from "react";
import { CameraIcon } from "lucide-react";
import { toast } from "react-hot-toast";

import { LANGUAGES } from "../constants";
import { useOnboarding } from "../hooks/useOnboarding";

// Cloudinary upload helper
const uploadToCloudinary = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Cloudinary upload failed");
  }

  return data.secure_url;
};

function OnBoarding() {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    nativeLanguage: "",
    location: "",
    profilePic: "",
  });

  const { mutate: completeOnboarding, isPending } = useOnboarding();

  // ✅ IMAGE UPLOAD (Cloudinary)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Please upload a valid image.");
    }

    try {
      const toastId = toast.loading("Uploading image...");

      const url = await uploadToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        profilePic: url,
      }));

      toast.dismiss(toastId);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  // ✅ SUBMIT (ONLY NAME REQUIRED)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }

    completeOnboarding({
      name: formData.name.trim(),
      bio: formData.bio?.trim() || "",
      nativeLanguage: formData.nativeLanguage || "",
      location: formData.location?.trim() || "",
      profilePic: formData.profilePic || "",
    });
  };

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6"
      data-theme="calmpizza"
    >
      <article className="w-full max-w-xl bg-[#222222] rounded-2xl flex flex-col items-center py-6 sm:py-8">

        <h1 className="pt-2 text-xl sm:text-2xl text-center">
          Complete Your Profile
        </h1>

        {/* PROFILE IMAGE */}
        <label htmlFor="profilePic" className="cursor-pointer mt-6">
          <div className="size-28 sm:size-32 rounded-full overflow-hidden bg-base-300 flex items-center justify-center border border-base-content/10">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                className="w-full h-full object-cover"
                alt="profile"
              />
            ) : (
              <CameraIcon className="size-10 opacity-60" />
            )}
          </div>
        </label>

        <input
          id="profilePic"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <p className="text-xs opacity-60 mt-2">
          Upload profile picture (optional)
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          {/* NAME (required) */}
          <div className="w-[85%] mt-4">
            <label className="label pb-2">Full Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Abhas Paul"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* BIO */}
          <div className="w-[85%] mt-4">
            <label className="label pb-2">Bio</label>
            <textarea
              className="textarea textarea-bordered w-full h-24"
              placeholder="Tell us a bit about yourself"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>

          {/* LANGUAGE */}
          <div className="w-[85%] mt-4">
            <label className="label pb-2">Native Language</label>
            <select
              className="select select-bordered w-full"
              value={formData.nativeLanguage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  nativeLanguage: e.target.value,
                })
              }
            >
              <option value="">Select language</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* LOCATION */}
          <div className="w-[85%] mt-4">
            <label className="label pb-2">Location</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Kolkata, India"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          {/* SUBMIT */}
          <div className="w-[85%] mt-6">
            <button
              className="btn btn-primary w-full"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Complete Profile"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default OnBoarding;