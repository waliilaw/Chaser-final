import { useState, useEffect } from "react";
import Loading from "@/components/Loading";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [Router.events]);

  return (
    <>
      {isLoading && <Loading />}
      <Component {...pageProps} />
    </>
  );
} 