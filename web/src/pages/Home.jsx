import Loading from "../components/Loading";

import { useFriends } from "../hooks/useFriends";
import { useRecommendedUsers } from "../hooks/useRecommendedUsers";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useOutgoingFriendRequests } from "../hooks/useOutgoingFriendRequests";
import { useSendFriendRequest } from "../hooks/useSendFriendRequest";

import FriendSection from "../components/FriendSection";
import RecommendedSection from "../components/RecommendedSection";

function Home() {
  const { data: friendsResponse, isLoading: isFriendsLoading, isError: isFriendsError } =
    useFriends();

  const {
    data: recommendedResponse,
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useRecommendedUsers();

  const {
    data: friendRequestsResponse,
    isLoading: isFriendRequestsLoading,
    isError: isFriendRequestsError,
  } = useFriendRequests();

  const {
    data: outgoingRequestsResponse,
    isLoading: isOutgoingRequestsLoading,
    isError: isOutgoingRequestsError,
  } = useOutgoingFriendRequests();

  const {
    mutate: sendRequest,
    isPending,
    variables,
  } = useSendFriendRequest();

  const friends = friendsResponse?.friends ?? [];
  const recommendedUsers = recommendedResponse?.recommendedUsers ?? [];
  const incomingRequests = friendRequestsResponse?.incomingReqs ?? [];
  const outgoingRequests = outgoingRequestsResponse?.outgoingRequests ?? [];

  const outgoingRequestIds = new Set(
    outgoingRequests.map((r) => r?.recipient?._id)
  );

  const isLoading =
    isFriendsLoading ||
    isRecommendedLoading ||
    isFriendRequestsLoading ||
    isOutgoingRequestsLoading;

  const hasError =
    isFriendsError ||
    isRecommendedError ||
    isFriendRequestsError ||
    isOutgoingRequestsError;

  const isSending = (id) => isPending && variables === id;

  if (isLoading) return <Loading />;

  if (hasError) {
    return (
      <main className="p-6">
        <p className="text-error" style={{ fontFamily: "RobotoSlab" }}>
          Failed to load data. Please refresh.
        </p>
      </main>
    );
  }

  return (
    <main className="p-6 sm:p-8 lg:p-10 space-y-12">

      <FriendSection
        friends={friends}
        incomingRequests={incomingRequests}
      />

      <RecommendedSection
        recommendedUsers={recommendedUsers}
        outgoingRequestIds={outgoingRequestIds}
        sendRequest={sendRequest}
        isSending={isSending}
      />

    </main>
  );
}

export default Home;