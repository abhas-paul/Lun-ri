import { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import {
    Chat,
    Channel,
    ChannelHeader,
    MessageList,
    MessageComposer,
    Thread,
    Window,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";

import { useAuthUser } from "../hooks/useAuthUser";
import { useStreamToken } from "../hooks/useStreamToken";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

import "stream-chat-react/dist/css/index.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function ChatPage() {
    const { id: targetUserId } = useParams();

    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);

    const navigate = useNavigate();

    const {
        data: authData,
        isLoading: authLoading,
    } = useAuthUser();

    const authUser = authData?.user;

    const {
        data: tokenData,
        isLoading: tokenLoading,
    } = useStreamToken();

    const token = tokenData?.token;

    useEffect(() => {
        if (
            !STREAM_API_KEY ||
            !authUser ||
            !token ||
            !targetUserId
        ) {
            return;
        }

        let mounted = true;
        const client = StreamChat.getInstance(
            STREAM_API_KEY
        );

        const initializeChat = async () => {
            try {
                if (!client.userID) {
                    await client.connectUser(
                        {
                            id: authUser._id.toString(),
                            name: authUser.name,
                            image: authUser.profilePic,
                        },
                        token
                    );
                }

                const channelId = [
                    authUser._id.toString(),
                    targetUserId,
                ]
                    .sort()
                    .join("-");

                const dmChannel = client.channel(
                    "messaging",
                    channelId,
                    {
                        members: [
                            authUser._id.toString(),
                            targetUserId,
                        ],
                    }
                );

                await dmChannel.watch();

                if (!mounted) return;

                setChatClient(client);
                setChannel(dmChannel);
            } catch (error) {
                console.error(
                    "Chat Initialization Error:",
                    error
                );

                toast.error(
                    error?.message ||
                    "Failed to connect to chat."
                );
            }
        };

        initializeChat();

        return () => {
            mounted = false;
        };


    }, [authUser, token, targetUserId]);

    const handleVideoCall = () => {
        if (!authUser || !targetUserId) return;

        const callId = [
            authUser._id.toString(),
            targetUserId,
        ]
            .sort()
            .join("-");

        navigate(`/call/${callId}`);
    };

    if (
        authLoading ||
        tokenLoading ||
        !chatClient ||
        !channel
    ) {
        return <ChatLoader />;
    }

    return (<div className="h-[calc(100dvh-64px)] w-full overflow-hidden bg-base-100" data-theme="calmpizza"> <Chat
        client={chatClient}
        theme="str-chat__theme-dark"
    > <Channel channel={channel}> <div className="relative h-full w-full"> <CallButton
        handleVideoCall={handleVideoCall}
    />
        <Window>
            <ChannelHeader />
            <MessageList />
            <MessageComposer />
        </Window>
    </div>

            <Thread />
        </Channel>
    </Chat>
    </div>

    );
}

export default ChatPage;
