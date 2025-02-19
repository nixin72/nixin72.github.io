import React from 'react';
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  MotionValue
} from "motion/react";

export type ScrollValues = {
  top: MotionValue;
  scrollY: MotionValue;
  bannerProgress: MotionValue;
  showTransformer: MotionValue;
  hideTransformer: MotionValue;
  color: MotionValue
}

export function useScrollValues(): ScrollValues {
  const { scrollY } = useScroll();
  const vh = window.innerHeight;

  const bannerProgress = useTransform(() => scrollY.get() / vh);
  const showTransformer = useTransform(bannerProgress, [0.75, 1], [0, 1]);
  const hideTransformer = useTransform(bannerProgress, [0, 1], [1, 0]);
  const color = useTransform(bannerProgress, [0, 1], ["#FFF", "#000"]);

  const [prev, setPrev] = React.useState(0);
  const top = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - prev;
    if (bannerProgress.get() > 1) top.set(top.get() - delta);
    else top.set(0);

    setPrev(latest);
  });

  return { scrollY, bannerProgress, top, showTransformer, hideTransformer, color };
}