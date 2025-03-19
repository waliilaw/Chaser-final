"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading"; // Import the Loading component
import "@/styles/globals.css"; // Your global styles

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route change events
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.events]);

  return (
    <>
      {isLoading && <Loading />} {/* Show loading screen when loading */}
      <Component {...pageProps} />
    </>
  );
} 