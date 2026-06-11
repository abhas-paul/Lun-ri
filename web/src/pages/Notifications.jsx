import { useFriendRequests } from "../hooks/useFriendRequests";
import { useAcceptFriendRequest } from "../hooks/useAcceptFriendRequest";

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

  if (isLoading) {
    return (
      <main className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6 text-center space-y-3">
        <p className="text-error">
          {error?.message || "Something went wrong"}
        </p>
        <button className="btn btn-primary btn-sm" onClick={refetch}>
          Retry
        </button>
      </main>
    );
  }

  if (!incomingReqs.length && !acceptedReqs.length) {
    return (
      <main className="flex items-center justify-center py-16 opacity-70">
        No notifications yet
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-10">

        <NotificationHeader />

        <FriendRequestSection
          requests={incomingReqs}
          onAccept={acceptFriendRequest}
          isAccepting={isAccepting}
        />

        <AcceptedRequestSection
          requests={acceptedReqs}
        />

      </div>
    </main>
  );
}