"use client";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Chat as StreamChatComponent } from "stream-chat-react";
import ChatChannel from "./chat-channel";
import ChatSidebar from "./chat-sidebar";
import UseInitializeChatClient from "./use-initialize-chat-client";

export default function Chat() {
  // Initialize this only once, for example in the root layout
  const chatClient = UseInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [openSideBar, setOpenSideBar] = useState(false);
  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }

  return (
    <main className="relative w-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full">

        <StreamChatComponent
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={openSideBar}
            onClose={() => setOpenSideBar(false)}
          />
          <ChatChannel
            open={!openSideBar}
            openSidebar={() => setOpenSideBar(true)}
          />
        </StreamChatComponent>
      </div>
    </main>
  );
}
