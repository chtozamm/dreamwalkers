/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { State } from "../../utils/state.ts";
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/posix.ts";
import LocaleSelector from "../../islands/LocaleSelector.tsx";

export const handler: Handlers<State, State> = {
  async GET(_req, ctx) {
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
    <div class={tw`mt-16 max-w-screen-md mx-auto`}>
      <h1 class={tw`text-5xl mt-2 font-bold`}>Settings</h1>
      <p class={tw`mt-8 mb-4`}>
        Your current locale is <b>{locales[0]}.</b>
      </p>
      <LocaleSelector />
    </div>
  );
}
