/** @jsx h */
import { h } from "preact"
import { tw } from "@twind"

export default function Header() {

    return (
        <header class={tw`w-full h-[144px] bg(cover header-bg no-repeat) relative`}>
            <div class={tw`w-full h-full absolute bg-raindrops`}></div>
        </header>
    )
}