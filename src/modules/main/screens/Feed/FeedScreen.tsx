import Feed from "../../components/Feed/Feed";
import FeedLayout from "../../components/FeedLayout/FeedLayout";
import PostForm from "../../components/PostForm/PostForm";

function FeedScreen() {
  return (
    <FeedLayout>
      <div className="flex flex-col gap-8">
        <PostForm />
        <Feed />
      </div>
    </FeedLayout>
  );
}

export default FeedScreen;
