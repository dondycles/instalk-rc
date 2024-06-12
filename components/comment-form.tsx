import { comment } from "@/app/actions/comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const commentSchema = z.object({
  content: z.string().min(1).max(144),
  postId: z.string().uuid(),
  commentId: z.string().uuid().optional(),
});

export default function CommentForm({
  postId,
  commentId,
}: {
  postId: string;
  commentId?: string;
}) {
  const [expandInput, setExpandInput] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      commentId: commentId,
      postId: postId,
    },
  });

  async function handleComment(values: z.infer<typeof commentSchema>) {
    setIsPending(true);
    await comment(values);
    form.reset();
    setIsPending(false);
    setExpandInput(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleComment)}
        className="flex flex-col gap-4 flex-1"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <>
                  {expandInput ? (
                    <Textarea autoFocus placeholder={`Comment`} {...field} />
                  ) : (
                    <Input
                      placeholder={`Comment`}
                      onClick={() => setExpandInput(true)}
                      {...field}
                    />
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {expandInput && (
          <div className="flex gap-4 justify-end">
            <Button
              disabled={isPending}
              onClick={() => {
                setExpandInput(false);
                form.reset();
              }}
              variant={"outline"}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isPending} type="submit">
              Comment
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
