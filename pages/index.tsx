import produce from "immer";
import type { NextPage } from "next";
import Head from "next/head";

import react from "react";
import TodoList from "../components/TodoList";
import { TodoContextProvider } from "../hooks/TodoContext";
const Home: NextPage = () => {
  const [loading, setLoading] = react.useState(true);
  react.useEffect(() => {
    // Make sure the window is loaded before we setup the TodoContext (since it checks for localStorage)
    setLoading(false);
  }, []);
  return (
    <div>
      <Head>
        <title>ToodleDo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="py-4 px-4 mb-4 text-white">
        <span className="relative  inline-block before:absolute before:-inset-1 before:block before:-skew-y-2  before:transition-all before:duration-300 before:translate-x-0 before:scale-100 before:bg-[#27ECF9] ">
          <span className="relative ">
            <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
              ToodleDo
            </h1>
          </span>
        </span>
      </header>
      <main>
        {!loading && (
          <TodoContextProvider>
            <TodoList />
          </TodoContextProvider>
        )}
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;