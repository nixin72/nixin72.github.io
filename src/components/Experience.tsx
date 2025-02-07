import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'motion/react';

import Md from "../util/Md";

import rplLogo from "../photos/rpl-logo.svg";
import rplMd from "../samples/experiences/rpl.md";
import craLogo from "../photos/cra-logo.png";
import craMd from "../samples/experiences/cra.md";
import concordiaLogo from "../photos/uni-logo.png";
import taMd from "../samples/experiences/ta.md";
import githubLogo from "../photos/github-logo.png";
import githubMd from "../samples/experiences/github.md";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

type ExperienceArgs = {
  alt: string;
  imgsrc: string;
  txtsrc: string;
}

function Experience({ alt, imgsrc, txtsrc }: ExperienceArgs) {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useParallax(scrollYProgress, 100)

  return (
    <div className='experience'
      style={{
        display: 'grid',
        gridTemplateColumns: "50% 50%",
        width: "80%",
        margin: '5rem 0',
        position: 'relative'
      }}>
      <div className='acc' ref={ref}>
        <img src={imgsrc} style={{ width: 400 }} alt={alt + " logo"} />
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
          <Md src={txtsrc} />
      </motion.div>
    </div>
  );
}

export function Experiences() {
  return (
    <div>
      <motion.div >
        <h1>Work Experience</h1>
        <div className='fc aic'>
          <Experience alt="Red Planet Labs" imgsrc={rplLogo} txtsrc={rplMd} />
          <Experience alt="Canada Revenue Agency" imgsrc={craLogo} txtsrc={craMd} />
          <Experience alt="Concordia University" imgsrc={concordiaLogo} txtsrc={taMd} />
          <Experience alt="GitHub" imgsrc={githubLogo} txtsrc={githubMd} />
        </div>
      </motion.div>
    </div>
  )
}
