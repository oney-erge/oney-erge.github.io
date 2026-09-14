"use client";

import { useEffect } from "react";
import { initFigures } from "./figures.js";

/** Runs the shared figure script on the server-rendered article. */
export function PostFigures() {
  useEffect(() => {
    const root = document.getElementById("post-root");
    if (!root) return;
    return initFigures(root);
  }, []);
  return null;
}
