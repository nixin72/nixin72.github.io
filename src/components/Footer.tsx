import wave from '../photos/wave.svg';
import { useFontSizes } from '../util/Util';

import jackjack from '../photos/jackjack.jpeg';

export default function Footer() {
  const { defaultfs } = useFontSizes();

  return (
    <footer style={{ position: "relative" }}>
      <div className="fc aic">
        <img src={jackjack} height={window.innerHeight / 2} style={{ marginTop: "10rem" }} alt="my cat Jack" />
        <p>
          My cat Jack :&#x29;
        </p>
      </div>
      <img src={wave} alt="" width={window.innerWidth} />
      <div style={{ position: 'absolute', bottom: "5rem", left: "5rem" }}>
        <p style={{ color: 'white', fontSize: defaultfs }}>
          Copyright 2025 @ Philip Dumaresq
        </p>
      </div>
    </footer>
  );
}