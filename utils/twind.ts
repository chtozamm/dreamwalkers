import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "media",
  mode: "silent",
  preflight: {
    body: {
      fontFamily:
        "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      color: "#24292f",
    },
  },
};
if (IS_BROWSER) setup(config);
