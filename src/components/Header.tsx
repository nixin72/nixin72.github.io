import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  MotionValue,
} from 'motion/react';
import { ChevronsDown, GitHub, Linkedin, Mail, Icon } from "react-feather"

import banner from '../photos/banner.jpeg';

type LinkArgs = {
  Icon: Icon;
  pre: String;
  link: String
}

function Link({Icon, pre, link}: LinkArgs) {
  return (
    <a className="info" style={{ color: 'black', textDecoration: 'none' }} href={`${pre}${link}`}>
      <Icon size={20} style={{ marginRight: "1rem" }}/>
      {link}
    </a>
  );
}

function BannerImage({ top, opacity }: { top: MotionValue, opacity: MotionValue }) {
  return (
    <motion.div style={{ position: 'fixed', opacity, top }} >
      <img src={banner} style={{ objectFit: 'cover', width: '100vw', height: '100vh' }} />
    </motion.div>
  );
}

function Headline({ top, color }: { top: MotionValue, color: MotionValue }) {
  return (
    <motion.div style={{ position: 'fixed', top: top }}>
      <div style={{ textAlign: 'left', margin: '20vh 0 0 25vh' }}>
        <motion.h1 style={{ fontSize: "4rem", color }}>Philip Dumaresq</motion.h1>
        <motion.h2 style={{ fontSize: "3rem", color }}>Full Stack Software Developer</motion.h2>
      </div>
    </motion.div>
  );
}

function About({ top, opacity }: { top: MotionValue, opacity: MotionValue }) {
  return (
    <motion.div style={{ position: 'fixed', top, opacity }}>
      <div style={{ width: "70%", fontSize: "1.5rem", textAlign: 'left', margin: '45vh 0 0 25vh' }} >
        <p>
          Hi! I'm an intermediate-level software developer with a wide array of experiences.
          From the fast pace of startup culture to the public service, I've worked on distributed
          systems, mobile applications, front-ends, backends, developer tooling and more.
          I love learning new things and teaching others, and I'm a big advocate of functional
          programming.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          If you're looking for an engineer to add to your team, I'm currently looking for work!
          <p>
            Find me on LinkedIn, GitHub, or send me an email:
          </p>
          <Link Icon={Linkedin} pre="https://www." link="linkedin.com/in/phdumaresq" />
          <Link Icon={GitHub} pre="https://" link="github.com/nixin72" />
          <Link Icon={Mail} pre="mailto:" link="phdumaresq@protonmail.com" />
        </div>
      </div>
    </motion.div>
  );
}

function ScrollIndicator({ opacity }: { opacity: MotionValue }) {
  return (
    <motion.div style={{
      display: 'flex',
      justifySelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '90%',
      left: 0,
      width: '100%',
      opacity
    }}>
      <div style={{ width: 75, height: 25, borderRadius: 5, background: "white", marginRight: -10 }}>
      </div>
      <div style={{ width: 75, height: 75, borderRadius: 500, background: "white", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ChevronsDown id="scroll-down" size={35} />
      </div>
      <div style={{ width: 75, height: 25, borderRadius: 5, background: "white", marginLeft: -10 }}>
      </div>
    </motion.div>
  );
}

export function Header() {
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
  })

  return (
    <div>
      <div style={{
        aspectRatio: `${window.innerWidth}/${window.innerHeight}`
      }}>
        <BannerImage top={top} opacity={hideTransformer} />
        <Headline top={top} color={color} />
        <About top={top} opacity={showTransformer} />
        <ScrollIndicator opacity={hideTransformer} />
      </div>
      <div style={{ aspectRatio: `${window.innerWidth}/${window.innerHeight}` }} />
    </div>
  );
}