import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ behavior = "instant" }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to an anchor like /about#skills, let the browser handle it
    if (hash) return;

    // Scroll window to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: behavior === "smooth" ? "smooth" : "instant",
    });
  }, [pathname, hash, behavior]);

  return null;
}
