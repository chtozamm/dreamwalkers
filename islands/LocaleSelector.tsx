/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

const localeFmt = new Intl.DisplayNames("en", { type: "language" });

export default function LocaleSelector() {
  const [locale, setLocale] = useState("");

  let language: string | undefined = undefined;
  if (locale) {
    try {
      const loc = new Intl.Locale(locale);
      language = localeFmt.of(loc.language);
    } catch {
      // ignore error
    }
  }
  return (
    <form method="post" class={tw`space-x-2`}>
      <label htmlFor="locale">Locale</label>
      <input
        type="text"
        name="locale"
        id="locale"
        class={tw`border px-2 py-1`}
        value={locale}
        onInput={(e) => setLocale(e.currentTarget.value)}
      />
      <button
        type="submit"
        class={tw`px-2 py-1 bg-blue(500 hover:700 disabled:200) text-white font-medium`}
      >
        Save
      </button>
      <p class={tw`text-gray-400 `}>
        {language}
      </p>
    </form>
  );
}
