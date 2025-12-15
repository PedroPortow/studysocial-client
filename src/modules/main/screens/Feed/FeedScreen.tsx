import { Divider } from "@heroui/divider";

import Feed from "../../components/Feed/Feed";
import PostForm from "../../components/PostForm/PostForm";

function FeedScreen() {
  return (
    <div className="flex flex-row justify-center w-full h-full py-8">
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <PostForm />
        <Divider />
        <Feed />
      </div>
    </div>
  );
}

export default FeedScreen;
