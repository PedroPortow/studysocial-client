import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

import CommentForm from "../../components/Comment/CommentForm";
import FeedLayout from "../../components/FeedLayout/FeedLayout";
import PostCard from "../../components/PostCard/PostCard";
import { usePost } from "../../hooks/queries/usePost";

import CommentList from "./components/CommentsList";

function PostScreen() {
	const { id } = useParams<{ id: string }>();

	const postId = Number(id);

	const { data: post, isPending } = usePost(postId);

	if (isPending) {
		// todo: suspense... e tirar a gambiarra do FeedLayout
		return (
			<div className="flex justify-center items-center h-full py-16">
				<Spinner size="lg" />
			</div>
		);
	}

	if (!post) {
		return <div>algo deu errado</div>;
	}

	return (
		<FeedLayout>
			<div className="flex flex-col gap-4 w-full max-w-xl">
				<Button
					className="w-fit"
					startContent={<ArrowLeft size={16} />}
					variant="ghost"
					onPress={() => window.history.back()}
				>
					Voltar
				</Button>
				<PostCard post={post} />
				<CommentForm postId={postId} />
				<Suspense
					fallback={
						<div className="flex justify-center py-8">
							<Spinner size="md" />
						</div>
					}
				>
					<CommentList postId={postId} />
				</Suspense>
			</div>
		</FeedLayout>
	);
}

export default PostScreen;
