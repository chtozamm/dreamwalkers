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
    <div class={tw`max-w-screen-lg mx-auto px-4`}>
      <div class={tw`flex justify-between  my-5 md:(my-12) items-center`}>
        <h1 class={tw`text-5xl font-bold`}>Blog</h1>
        <a href="/settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={tw`h-6 w-6`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="rgb(156 163 175)"
            stroke-width="1.75"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </a>
      </div>
      <ul>
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
