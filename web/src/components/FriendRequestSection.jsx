import { UserCheckIcon } from "lucide-react";
import FriendRequestCard from "./FriendRequestCard";

export default function FriendRequestSection({
  requests,
  onAccept,
  isAccepting,
}) {
  if (!requests.length) return null;

  return (
    <section className="space-y-4">

      <div className="flex items-center gap-2">
        <UserCheckIcon className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">
          Friend Requests
        </h2>
        <span className="badge badge-primary">
          {requests.length}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((req) => (
          <FriendRequestCard
            key={req._id}
            req={req}
            onAccept={onAccept}
            isAccepting={isAccepting(req._id)}
          />
        ))}
      </div>

    </section>
  );
}