import { MapPinIcon, CheckCircleIcon, UserPlusIcon } from "lucide-react";

export default function RecommendedSection({
  recommendedUsers,
  outgoingRequestIds,
  sendRequest,
  isSending,
}) {
  return (
    <section>
      <h2 className="text-3xl mb-6" style={{ fontFamily: "CalSans" }}>
        Meet New People
      </h2>

      {recommendedUsers.length === 0 ? (
        <p style={{ fontFamily: "RobotoSlab" }} className="opacity-70">
          No recommendations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {recommendedUsers.map((user) => {
            const alreadyRequested = outgoingRequestIds.has(user._id);

            return (
              <article
                key={user._id}
                className="card bg-[#151515] border border-[#134fd6]"
                style={{ fontFamily: "SpaceGrotesk" }}
              >
                <div className="card-body space-y-3">

                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-14 rounded-full">
                        <img src={user.profilePic} alt={user.name} />
                      </div>
                    </div>

                    <div>
                      <h3>{user.name}</h3>

                      {user.location && user.location.trim() !== "" && (
                        <p className="text-xs opacity-70 flex items-center gap-1">
                          <MapPinIcon className="size-3" />
                          {user.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {user.bio && (
                    <p
                      style={{ fontFamily: "RobotoSlab" }}
                      className="text-sm opacity-70"
                    >
                      {user.bio}
                    </p>
                  )}

                  {/* BUTTON */}
                  <button
                    className={`btn btn-sm w-full mt-2 ${alreadyRequested ? "btn-disabled" : "btn-primary"
                      }`}
                    onClick={() => sendRequest(user._id)}
                    disabled={alreadyRequested || isSending(user._id)}
                  >
                    {alreadyRequested ? (
                      <>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Request Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Send Request
                      </>
                    )}
                  </button>

                </div>
              </article>
            );
          })}

        </div>
      )}
    </section>
  );
}