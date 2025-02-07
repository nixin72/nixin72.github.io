import React from 'react';

import rplLogo from "../photos/rpl-logo.svg";
import craLogo from "../photos/cra-logo.png";
import concordiaLogo from "../photos/uni-logo.png";
import githubLogo from "../photos/github-logo.png";

type ExperienceArgs = {
  id: string;
  alt: string;
  imgsrc: string;
  imgwidth: string | number;
  dir: "ltr" | "rtl";
  children: React.ReactNode;
}

function Experience({id, alt, imgsrc, imgwidth, dir, children}: ExperienceArgs) {
  return (
    <div id={id}
      className='experience'
      style={{display: 'grid', gridTemplateColumns: "50% 50%", width: "80%", direction: dir}}>
      <div className='acc'>
        <img src={imgsrc} style={{ width: imgwidth }} alt={alt} />
      </div>
      <div style={{ direction: "ltr" }}>
        {children}
      </div>
    </div>
  );
}

export function Experiences() {
  return (
    <div className='fc jcc aic' style={{ width: "100%" }}>
      <h1>Work Experience</h1>
      <Experience id='exp-rpl' alt="Red Planet Labs logo" imgsrc={rplLogo} imgwidth={400} dir="ltr">
        <p>
          Worked on a very small team developing Rama, a new bleeding edge distributed systems platform for the JVM
        </p>
        <ul>
          <li>Supported customers by fixing immediate client-facing issues</li>
          <li>Supported the team by making QoL improvements to the codebase and developer tools</li>
          <li>Ensured the codebase was compatible between all LTS versions of Java</li>
          <li>Took ownership of the system front-end, improving code design and adding automated testing</li>
          <li>Published open-source code on GitHub</li>
        </ul>
      </Experience>
      <Experience id="exp-cra" alt="Canada Revenue Agency logo" imgsrc={craLogo} imgwidth={400} dir="ltr">
        <p>
          Modernized training and onboarding processes at the Canada Revenue Agency through mobile applications and gameification
        </p>
        <ul>
          <li>Started out working on an application designed to teach management skills on a team with other developers</li>
          <li>Got asked to work on a solo-project prototyping a notification system for all CRA mobile devices</li>
          <li>Shifted to a lead developer role, and worked on an onboarding application for new hires</li>
          <li>Worked closely with project owners to deliver on their visions of the project</li>
        </ul>
      </Experience>
      <Experience id="exp-ta" alt="Concordia University logo" imgsrc={concordiaLogo} imgwidth={400} dir="ltr">
        <p>
          Taught the fundamentals of functional programming in COMP-348, programming languages and paradigms
        </p>
        <ul>
          <li>Taught students the basics of C, Ruby, Common Lisp, and Prolog.</li>
          <li>Made supplemental material for students to improve their knowledge of Lisp.</li>
          <li>Made a website in my spare time to help students by providing an FAQ, help setting up programming environments, and providing practice questions.</li>
          <li>Researched difficult questions when I couldn't provide answers in class so I could follow up later.</li>
          <li>Helped students outside my normal hours, answering questions on Discord and by email.</li>
        </ul>
      </Experience>
      <Experience id="exp-github" alt="GitHub logo" imgsrc={githubLogo} imgwidth={400} dir="ltr">
        <p>
          Working as both an intern and a part-time contractor, I contributed to the GitHub Learning Lab
        </p>
        <ul>
          <li>Starting as an intern, worked on making a public API for the GitHub Learning Lab</li>
          <li>Learned the GitHub REST API to model ours off of that</li>
          <li>Implemented secure requests via API tokens</li>
          <li>As a contractor, designed and created a few projects for people to follow to learn various programming languages</li>
        </ul>
      </Experience>
      <div id="exp-github" className='fr'>
        <div></div>
        <div></div>
      </div>
      <div id="exp-github" className='fr'>
        <div></div>
        <div></div>
      </div>
      <div id="exp-ta" className='fr'>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
