import post from "@/app/actions/post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(1).max(144),
  privacy: z.enum(["public", "private"]),
});

export default function PostForm({
  expandCreatePost,
  setExpandCreatePost,
  currentUser,
}: {
  expandCreatePost: boolean;
  setExpandCreatePost: (value: boolean) => void;
  currentUser?: user;
}) {
  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      privacy: "public",
    },
  });

  async function handlePost(values: z.infer<typeof postSchema>) {
    if (!currentUser) return;
    const { error } = await post(values);
    if (error)
      return form.setError("content", {
        message: error.message,
      });

    form.reset();
    setExpandCreatePost(false);
  }

  return (
    <Card className="mt-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <CardTitle className={`sm:block hidden font-bold text-sm`}>
          Create post
        </CardTitle>
        {!expandCreatePost && (
          <Input
            onClick={() => setExpandCreatePost(true)}
            className="flex-1"
            placeholder={`What's up, ${currentUser?.username}?`}
          />
        )}
      </CardHeader>
      {expandCreatePost && (
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePost)}
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
                  variant={"outline"}
                  onClick={() => setExpandCreatePost(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className=""
                >
                  Post
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
}
