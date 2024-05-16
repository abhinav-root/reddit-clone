import { notFound } from "next/navigation";
import { findCommunityByName } from "../_actions";
import CommunityPosts from "./_components/community-posts";

export default async function CommunityDetails({
  params,
}: {
  params: { name: string };
}) {
  const community = await findCommunityByName(params.name);
  if (!community) {
    return notFound();
  }
  return <div>
    <CommunityPosts communityId={community.id} />
  </div>;
}
