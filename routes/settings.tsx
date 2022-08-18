/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { State } from "../utils/state.ts";
import LocaleSelector from "../islands/LocaleSelector.tsx";

export const handler: Handlers<State, State> = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
  async POST(req) {
    const form = await req.formData();
    const locale = form.get("locale");
    const headers = new Headers({
      Location: "/blog/settings",
    });
    if (typeof locale === "string") {
      setCookie(headers, {
        name: "locale",
        value: locale,
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return new Response("", {
      status: 303,
      headers,
    });
  },
};

export default function Settings(props: PageProps<State>) {
  const { locales } = props.data;
  return (
    <div class={tw`mt-12 max-w-screen-md mx-auto`}>
      <div class={tw`flex justify-between items-center`}>
        <h1 class={tw`text-5xl font-bold`}>Settings</h1>
        <a href="/">
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
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        </a>
      </div>
      <p class={tw`mt-8 mb-4`}>
        Your current locale is <b>{locales[0]}.</b>
      </p>
      <LocaleSelector />
    </div>
  );
}
