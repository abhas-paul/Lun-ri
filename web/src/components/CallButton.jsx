import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <button
      onClick={handleVideoCall}
      className="
        absolute
        top-3
        right-3
        z-50
        flex
        items-center
        justify-center
        size-10
        rounded-full
        bg-[#134fd6]
        text-white
        transition-all
        hover:scale-105
        active:scale-95
      "
    >
      <VideoIcon className="size-5" />
    </button>
  );
}

export default CallButton;