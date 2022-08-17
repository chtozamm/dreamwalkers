/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/posts.ts";
import * as gfm from "@gfm";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return ctx.render(post);
  },
};

export default function BlogPostPage(props: PageProps<Post>) {
  const post = props.data;
  const dateFmt = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
  });
  const html = gfm.render(post.content);
  return (
    <div class={tw`mt-12 max-w-screen-md mx-auto`}>
      <p class={tw`text-gray-600`}>{dateFmt.format(post.published_at)}</p>
      <h1 class={tw`text-5xl mt-2 font-bold`}>
        {post.title}
      </h1>
      <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      <div
        class={tw`mt-12` + " markdown-body"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
