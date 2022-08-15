/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact"
import { Head } from "$fresh/runtime.ts"
import { tw } from "@twind"
import TodoList from "../islands/TodoList.tsx"
import Footer from "../components/Footer.tsx"
import Header from "../components/Header.tsx"

export default function Home() {
  return (
    <>
    <Head>
      <title>Deno Fresh</title>
    </Head>
    <Header />
    <h1 class={tw`mt-3 text-center text-xl font-semibold`}>Todo list</h1>
    <section class={tw`my-0 mx-auto p-4 max-w-screen flex justify-center`}>
      <TodoList />
    </section>
    <Footer />
    </>
  )
}
