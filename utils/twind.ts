import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      backgroundImage: {
        'raindrops': "url('raindrops-animate.svg')",
        'header-bg': "url('header_bg.svg')",
      }
    }
  }
};
if (IS_BROWSER) setup(config);
