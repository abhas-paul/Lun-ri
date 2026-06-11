import { useFriendRequests } from "../hooks/useFriendRequests";
import { useAcceptFriendRequest } from "../hooks/useAcceptFriendRequest";

import Loading from "../components/Loading";

import NotificationHeader from "../components/NotificationHeader";
import FriendRequestSection from "../components/FriendRequestSection";
import AcceptedRequestSection from "../components/AcceptedRequestSection";

export default function NotificationsPage() {
  const { data, isLoading, isError, error, refetch } =
    useFriendRequests();

  const {
    mutate: acceptFriendRequest,
    isPending,
    variables,
  } = useAcceptFriendRequest();

  const incomingReqs = data?.incomingReqs ?? [];
  const acceptedReqs = data?.acceptedReqs ?? [];

  const isAccepting = (id) =>
    isPending && variables === id;

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <main className="p-6 text-center space-y-3">
        <p className="text-error font-[RobotoSlab]">
          {error?.message || "Something went wrong"}
        </p>

        <button
          className="btn btn-primary btn-sm font-[SpaceGrotesk]"
          onClick={refetch}
        >
          Retry
        </button>
      </main>
    );
  }

  if (!incomingReqs.length && !acceptedReqs.length) {
    return (
      <main
        className="flex items-center justify-center py-16 opacity-70"
        style={{ fontFamily: "RobotoSlab" }}
      >
        No notifications yet
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-10">

        {/* HEADER */}
        <div
          style={{
            fontFamily: "CalSans",
            fontWeight: "400",
            letterSpacing: "0.08em",
          }}
        >
          <NotificationHeader />
        </div>

        {/* FRIEND REQUESTS */}
        <div style={{ fontFamily: "SpaceGrotesk" }}>
          <FriendRequestSection
            requests={incomingReqs}
            onAccept={acceptFriendRequest}
            isAccepting={isAccepting}
          />
        </div>

        {/* ACCEPTED REQUESTS */}
        <div style={{ fontFamily: "SpaceGrotesk" }}>
          <AcceptedRequestSection
            requests={acceptedReqs}
          />
        </div>

      </div>
    </main>
  );
}