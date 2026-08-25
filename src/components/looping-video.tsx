"use client";

import { useEffect, useRef } from "react";

export function LoopingVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (reduceMotion.matches) {
        video.pause();
        video.controls = true;
      } else {
        video.controls = false;
        video.play().catch(() => {});
      }
    };

    sync();
    reduceMotion.addEventListener("change", sync);
    return () => reduceMotion.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={label}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
