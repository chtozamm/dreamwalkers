/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost, Post } from "../../utils/posts.ts";
import * as gfm from "@gfm";
import { State } from "../../utils/state.ts";

interface Data extends State {
  post: Post;
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    const post = await loadPost(id);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    return ctx.render({ ...ctx.state, post });
  },
};

export default function BlogPostPage(props: PageProps<Data>) {
  const { post, locales } = props.data;
  const dateFmt = new Intl.DateTimeFormat(locales, {
    dateStyle: "full",
  });
  const html = gfm.render(post.content);
  return (
    <div class={tw`max-w-screen-sm mx-auto px-6 mt-12 md:(mt-12 px-0)`}>
      {
        /* <div class={tw`flex justify-between  mt-5 md:(mt-12) items-center`}>
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={tw`h-6 w-6 mt-3`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="rgb(156 163 175)"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </a>
      </div> */
      }
      <h1 class={tw`text-4xl md:(text-5xl) text-center mt-2 font-bold`}>
        {post.title}
      </h1>
      <style dangerouslySetInnerHTML={{ __html: gfm.CSS }} />
      <div
        class={tw`text-justify mt-12 md:(mt-12 px-0)` +
          " markdown-body"}
        data-color-mode="auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <p class={tw`text-sm text-right mt-16 md:(px-0) text-gray-400`}>
        {dateFmt.format(post.published_at)}
      </p>
    </div>
  );
}
