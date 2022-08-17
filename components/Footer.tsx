/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Footer() {
  return (
    <footer
      class={tw`md:(bg-white h-7 fixed bottom-0) left-0 right-0 mx-auto px-3 relative bottom-3 max-w-screen-md flex justify-center sm:justify-between items-center`}
    >
      <span class={tw`flex items-center gap-4`}>
        <a class={tw`flex items-center gap-1 text-gray-700`}>
          <img class={tw`h-7 w-7`} src="/logo.svg" alt="Fresh Logo" />
          Build with
          <strong>Fresh</strong>
        </a>
        <span class={tw`text-gray-300 text-sm`}>|</span>
        <a
          href="https://github.com/chtozamm/todo-list"
          target="_blank"
          class={tw`hover:underline`}
        >
          Source
        </a>
      </span>
      <a class={tw`text-sm text-gray-400 hidden sm:flex items-center`}>
        chtozamm
      </a>
    </footer>
  );
}
