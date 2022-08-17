/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts, Post } from "../utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await listPosts();
    return ctx.render(posts);
  },
};

export default function Blog(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <div class={tw`mt-12 max-w-screen-md mx-auto`}>
      <h1 class={tw`text-5xl mt-2 font-bold`}>Blog</h1>
      <ul class={tw`mt-8`}>
        {posts.map((post) => <PostEntry post={post} />)}
        {
          /* <p class={tw`text-gray-600`}>Date</p>
        <div class={tw`mt-12`}>Content</div> */
        }
      </ul>
    </div>
  );
}

function PostEntry(props: { post: Post }) {
  const post = props.post;
  const dateFmt = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "short",
  });

  return (
    <li class={tw`border-t py-2`}>
      <a href={`/blog/${post.id}`} class={tw`py-2 flex gap-4 group`}>
        <div>{dateFmt.format(post.published_at)}</div>
        <div>
          <h2 class={tw`font-bold text-xl group-hover:underline`}>
            {post.title}
          </h2>
          <p class={tw`text-gray-600`}>{post.snippet}</p>
        </div>
      </a>
    </li>
  );
}
