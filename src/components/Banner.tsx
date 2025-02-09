import React from 'react';
import { motion, MotionValue } from 'motion/react';
import { ChevronsDown, GitHub, Linkedin, Mail, Icon } from "react-feather"

import banner from '../photos/banner.jpeg';
import { useFontSizes } from '../util/Util';
import { ScrollValues } from '../util/Scroll';

type LinkArgs = {
  Icon: Icon;
  pre: String;
  link: String
}

function Link({Icon, pre, link}: LinkArgs) {
  return (
    <a className="info"
       target="_blank"
       rel="noreferrer"
       href={`${pre}${link}`}
       style={{ color: 'black', textDecoration: 'none' }}>
      <Icon size={20} style={{ marginRight: "1rem" }}/>
      {link}
    </a>
  );
}

function BannerImage({ top, opacity }: { top: MotionValue, opacity: MotionValue }) {
  return (
    <motion.div style={{ position: 'fixed', opacity, top }} >
      <img src={banner} alt="" style={{ objectFit: 'cover', width: '100vw', height: '100vh' }} />
    </motion.div>
  );
}

function Headline({ top, color }: { top: MotionValue, color: MotionValue }) {
  const { h1fs, h2fs } = useFontSizes();
  return (
    <motion.div style={{ position: 'fixed', top: top }}>
      <div style={{ textAlign: 'left', margin: '20vh 0 0 25vh' }}>
        <motion.h1 style={{ fontSize: h1fs, color }}>Philip Dumaresq</motion.h1>
        <motion.h2 style={{ fontSize: h2fs, color }}>Full Stack Software Developer</motion.h2>
      </div>
    </motion.div>
  );
}

function About({ top, opacity }: { top: MotionValue, opacity: MotionValue }) {
  const { defaultfs } = useFontSizes();
  return (
    <motion.div style={{ position: 'fixed', top, opacity }}>
      <div style={{ width: "70%", fontSize: defaultfs, textAlign: 'left', margin: '45vh 0 0 25vh' }} >
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
  const sides = { width: 75, height: 25, borderRadius: 5, background: "white" };
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
      <div style={{ ...sides, marginRight: -10 }}>
      </div>
      <div className="fr jcc aic"
           style={{ width: 75, height: 75, borderRadius: 500, background: "white" }}>
        <ChevronsDown id="scroll-down" size={35} />
      </div>
      <div style={{ ...sides, marginLeft: -10 }}>
      </div>
    </motion.div>
  );
}

export default function Banner({ scrollValues }: { scrollValues: ScrollValues } ) {
  const { top, hideTransformer, showTransformer, color } = scrollValues;
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