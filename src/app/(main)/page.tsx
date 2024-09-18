import PostEditor from "@/components/posts/editor/post-editor";
import TrendsSidebar from "@/components/trends-sidebar";
import ForYouFeeds from "./for-you-feeds";
import { Tabs, TabsList,TabsTrigger,TabsContent, } from "@/components/ui/tabs";
import FollowingFeeds from "./following-feed";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value={"for-you"}>For you</TabsTrigger>
            <TabsTrigger value={"following"}>Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeeds />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeeds />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
}
