import wave from '../photos/wave.svg';

export function Footer() {
    return (
      <footer style={{ position: "relative" }}>
        <img src={wave} width={window.innerWidth} />
        <div style={{ position: 'absolute', top: "10rem", left: "5rem" }}>
          <p style={{ color: 'white', fontSize: '1.5rem' }}>
            Copyright 2025 @ Philip Dumaresq
          </p>
        </div>
      </footer>
    );
}