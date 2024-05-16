import { notFound } from "next/navigation";
import { getPostById } from "./_actions";
import Post from "@/components/post";
import Comments from "@/components/comments";
import GoBack from "@/components/go-back-button";

export default async function PostDetails({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPostById(params.postId);
  if (!post) {
    throw notFound();
  }
  return (
    <div className="min-h-[90vh] max-h-[90vh] overflow-y-scroll">
      <main>
        <div className="py-4 text-left px-4">
          <GoBack /> 
        </div>
        <div>
          <Post {...post} />
        </div>
        <div>
            <Comments postId={post.id} />
        </div>
      </main>
    </div>
  );
}
