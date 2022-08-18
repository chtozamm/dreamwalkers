/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

const localeFmt = new Intl.DisplayNames("en", { type: "language" });
const date = new Date();

export default function LocaleSelector() {
  const [locale, setLocale] = useState("");

  let language: string | undefined = undefined;
  let timeSample: string | undefined = undefined;
  if (locale) {
    try {
      const loc = new Intl.Locale(locale);
      language = localeFmt.of(loc.language);
      const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
      timeSample = dateFmt.format(date);
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
      {language && timeSample &&
        (
          <dl class={tw`mt-4 text-gray-600`}>
            <dd class={tw`font-bold`}>Language</dd>
            <dt>{language}</dt>

            <dd class={tw`font-bold`}>Time Sample</dd>
            <dt>{timeSample}</dt>
          </dl>
        )}
    </form>
  );
}
