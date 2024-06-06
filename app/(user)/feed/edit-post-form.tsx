import { editPost, post } from "@/app/actions/post";
import { Button } from "@/components/ui/button";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { user } from "@/lib/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(1).max(1440),
  privacy: z.string(),
  id: z.string().uuid(),
});

export default function EditPostForm({
  currentUser,
  postData,
  close,
}: {
  currentUser?: user;
  postData: Pick<PostTypes, "id" | "content" | "privacy">;
  close: () => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: postData.id,
      content: postData.content,
      privacy: postData.privacy ?? "public",
    },
  });

  async function handleEditPost(values: z.infer<typeof postSchema>) {
    if (!currentUser) return;
    if (!post) return;
    setIsPending(true);
    const { error } = await editPost(values);
    if (error) {
      setIsPending(false);
      form.setError("content", {
        message: error.message,
      });
      return;
    }

    close();
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleEditPost)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    autoFocus
                    placeholder={`What's up, ${currentUser?.username}?`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-end">
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Privacy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              variant={"outline"}
              onClick={close}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit" className="">
              Edit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
