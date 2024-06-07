import { getUserProfile } from "@/app/actions/user";
import type { Metadata } from "next";
import ProfileSection from "./profile";
import getCurrentUser from "@/app/actions/get-currentuser";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): //   parent: ResolvingMetadata
Promise<Metadata> {
  const { data, error } = await getUserProfile(params.username);

  // optionally access and extend (rather than replace) parent metadata
  //   const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Instalkly | ${data?.fullname} @${data?.username}`,
    description: `See what is latest with ${data?.fullname}`,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const { data: currentUserData } = await getCurrentUser();
  return (
    <main className="px-4 h-full overflow-auto flex gap-4 justify-center ">
      <ProfileSection
        username={params.username}
        currentUser={currentUserData}
        isCurrentUserProfile={currentUserData?.username === params.username}
      />
    </main>
  );
}
