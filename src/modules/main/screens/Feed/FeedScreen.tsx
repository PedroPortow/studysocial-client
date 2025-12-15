import PostForm from "../../components/PostForm/PostForm";

function FeedScreen() {
  return (
    <div className="flex flex-row justify-center w-full h-full py-8">
      <div className="w-md">
        <PostForm />
      </div>
    </div>
  );
}

export default FeedScreen;
