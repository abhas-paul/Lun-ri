import { useFriends } from "../hooks/useFriends";
import { useRecommendedUsers } from "../hooks/useRecommendedUsers";
import { useFriendRequests } from "../hooks/useFriendRequests";
import { useOutgoingFriendRequests } from "../hooks/useOutgoingFriendRequests";

function Home() {
    const {
        data: friendsResponse,
        isLoading: isFriendsLoading,
        isError: isFriendsError,
    } = useFriends();

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

    
    const friends =
        friendsResponse?.friends ?? [];

    const recommendedUsers =
        recommendedResponse?.recommendedUsers ?? [];

    const incomingRequests =
        friendRequestsResponse?.incomingReqs ?? [];

    const acceptedRequests =
        friendRequestsResponse?.acceptedReqs ?? [];

    const outgoingRequests =
        outgoingRequestsResponse?.outgoingRequests ?? [];

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

    if (isLoading) {
        return null;
    }

    if (hasError) {
        return null;
    }

    return (
        <main
            style={{ fontFamily: "CalSans" }}
            className="p-4"
        >
            Font works!
        </main>
    );
}

export default Home;