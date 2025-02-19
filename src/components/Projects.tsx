import React  from 'react';

import Codeblock from './Codeblock';

import racoNew from '../samples/raco-new.txt';
import stackfn from '../samples/stackfn.txt';
import { useScreenSizes } from '../util/Util';

type ProjectArgs = {
  name: string;
  desc: string;
  link: string;
  children: React.ReactNode;
  dir: "ltr" | "rtl";
}

function Project({ name, desc, link, dir, children }: ProjectArgs) {
  const { isDesktopOrLaptop } = useScreenSizes();

  return (
    <div className="project" style={{
      display: isDesktopOrLaptop ? 'grid' : 'block',
      gridTemplateColumns: '50% 50%',
      gridAutoFlow: "column",
      direction: dir,
      width: "80%"
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

export default function Projects() {
  const [racoNewMd, setRacoNewMd] = React.useState("");
  const [stackfnmd, setstackfnmd] = React.useState("");

  React.useEffect(() => {
    fetch(racoNew).then(res => res.text()).then(text => setRacoNewMd(text))
    fetch(stackfn).then(res => res.text()).then(text => setstackfnmd(text))
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
