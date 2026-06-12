import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { useAuthUser } from "../hooks/useAuthUser";
import { useStreamToken } from "../hooks/useStreamToken";

import ChatLoader from "../components/ChatLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function CallPage() {
  const { id: callId } = useParams();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

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
      !callId
    ) {
      return;
    }

    let videoClient;
    let callInstance;
    let mounted = true;

    const initializeCall = async () => {
      try {
        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,

          user: {
            id: authUser._id.toString(),
            name: authUser.name,
            image: authUser.profilePic,
          },

          token,
        });

        callInstance = videoClient.call(
          "default",
          callId
        );

        await callInstance.join({
          create: true,
        });

        if (!mounted) return;

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error(
          "Call Initialization Error:",
          error
        );

        toast.error(
          error?.message ||
          "Failed to join call."
        );
      }
    };

    initializeCall();

    return () => {
      mounted = false;

      callInstance?.leave();
      videoClient?.disconnectUser?.();
    };
  }, [
    authUser,
    token,
    callId,
  ]);

  if (
    authLoading ||
    tokenLoading ||
    !client ||
    !call
  ) {
    return <ChatLoader />;
  }

  return (
    <div className="h-[100dvh] w-full bg-black overflow-hidden" data-theme="calmpizza">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallContent />
        </StreamCall>
      </StreamVideo>
    </div>
  );
}

function CallContent() {
  const navigate = useNavigate();

  const { useCallCallingState } =
    useCallStateHooks();

  const callingState =
    useCallCallingState();

  useEffect(() => {
    if (
      callingState ===
      CallingState.LEFT
    ) {
      navigate("/", {
        replace: true,
      });
    }
  }, [
    callingState,
    navigate,
  ]);

  return (
    <StreamTheme>
      <div className="relative h-[100dvh] w-full bg-[#0f0f0f]">
        <SpeakerLayout />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
}

export default CallPage;