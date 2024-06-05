import { UserCircle } from "lucide-react";
import { Card, CardHeader } from "./ui/card";
import { user } from "@/lib/global";
import UserHoverCard from "./user-hover-card";

export default function CommentCard({
  comment,
  currentUser,
}: {
  comment: PostCommentTypes;
  currentUser?: user | null;
}) {
  return (
    <Card className="w-full">
      <CardHeader className="p-2">
        <div className="flex gap-1 items-start text-sm">
          <UserCircle className="size-10 shrink-0" />
          <div>
            <div className="flex items-center flex-wrap">
              <UserHoverCard currentUser={currentUser} user={comment.users}>
                <p className="font-bold line-clamp-1 min-w-fit pr-1">
                  {comment.users?.fullname}
                </p>
              </UserHoverCard>
              <p>@{comment.users?.username}</p>
            </div>
            <div className="flex items-center flex-wrap gap-x-1">
              <p className="whitespace-pre-line">{comment.content}</p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
