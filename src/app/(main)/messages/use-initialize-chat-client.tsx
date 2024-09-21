"use client";
import kyInstance from "@/lib/ky";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useSession } from "../session-provider";

export default function UseInitializeChatClient() {
  const { user } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  // Initialize in a useEffect, secret  key not needed here on the front end
  // since we are not doing admin stuff.
  useEffect(() => {
    const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);
    //This  creates a user in the stream dashboard.
    client
      .connectUser(
        {
          id: user.id,
          username: user.username,
          name: user.displayName,
          image: user.avatarUrl,
        },
        async () =>
          kyInstance
            .get("/api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .catch((error) =>
        console.error("Failed to connect user to stream", error),
      )
      .then(() => setChatClient(client));

    //   Clean up use effect
    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user"))
        .then(() => console.log("Stream connection closed. "));
    };

    // pass dependencies, pas only the one the hook depends on
  }, [user.avatarUrl, user.displayName, user.id, user.username]);

  return chatClient;
}
