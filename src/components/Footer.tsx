import { useFontSizes } from '../util/Util';

export default function Footer() {
  const { defaultfs } = useFontSizes();

  return (
    <footer style={{ position: "relative" }}>
      <div className="fc aic">
        <img src="/imgs/jack.jpeg" height={window.innerHeight / 2} style={{ marginTop: "10rem" }} alt="my cat Jack" />
        <p>
          My cat Jack :&#x29;
        </p>
      </div>
      <img src="/imgs/wave.svg" alt="" width={window.innerWidth} />
      <div style={{ position: 'absolute', bottom: "5rem", left: "5rem" }}>
        <p style={{ color: 'white', fontSize: defaultfs }}>
          Copyright 2025 @ Philip Dumaresq
        </p>
      </div>
    </footer>
  );
}