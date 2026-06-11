import { Link } from "react-router";
import { UsersIcon } from "lucide-react";
import FriendCard from "./FriendCard";

export default function FriendSection({ friends, incomingRequests }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl" style={{ fontFamily: "CalSans" }}>
          Your Friends
        </h2>

        <Link
          to="/notifications"
          className="btn btn-outline btn-sm"
          style={{ fontFamily: "SpaceGrotesk" }}
        >
          <UsersIcon className="size-4 mr-2" />
          Requests ({incomingRequests.length})
        </Link>
      </div>

      {friends.length === 0 ? (
        <p style={{ fontFamily: "RobotoSlab" }} className="opacity-70">
          No friends yet. Start connecting with people.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </section>
  );
}