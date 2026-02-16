import { Suspense } from "react";
import Feed from "../../components/Feed/Feed";
import FeedLayout from "../../components/FeedLayout/FeedLayout";

function FeedScreen() {
  return (
    <FeedLayout>
      <div className="flex flex-col gap-8">
        <Suspense fallback={<Feed.Loader />}>
          <Feed />
        </Suspense>
      </div>
    </FeedLayout>
  );
}

export default FeedScreen;
