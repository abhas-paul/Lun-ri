import { LoaderCircle } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-[calc(100dvh-64px)] flex flex-col items-center justify-center bg-[#0f0f0f]">
      <LoaderCircle className="size-10 animate-spin text-[#134fd6]" />

      <p className="mt-4 text-white">
        Connecting to chat...
      </p>
    </div>
  );
}

export default ChatLoader;