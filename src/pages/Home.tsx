import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'motion/react';
import { ChevronsDown, GitHub, Linkedin, Mail, Icon } from "react-feather"

import Header from '../components/Header';
import Footer from '../components/Footer';
import Md from "../util/Md";
import Codeblock from '../components/Codeblock';

import { useScrollValues, ScrollValues } from '../util/Scroll';
import { useContentWidth, useScreenSizes, useFontSizes } from '../util/Util';

import '../App.css';

/*******************************************************************************
 *** BANNER
 ******************************************************************************/
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
      <img src="/imgs/banner.jpeg" alt="" style={{ objectFit: 'cover', width: '100vw', height: '100vh' }} />
    </motion.div>
  );
}

function Headline({ top, color, margin }: { top: MotionValue, color: MotionValue, margin: string }) {
  const { h1fs, h2fs } = useFontSizes();
  return (
    <motion.div style={{ position: 'fixed', top: top }}>
      <div style={{ textAlign: 'left', margin: `20vh 0 0 ${margin}` }}>
        <motion.h1 style={{ fontSize: h1fs, color }}>Philip Dumaresq</motion.h1>
        <motion.h2 style={{ fontSize: h2fs, color }}>Full Stack Software Developer</motion.h2>
      </div>
    </motion.div>
  );
}

function About({ top, opacity, margin }: { top: MotionValue, opacity: MotionValue, margin: string }) {
  const { defaultfs } = useFontSizes();
  return (
    <motion.div style={{ position: 'fixed', top, opacity }}>
      <div style={{ width: "70%", fontSize: defaultfs, textAlign: 'left', margin: `45vh 0 0 ${margin}` }} >
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

function Banner({ scrollValues }: { scrollValues: ScrollValues } ) {
  const { top, hideTransformer, showTransformer, color } = scrollValues;
  const { isTabletOrMobile, isDesktopOrLaptop, isBigScreen } = useScreenSizes();

  const [marginLeft, setMarginLeft] = React.useState("");
  React.useEffect(() => {
    if (isTabletOrMobile) setMarginLeft("5vh");
    if (isDesktopOrLaptop) setMarginLeft("25vh");
    if (isBigScreen) setMarginLeft("30vh");
  }, [isTabletOrMobile, isDesktopOrLaptop, isBigScreen]);

  return (
    <div>
      <div style={{
        aspectRatio: `${window.innerWidth}/${window.innerHeight}`
      }}>
        <BannerImage top={top} opacity={hideTransformer} />
        <Headline top={top} color={color} margin={marginLeft} />
        <About top={top} opacity={showTransformer} margin={marginLeft} />
        <ScrollIndicator opacity={hideTransformer} />
      </div>
      <div style={{ aspectRatio: `${window.innerWidth}/${window.innerHeight}` }} />
    </div>
  );
}

/*******************************************************************************
 *** PROJECTS
 ******************************************************************************/
type ProjectArgs = {
  name: string;
  desc: string;
  link: string;
  children: React.ReactNode;
  dir: "ltr" | "rtl";
}

function Project({ name, desc, link, dir, children }: ProjectArgs) {
  const { isDesktopOrLaptop } = useScreenSizes();
  const { wide } = useContentWidth();

  return (
    <div className="project" style={{
      display: isDesktopOrLaptop ? 'grid' : 'block',
      gridTemplateColumns: '50% 50%',
      gridAutoFlow: "column",
      direction: dir,
      width: wide
    }}>
      <div style={{ padding: "1rem", textAlign: 'center' }}>
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
      <div style={{ padding: "1rem", direction: "ltr" }}>
        {children}
      </div>
    </div>
  );
}

function Projects() {
  const [racoNewMd, setRacoNewMd] = React.useState("");
  const [stackfnmd, setstackfnmd] = React.useState("");

  React.useEffect(() => {
    fetch("/md/raco-new.txt").then(res => res.text()).then(text => setRacoNewMd(text))
    fetch("/md/stackfn.txt").then(res => res.text()).then(text => setstackfnmd(text))
  }, [])

  return (
    <div className='fc jcc aic'>
      <h1>Projects</h1>
      <Project
        name="Racket Templates"
        desc="A new project templating tool for the Racket programming language"
        link="https://github.com/racket-templates/raco-new"
        dir="ltr">
        <Codeblock code={racoNewMd} language="bash" />
      </Project>
      <Project
        name="Stackfn"
        desc="A stack-based compiler for a small toy language written in Clojure"
        link="https://github.com/nixin72/stackfn"
        dir="rtl">
        <Codeblock code={stackfnmd} language='clojure' />
      </Project>
    </div>
  );
}

/*******************************************************************************
 *** EXPERIENCE
 ******************************************************************************/
type ExperienceArgs = {
  alt: string;
  imgsrc: string;
  txtsrc: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

function Experience({ alt, imgsrc, txtsrc }: ExperienceArgs) {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 150)
  const { wide } = useContentWidth();

  return (
    <div className='experience'
      style={{
        display: 'grid',
        gridTemplateColumns: "50% 50%",
        width: wide,
        margin: '5rem 0',
        position: 'relative'
      }}>
      <div className='acc' ref={ref}>
        <img src={`/imgs/${imgsrc}`} style={{ width: 400 }} alt={alt + " logo"} />
      </div>
      <motion.div
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
        style={{
          y,
          direction: "ltr",
          top: "calc(50% - 25px)",
          left: "calc(50% + 120px)",
        }}>
          <Md src={`/md/experiences/${txtsrc}.md`} />
      </motion.div>
    </div>
  );
}

function Experiences() {
  return (
    <div>
      <motion.div className='fc jcc aic'>
        <h1>Work Experience</h1>
        <div className='fc aic'>
          <Experience alt="Red Planet Labs" imgsrc="rpl-logo.svg" txtsrc="rpl" />
          <Experience alt="Canada Revenue Agency" imgsrc="cra-logo.png" txtsrc="cra" />
          <Experience alt="Concordia University" imgsrc="uni-logo.png" txtsrc="ta" />
          <Experience alt="GitHub" imgsrc="github-logo.png" txtsrc="github" />
        </div>
      </motion.div>
    </div>
  )
}


export default function App() {
  const scrollValues = useScrollValues();


  return (
    <div className="App">
      <Header opacity={scrollValues.showTransformer} />
      <Banner scrollValues={scrollValues} />
      <Projects />
      <Experiences />
      <Footer />
    </div>
  );
}
