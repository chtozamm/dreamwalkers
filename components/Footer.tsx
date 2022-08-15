/** @jsx h */
import { h } from "preact"
import { tw } from "@twind"

export default function Footer() {

    return (
        <footer class={tw`left-0 right-0 mx-auto px-3 absolute bottom-3 max-w-screen-md flex justify-center sm:justify-between items-center`}>
        <span class={tw`flex items-center gap-4`}>
        <a href="#" class={tw`flex items-center gap-2 text-gray-700`}>
            <img class={tw`h-7 w-7`} src="/logo.svg" alt="Fresh Logo" />
            Build with 
            <strong>Fresh</strong>
        </a>
        <span class={tw`text-gray-300 text-sm`}>|</span>
        <a href="#" class={tw`hover:underline`}>Source</a>
        </span>
        <a href="#" class={tw`text-sm text-gray-400 hidden sm:flex items-center gap-2`}>
        chtozamm
        </a>
        </footer>
    )
}