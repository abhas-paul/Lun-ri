import { useEffect, useState } from "react";

const messages = [
  "Connecting to Lun'ri...",
  "Fetching your updates...",
  "Loading conversations...",
  "Syncing notifications...",
  "Preparing your feed...",
  "Almost there...",
];

export default function Loading() {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(
        messages[Math.floor(Math.random() * messages.length)]
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center gap-4 px-4"
      data-theme="calmpizza"
      aria-busy="true"
    >
      <span
        className="loading loading-dots loading-xl"
        aria-label="Loading"
      />

      <span className="skeleton skeleton-text">
        {message}
      </span>
    </section>
  );
}