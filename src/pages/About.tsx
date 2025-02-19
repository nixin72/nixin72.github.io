import { useMotionValue } from "motion/react";

import Md from "../util/Md";
import Header from "../components/Header";

import placeholder from "../photos/placeholder.jpeg";

export default function About() {
  return (
    <div className="fc aic" style={{ textAlign: 'left' }}>
      <Header />
      <div className="fr aic jcsb" style={{ marginTop: '8vh', width: "80%" }}>
        <img
          src={placeholder}
          alt=""
          style={{
            display: "block",
            height: "300px",
            width: 'auto',
            marginRight: "2rem",
        }} />
        <div>
          <Md src="/md/about.md" />
        </div>
      </div>
    </div>
  );
}