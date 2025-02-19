import { useMotionValue } from "motion/react";

import Md from "../util/Md";
import Header from "../components/Header";

export default function About() {
  const opacity = useMotionValue(1);

  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header opacity={opacity} />
      <div className="fr aic jcc" style={{ marginTop: '8vh', width: "80%" }}>
        <div>
          <Md src="/md/about.md" />
        </div>
      </div>
    </div>
  );
}