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

export default function Header({ opacity }: { opacity: MotionValue }) {
  return (
    <motion.div style={{
      opacity,
      position: 'fixed',
      top: 0,
      width: '90vw',
      height: '8vh',
      textAlign: 'left',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: 'thin solid black',
      alignSelf: 'center',
      background: "white",
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
    </motion.div>
  )
}