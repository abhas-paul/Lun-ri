import { MapPinIcon } from "lucide-react";

export default function FriendCard({ friend }) {
  return (
    <article
      className="card bg-[#151515] border border-[#134fd6]"
      style={{ fontFamily: "SpaceGrotesk" }}
    >
      <div className="card-body">

        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={friend.profilePic} alt={friend.name} />
            </div>
          </div>

          <div>
            <h3>{friend.name}</h3>

            {friend.location && friend.location.trim() !== "" && (
              <p className="text-xs opacity-70 flex items-center gap-1">
                <MapPinIcon className="size-3" />
                {friend.location}
              </p>
            )}
          </div>
        </div>

        {friend.bio && (
          <p
            className="text-sm opacity-70 mt-2"
            style={{ fontFamily: "RobotoSlab" }}
          >
            {friend.bio}
          </p>
        )}

      </div>
    </article>
  );
}