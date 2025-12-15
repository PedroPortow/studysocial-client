import { Divider } from "@heroui/divider";

import Feed from "../../components/Feed/Feed";
import FeedLayout from "../../components/FeedLayout/FeedLayout";
import PostForm from "../../components/PostForm/PostForm";

function FeedScreen() {
  return (
    <FeedLayout>
      <PostForm />
      <Divider />
      <Feed />
    </FeedLayout>
  );
}

export default FeedScreen;
