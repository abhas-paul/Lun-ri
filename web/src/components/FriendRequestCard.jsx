export default function FriendRequestCard({
  req,
  onAccept,
  isAccepting,
}) {
  const sender = req?.sender;
  if (!sender) return null;

  return (
    <article className="card bg-base-200 shadow-sm hover:shadow-md transition-all">
      <div className="card-body p-4">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <div className="avatar">
              <div className="w-14 rounded-full bg-base-300">
                <img src={sender.profilePic} alt={sender.name} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold">{sender.name}</h3>

              {sender.bio && (
                <p className="text-xs opacity-70">
                  {sender.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-1 mt-1">
                {sender.nativeLanguage && (
                  <span className="badge badge-secondary badge-sm">
                    Native: {sender.nativeLanguage}
                  </span>
                )}

                {sender.learningLanguage && (
                  <span className="badge badge-outline badge-sm">
                    Learning: {sender.learningLanguage}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAccept(req._id)}
            disabled={isAccepting}
          >
            {isAccepting ? "Accepting..." : "Accept"}
          </button>

        </div>
      </div>
    </article>
  );
}