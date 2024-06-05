import { Database } from "@/database.types";
type post = Database["public"]["Tables"]["posts"]["Row"];
type user = Partial<Database["public"]["Tables"]["users"]["Row"]>;
type post_like = Database["public"]["Tables"]["post_likes"]["Row"];
type post_comments = Database["public"]["Tables"]["post_comments"]["Row"];
type nullifiend = null | undefined;
declare global {
  interface PostTypes extends post {
    post_likes?: post_like[] | nullifiend;
    post_comments?: post_comments[] | nullifiend;
    users?: user | nullifiend;
  }
  interface PostLikeTypes extends post_like {
    users?: user | nullifiend;
  }
  interface PostCommentTypes extends post_comments {
    users?: user | nullifiend;
  }
  interface UserTypes extends user {}
}
