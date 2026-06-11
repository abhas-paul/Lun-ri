import { ClockIcon } from "lucide-react";

export default function AcceptedRequestCard({ item }) {
  const user = item?.recipient;
  if (!user) return null;

  return (
    <article className="card bg-base-200 shadow-sm">
      <div className="card-body p-4">

        <div className="flex items-start gap-3">

          <div className="avatar mt-1">
            <div className="w-10 rounded-full bg-base-300">
              <img src={user.profilePic} alt={user.name} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold">{user.name}</h3>

            <p className="text-sm opacity-70">
              {user.name} accepted your friend request
            </p>

            <p className="text-xs flex items-center opacity-70 mt-1">
              <ClockIcon className="w-3 h-3 mr-1" />
              Recently
            </p>
          </div>

          <span className="badge badge-success">
            New Friend
          </span>

        </div>

      </div>
    </article>
  );
}