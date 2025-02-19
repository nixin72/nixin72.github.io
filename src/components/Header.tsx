import React from 'react';
import { motion, MotionValue } from "motion/react";
import { GitHub, Icon, Linkedin, Mail } from 'react-feather';

type LinkProps = {
  href: string;
  Icon: Icon;
}

function Link({ href, Icon }: LinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer"><Icon /></a>
  );
}

export default function Header() {
  return (
    <motion.div style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '0 5vw',
      height: '8vh',
      textAlign: 'left',
      borderBottom: 'thin solid black',
      background: "white",
      alignSelf: 'center',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 999,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "80%",
        alignItems: 'center',
      }}>
        <div className="fr jcsb" style={{ width: "20%" }}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
        </div>
        <div className="fr jcsb" style={{ width: "15%" }}>
          <Link href="https://www.linkedin.com/in/phdumaresq" Icon={Linkedin} />
          <Link href="https://github.com/nixin72" Icon={GitHub} />
          <Link href="mailto:phdumaresq@protonmail.com" Icon={Mail} />
        </div>
      </div>
    </motion.div>
  )
}