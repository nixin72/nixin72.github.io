import { useMotionValue } from "motion/react";

import Md from "../util/Md";
import Header from "../components/Header";
import { useContentWidth } from "../util/Util";

export default function About() {
  const opacity = useMotionValue(1);
  const { narrow } = useContentWidth();

  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header opacity={opacity} />
      <div className="fr aic jcc about" style={{ marginTop: '8vh', width: narrow }}>
        <div>
          <Md src="/md/about.md" />
        </div>
      </div>
    </div>
  );
}